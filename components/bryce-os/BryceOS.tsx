"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import { experience } from "@/data/experience";
import { DesktopIcon } from "./DesktopIcon";
import { MacWindow, type WindowGeometry } from "./MacWindow";

type AppId = "welcome" | "resume" | "projects" | "experience" | "about" | "map" | "links" | "disk" | "help";

type WindowState = {
  id: AppId;
  title: string;
  geometry: WindowGeometry;
  zIndex: number;
};

const appMeta: Record<AppId, { title: string; geometry: WindowGeometry }> = {
  welcome: { title: "Welcome to BryceOS", geometry: { x: 92, y: 78, width: 510, height: 330 } },
  resume: { title: "Bryce Johnson - Resume", geometry: { x: 150, y: 62, width: 720, height: 640 } },
  projects: { title: "Engineering Projects", geometry: { x: 175, y: 95, width: 760, height: 560 } },
  experience: { title: "Work Experience", geometry: { x: 230, y: 82, width: 690, height: 570 } },
  about: { title: "About Bryce", geometry: { x: 115, y: 105, width: 720, height: 540 } },
  map: { title: "Map", geometry: { x: 195, y: 76, width: 700, height: 570 } },
  links: { title: "Internet Shortcuts", geometry: { x: 270, y: 120, width: 520, height: 360 } },
  disk: { title: "Macintosh HD", geometry: { x: 145, y: 88, width: 660, height: 470 } },
  help: { title: "BryceOS Help", geometry: { x: 310, y: 110, width: 480, height: 390 } }
};

const desktopApps = [
  { id: "resume" as const, label: "Resume", kind: "document" as const },
  { id: "projects" as const, label: "Projects", kind: "folder" as const },
  { id: "experience" as const, label: "Work Experience", kind: "work" as const },
  { id: "about" as const, label: "About Me", kind: "person" as const },
  { id: "map" as const, label: "Map", kind: "map" as const },
  { id: "links" as const, label: "Links", kind: "links" as const },
  { id: "disk" as const, label: "Macintosh HD", kind: "disk" as const }
];

const clampGeometry = (geometry: WindowGeometry) => {
  if (typeof window === "undefined") return geometry;
  if (window.innerWidth <= 720) return { x: 0, y: 32, width: window.innerWidth, height: window.innerHeight - 32 };
  return {
    ...geometry,
    x: Math.min(geometry.x, Math.max(0, window.innerWidth - geometry.width)),
    y: Math.min(Math.max(32, geometry.y), Math.max(32, window.innerHeight - 100)),
    width: Math.min(geometry.width, window.innerWidth),
    height: Math.min(geometry.height, window.innerHeight - 32)
  };
};

export function BryceOS({ projects }: { projects: Project[] }) {
  const [bootState, setBootState] = useState<"booting" | "ready" | "off">("booting");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [menu, setMenu] = useState<string | null>(null);
  const [clock, setClock] = useState("");

  const highestZ = useMemo(() => Math.max(10, ...windows.map((item) => item.zIndex)), [windows]);

  const openApp = useCallback((id: AppId) => {
    setMenu(null);
    setSelectedIcon(id);
    setWindows((current) => {
      const existing = current.find((item) => item.id === id);
      const nextZ = Math.max(10, ...current.map((item) => item.zIndex)) + 1;
      if (existing) return current.map((item) => (item.id === id ? { ...item, zIndex: nextZ } : item));
      const meta = appMeta[id];
      return [...current, { id, title: meta.title, geometry: clampGeometry(meta.geometry), zIndex: nextZ }];
    });
  }, []);

  useEffect(() => {
    const bootTimer = window.setTimeout(() => {
      setBootState("ready");
      openApp("welcome");
    }, 950);
    return () => window.clearTimeout(bootTimer);
  }, [openApp]);

  useEffect(() => {
    const updateClock = () => setClock(new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date()));
    updateClock();
    const timer = window.setInterval(updateClock, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const closeMenus = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", closeMenus);
    return () => window.removeEventListener("keydown", closeMenus);
  }, []);

  const focusWindow = (id: AppId) => {
    setWindows((current) => {
      const nextZ = Math.max(10, ...current.map((item) => item.zIndex)) + 1;
      return current.map((item) => (item.id === id ? { ...item, zIndex: nextZ } : item));
    });
  };

  const resetWindows = () => {
    setWindows((current) =>
      current.map((item, index) => ({
        ...item,
        geometry: clampGeometry({ ...appMeta[item.id].geometry, x: appMeta[item.id].geometry.x + index * 12, y: appMeta[item.id].geometry.y + index * 10 })
      }))
    );
    setMenu(null);
  };

  const restart = () => {
    setMenu(null);
    setWindows([]);
    setBootState("booting");
    window.setTimeout(() => {
      setBootState("ready");
      openApp("welcome");
    }, 950);
  };

  if (bootState === "off") {
    return (
      <main className="power-screen">
        <button type="button" className="power-button" onClick={restart} aria-label="Power on BryceOS">
          <span aria-hidden="true">⏻</span>
          Power On
        </button>
      </main>
    );
  }

  if (bootState === "booting") {
    return (
      <main className="boot-screen" aria-live="polite">
        <div className="boot-computer" aria-hidden="true"><span>:-)</span></div>
        <h1>Welcome to BryceOS</h1>
        <div className="boot-progress"><span /></div>
        <button type="button" onClick={() => { setBootState("ready"); openApp("welcome"); }}>Skip Startup</button>
      </main>
    );
  }

  return (
    <main className="bryce-os" onPointerDown={(event) => {
      if (!(event.target as HTMLElement).closest(".menu-bar")) setMenu(null);
      if (!(event.target as HTMLElement).closest(".desktop-icon, .mac-window")) setSelectedIcon(null);
    }}>
      <nav className="menu-bar" aria-label="BryceOS menu bar">
        <button type="button" className="rainbow-mark" aria-label="BryceOS home" onClick={() => openApp("welcome")}><span /></button>
        {[
          { label: "File", items: [["Open Resume", () => openApp("resume")], ["Open Projects", () => openApp("projects")], ["Download Resume", () => window.open("/resume/BryceJohnson_Resume_10_2026.pdf", "_blank")]] },
          { label: "Edit", items: [["Select All Icons", () => setSelectedIcon("all")], ["Close Active Window", () => setWindows((current) => current.filter((item) => item.zIndex !== highestZ))]] },
          { label: "View", items: [["Arrange Icons", () => setSelectedIcon(null)], ["Reset Window Positions", resetWindows]] },
          { label: "Special", items: [["About BryceOS", () => openApp("welcome")], ["Restart", restart], ["Shut Down", () => setBootState("off")]] },
          { label: "Help", items: [["How to Navigate", () => openApp("help")], ["Contact", () => openApp("links")]] }
        ].map(({ label, items }) => (
          <div className="menu-group" key={label}>
            <button type="button" className={menu === label ? "is-open" : ""} onClick={(event) => { event.stopPropagation(); setMenu(menu === label ? null : label); }}>{label}</button>
            {menu === label ? (
              <div className="menu-dropdown" role="menu">
                {items.map(([itemLabel, action]) => (
                  <button type="button" role="menuitem" key={itemLabel as string} onClick={action as () => void}>{itemLabel as string}</button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <span className="menu-bar__spacer" />
        <button type="button" className="menu-help" onClick={() => openApp("help")} aria-label="Open help">?</button>
        <span className="menu-clock">{clock}</span>
      </nav>

      <section className="desktop" aria-label="BryceOS desktop">
        <div className="desktop-icons">
          {desktopApps.map((app) => (
            <DesktopIcon key={app.id} {...app} selected={selectedIcon === app.id || selectedIcon === "all"} onSelect={() => setSelectedIcon(app.id)} onOpen={() => openApp(app.id)} />
          ))}
        </div>
        <div className="trash-position">
          <DesktopIcon id="trash" label="Trash" kind="trash" selected={selectedIcon === "trash" || selectedIcon === "all"} onSelect={() => setSelectedIcon("trash")} onOpen={() => undefined} />
        </div>

        {windows.map((item) => (
          <MacWindow
            key={item.id}
            id={item.id}
            title={item.title}
            active={item.zIndex === highestZ}
            zIndex={item.zIndex}
            geometry={item.geometry}
            onClose={() => setWindows((current) => current.filter((windowItem) => windowItem.id !== item.id))}
            onFocus={() => focusWindow(item.id)}
            onGeometryChange={(geometry) => setWindows((current) => current.map((windowItem) => windowItem.id === item.id ? { ...windowItem, geometry } : windowItem))}
          >
            <WindowContent id={item.id} projects={projects} openApp={openApp} />
          </MacWindow>
        ))}
      </section>
    </main>
  );
}

function WindowContent({ id, projects, openApp }: { id: AppId; projects: Project[]; openApp: (id: AppId) => void }) {
  if (id === "welcome") {
    return (
      <div className="welcome-panel">
        <div className="happy-mac" aria-hidden="true"><span>●</span><span>●</span><b>⌣</b></div>
        <div>
          <p className="eyebrow">System Software 7.0 · Portfolio Edition</p>
          <h1>Bryce Johnson</h1>
          <p className="welcome-lead">Electrical Engineering — UC San Diego</p>
          <p>Robotics <b>|</b> Embedded Systems <b>|</b> Hardware</p>
          <div className="mac-button-row">
            <button type="button" className="mac-button is-default" onClick={() => openApp("projects")}>Open Projects</button>
            <button type="button" className="mac-button" onClick={() => openApp("resume")}>View Resume</button>
          </div>
        </div>
      </div>
    );
  }

  if (id === "projects") {
    return (
      <div className="finder-view">
        <div className="finder-info">{projects.length} items <span>Engineering Portfolio</span></div>
        <div className="finder-grid">
          {projects.map((project) => (
            <Link className="finder-item" href={`/projects/${project.slug}`} key={project.slug}>
              <span className="mini-folder" aria-hidden="true" />
              <strong>{project.title}</strong>
              <small>{project.subtitle}</small>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (id === "resume") {
    return (
      <div className="resume-window">
        <div className="document-toolbar">
          <a className="mac-button is-default" href="/resume/BryceJohnson_Resume_10_2026.pdf" download>Download</a>
          <a className="mac-button" href="/resume/BryceJohnson_Resume_10_2026.pdf" target="_blank" rel="noreferrer">Open PDF</a>
          <button type="button" className="mac-button" onClick={() => window.print()}>Print</button>
        </div>
        <div className="resume-preview">
          <Image
            src="/resume/BryceJohnson_Resume_10_2026-preview.png"
            alt="Preview of Bryce Johnson's one-page resume"
            width={1224}
            height={1584}
            priority
          />
        </div>
      </div>
    );
  }

  if (id === "experience") {
    return (
      <div className="experience-list">
        {experience.map((job) => (
          <article className="experience-card" key={job.company}>
            <div><h3>{job.company}</h3><p>{job.role}</p></div>
            <div className="experience-meta"><strong>{job.dates}</strong><span>{job.location}</span></div>
            <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </article>
        ))}
      </div>
    );
  }

  if (id === "about") {
    return (
      <div className="about-window">
        <Image src="/images/professional-image.jpeg" alt="Bryce Johnson" width={280} height={340} className="about-photo" />
        <div>
          <p className="eyebrow">About Me</p>
          <h2>Engineer, builder, and curious teammate.</h2>
          <p>I’m an Electrical Engineering student at UC San Diego interested in embedded systems, circuits, robotics, and hands-on hardware development.</p>
          <p>I played two years as a community-college baseball pitcher, recently picked up rock climbing, and visited all 30 Major League Baseball stadiums by age 20.</p>
          <Link href="/about" className="mac-button is-default">Open full biography</Link>
        </div>
      </div>
    );
  }

  if (id === "map") {
    return (
      <div className="map-window">
        <div className="california-map" aria-label="Stylized map of California with San Jose and San Diego marked">
          <svg viewBox="0 0 360 510" aria-hidden="true">
            <path d="M80 20 205 55 190 116 228 188 245 257 317 375 294 475 248 495 192 419 153 345 111 278 94 201 54 143Z" />
            <path className="coast-detail" d="M80 20 69 79 54 143 94 201 111 278 153 345 192 419 248 495" />
          </svg>
          <button type="button" className="map-pin map-pin--sj"><span />San Jose<small>Home town</small></button>
          <button type="button" className="map-pin map-pin--sd"><span />San Diego<small>UC San Diego</small></button>
        </div>
        <div className="map-notes">
          <h3>San Jose, California</h3>
          <p>This is my home town! I was born and raised in South San Jose. Growing up in Silicon Valley exposed me to new technology, food, and experiences at every step in my journey.</p>
          <h3>San Diego, California</h3>
          <p>In 2024 I moved to sunny San Diego to continue my studies in Electrical Engineering at UC San Diego.</p>
        </div>
      </div>
    );
  }

  if (id === "links") {
    return (
      <div className="shortcut-grid">
        <a href="https://www.linkedin.com/in/brycejohnsonurl/" target="_blank" rel="noreferrer"><span>in</span><strong>LinkedIn</strong></a>
        <a href="https://github.com/brycesj" target="_blank" rel="noreferrer"><span>GH</span><strong>GitHub</strong></a>
        <a href="mailto:brycejohn3289@gmail.com"><span>@</span><strong>Email</strong></a>
        <a href="https://spark-lab-nu.vercel.app/" target="_blank" rel="noreferrer"><span>⚡</span><strong>Spark Lab</strong></a>
      </div>
    );
  }

  if (id === "disk") {
    return (
      <div className="disk-window">
        <div className="disk-status">7 items <span>BryceOS System Disk</span></div>
        <button onClick={() => openApp("projects")}><span className="mini-folder" />Projects</button>
        <button onClick={() => openApp("experience")}><span className="mini-folder" />Experience</button>
        <button onClick={() => openApp("about")}><span className="mini-folder" />About Bryce</button>
        <button onClick={() => openApp("resume")}><span className="mini-document" />Resume.pdf</button>
        <button onClick={() => openApp("map")}><span className="mini-document" />Map</button>
        <button onClick={() => openApp("links")}><span className="mini-document" />Internet</button>
      </div>
    );
  }

  return (
    <div className="help-window">
      <h3>How to Navigate</h3>
      <dl>
        <dt>Open an application</dt><dd>Double-click a desktop icon. On touch screens, tap once.</dd>
        <dt>Move a window</dt><dd>Drag its striped title bar.</dd>
        <dt>Resize a window</dt><dd>Drag the handle in the lower-right corner.</dd>
        <dt>Close a window</dt><dd>Use the square at the left of its title bar.</dd>
        <dt>Keyboard</dt><dd>Press Escape to close an open menu. Every icon and control is keyboard focusable.</dd>
      </dl>
    </div>
  );
}
