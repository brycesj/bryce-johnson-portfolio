"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project, ProjectMedia } from "@/data/projects";
import { experience } from "@/data/experience";
import { DesktopIcon } from "./DesktopIcon";
import { MacWindow, type WindowGeometry } from "./MacWindow";

type AppId = "welcome" | "notepad" | "resume" | "projects" | "experience" | "about" | "map" | "links" | "disk" | "help";

type WindowState = {
  id: string;
  title: string;
  geometry: WindowGeometry;
  zIndex: number;
};

type SoundCue = {
  run: number;
  videoId: string;
  duration: number;
  volume: number;
};

const bootSoundVideo = "Z9w08Pov-yA";
const applicationSoundVideo = "nUsHboYC5zc";
const defaultNoteText = "Welcome to BryceOS! Feel free to click around and explore what I have to offer.";

const sendYouTubeCommand = (frame: HTMLIFrameElement | null, func: string, args: unknown[] = []) => {
  frame?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "https://www.youtube-nocookie.com");
};

const projectWindowId = (slug: string) => `project:${slug}`;

const projectWindowGeometry = (projectIndex: number): WindowGeometry => ({
  x: 88 + (projectIndex % 3) * 42,
  y: 54 + (projectIndex % 3) * 34,
  width: 860,
  height: 680
});

const appMeta: Record<AppId, { title: string; geometry: WindowGeometry }> = {
  welcome: { title: "Welcome to BryceOS", geometry: { x: 92, y: 78, width: 510, height: 330 } },
  notepad: { title: "Note Pad", geometry: { x: 620, y: 88, width: 390, height: 360 } },
  resume: { title: "Bryce Johnson - Resume", geometry: { x: 150, y: 62, width: 720, height: 640 } },
  projects: { title: "Engineering Projects", geometry: { x: 175, y: 95, width: 760, height: 560 } },
  experience: { title: "Work Experience", geometry: { x: 230, y: 82, width: 690, height: 570 } },
  about: { title: "About Bryce", geometry: { x: 115, y: 70, width: 860, height: 640 } },
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
  const [bootState, setBootState] = useState<"booting" | "ready" | "off">("off");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [menu, setMenu] = useState<string | null>(null);
  const [clock, setClock] = useState("");
  const [soundCue, setSoundCue] = useState<SoundCue | null>(null);
  const [noteText, setNoteText] = useState(defaultNoteText);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  const highestZ = useMemo(() => Math.max(10, ...windows.map((item) => item.zIndex)), [windows]);

  const playSound = useCallback((videoId: string, duration: number, volume: number) => {
    setSoundCue((current) => ({ run: (current?.run ?? 0) + 1, videoId, duration, volume }));
  }, []);

  const playClickSound = useCallback(() => {
    const clickSound = clickSoundRef.current;
    if (!clickSound) return;
    clickSound.volume = 0.25;
    clickSound.currentTime = 0;
    void clickSound.play().catch(() => undefined);
  }, []);

  const openApp = useCallback((id: AppId, withSound = true) => {
    if (withSound && !windows.some((item) => item.id === id)) {
      window.setTimeout(() => playSound(applicationSoundVideo, 2600, 18), 230);
    }
    setMenu(null);
    setSelectedIcon(id);
    setWindows((current) => {
      const existing = current.find((item) => item.id === id);
      const nextZ = Math.max(10, ...current.map((item) => item.zIndex)) + 1;
      if (existing) return current.map((item) => (item.id === id ? { ...item, zIndex: nextZ } : item));
      const meta = appMeta[id];
      return [...current, { id, title: meta.title, geometry: clampGeometry(meta.geometry), zIndex: nextZ }];
    });
  }, [playSound, windows]);

  const openProject = useCallback((project: Project) => {
    const id = projectWindowId(project.slug);
    if (!windows.some((item) => item.id === id)) {
      window.setTimeout(() => playSound(applicationSoundVideo, 2600, 18), 230);
    }
    setMenu(null);
    setSelectedIcon(project.slug);
    setWindows((current) => {
      const existing = current.find((item) => item.id === id);
      const nextZ = Math.max(10, ...current.map((item) => item.zIndex)) + 1;
      if (existing) return current.map((item) => (item.id === id ? { ...item, zIndex: nextZ } : item));
      const projectIndex = Math.max(0, projects.findIndex((item) => item.slug === project.slug));
      return [...current, {
        id,
        title: `${project.title} — Project File`,
        geometry: clampGeometry(projectWindowGeometry(projectIndex)),
        zIndex: nextZ
      }];
    });
  }, [playSound, projects, windows]);

  useEffect(() => {
    if (bootState !== "booting") return;
    const bootTimer = window.setTimeout(() => {
      setBootState("ready");
      openApp("welcome", false);
      openApp("notepad", false);
    }, 950);
    return () => window.clearTimeout(bootTimer);
  }, [bootState, openApp]);

  useEffect(() => {
    if (!soundCue) return;
    const activeRun = soundCue.run;
    const soundTimer = window.setTimeout(() => {
      setSoundCue((current) => current?.run === activeRun ? null : current);
    }, soundCue.duration);
    return () => window.clearTimeout(soundTimer);
  }, [soundCue]);

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

  const focusWindow = (id: string) => {
    setWindows((current) => {
      const nextZ = Math.max(10, ...current.map((item) => item.zIndex)) + 1;
      return current.map((item) => (item.id === id ? { ...item, zIndex: nextZ } : item));
    });
  };

  const resetWindows = () => {
    setWindows((current) =>
      current.map((item, index) => ({
        ...item,
        geometry: clampGeometry((() => {
          if (item.id.startsWith("project:")) {
            const projectIndex = projects.findIndex((project) => projectWindowId(project.slug) === item.id);
            const base = projectWindowGeometry(Math.max(0, projectIndex));
            return { ...base, x: base.x + index * 12, y: base.y + index * 10 };
          }
          const base = appMeta[item.id as AppId].geometry;
          return { ...base, x: base.x + index * 12, y: base.y + index * 10 };
        })())
      }))
    );
    setMenu(null);
  };

  const restart = () => {
    setMenu(null);
    setWindows([]);
    setNoteText(defaultNoteText);
    window.setTimeout(() => playSound(bootSoundVideo, 6500, 26), 230);
    setBootState("booting");
  };

  const shutDown = () => {
    setMenu(null);
    setWindows([]);
    setSoundCue(null);
    setBootState("off");
  };

  const soundPlayer = soundCue ? (
    <iframe
      key={`${soundCue.videoId}-${soundCue.run}`}
      className="system-sound-player"
      src={`https://www.youtube-nocookie.com/embed/${soundCue.videoId}?autoplay=1&enablejsapi=1&controls=0&disablekb=1&fs=0&playsinline=1&rel=0&mute=0`}
      title="BryceOS system sound"
      allow="autoplay; encrypted-media"
      referrerPolicy="strict-origin-when-cross-origin"
      aria-hidden="true"
      tabIndex={-1}
      onLoad={(event) => {
        const frame = event.currentTarget;
        const applyVolume = () => sendYouTubeCommand(frame, "setVolume", [soundCue.volume]);
        applyVolume();
        window.setTimeout(applyVolume, 180);
        window.setTimeout(applyVolume, 450);
      }}
    />
  ) : null;

  const clickSoundPlayer = (
    <audio
      ref={clickSoundRef}
      src="/sounds/mouse-click.webm?v=1"
      preload="auto"
      aria-hidden="true"
    />
  );

  if (bootState === "off") {
    return (
      <>
        {clickSoundPlayer}
        <main className="power-screen select-user-screen">
          <section className="select-user-panel" aria-labelledby="select-user-title">
            <p className="select-user-kicker">BryceOS 7.0</p>
            <h1 id="select-user-title">Select User</h1>
            <button type="button" className="user-account" onClick={() => { playClickSound(); restart(); }} aria-label="Select Bryce Johnson and start BryceOS">
              <span className="user-account__portrait" aria-hidden="true">
                <Image src="/profile/bryce-johnson.jpeg" alt="" fill priority sizes="148px" />
              </span>
              <strong>Bryce Johnson</strong>
              <span className="user-account__action">Select User</span>
            </button>
            <p className="select-user-hint">Click the profile to enter.</p>
          </section>
        </main>
      </>
    );
  }

  const finishStartup = () => {
    setBootState("ready");
    openApp("welcome", false);
    openApp("notepad", false);
  };

  if (bootState === "booting") {
    return (
      <>
        {clickSoundPlayer}
        {soundPlayer}
        <main className="boot-screen" aria-live="polite">
          <div className="boot-computer" aria-hidden="true"><span>:-)</span></div>
          <h1>Welcome, Bryce Johnson</h1>
          <div className="boot-progress"><span /></div>
          <button type="button" onClick={() => { playClickSound(); finishStartup(); }}>Skip Startup</button>
        </main>
      </>
    );
  }

  return (
    <>
      {clickSoundPlayer}
      {soundPlayer}
      <main className="bryce-os" onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest("button:not(:disabled), a, [role='button']")) playClickSound();
      }} onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        if (!target.closest(".menu-bar")) setMenu(null);
        if (!target.closest(".desktop-icon, .mac-window")) setSelectedIcon(null);
      }}>
      <nav className="menu-bar" aria-label="BryceOS menu bar">
        <button type="button" className="rainbow-mark" aria-label="BryceOS home" onClick={() => openApp("welcome")}><span /></button>
        {[
          { label: "File", items: [["Open Note Pad", () => openApp("notepad")], ["Open Resume", () => openApp("resume")], ["Open Projects", () => openApp("projects")], ["Download Resume", () => window.open("/resume/BryceJohnson_EE_ML.pdf", "_blank")]] },
          { label: "Edit", items: [["Select All Icons", () => setSelectedIcon("all")], ["Close Active Window", () => setWindows((current) => current.filter((item) => item.zIndex !== highestZ))]] },
          { label: "View", items: [["Arrange Icons", () => setSelectedIcon(null)], ["Reset Window Positions", resetWindows]] },
          { label: "Special", items: [["About BryceOS", () => openApp("welcome")], ["Restart", restart], ["Shut Down", shutDown]] },
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
        <div className="desktop-wallpaper" aria-hidden="true">
          <div className="case-vents case-vents--left">{Array.from({ length: 14 }, (_, index) => <span key={index} />)}</div>
          <div className="wallpaper-apple"><span className="apple-body" /><span className="apple-leaf" /><span className="apple-bite" /></div>
          <div className="case-vents case-vents--right">{Array.from({ length: 14 }, (_, index) => <span key={index} />)}</div>
        </div>
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
            <WindowContent id={item.id} projects={projects} openApp={openApp} openProject={openProject} noteText={noteText} setNoteText={setNoteText} />
          </MacWindow>
        ))}
      </section>
      </main>
    </>
  );
}

function WindowContent({
  id,
  projects,
  openApp,
  openProject,
  noteText,
  setNoteText
}: {
  id: string;
  projects: Project[];
  openApp: (id: AppId) => void;
  openProject: (project: Project) => void;
  noteText: string;
  setNoteText: (value: string) => void;
}) {
  if (id.startsWith("project:")) {
    const project = projects.find((item) => projectWindowId(item.slug) === id);
    return project ? <ProjectWindow project={project} /> : <div className="project-missing">Project file not found.</div>;
  }

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

  if (id === "notepad") {
    return (
      <div className="notepad-window">
        <label htmlFor="bryceos-note">Personal note</label>
        <textarea
          id="bryceos-note"
          value={noteText}
          onChange={(event) => setNoteText(event.target.value)}
          spellCheck="true"
          aria-label="Editable BryceOS welcome note"
        />
        <p>{noteText.length} characters · Resets on restart</p>
      </div>
    );
  }

  if (id === "projects") {
    return (
      <div className="finder-view">
        <div className="finder-info">{projects.length} items <span>Engineering Portfolio</span></div>
        <div className="finder-grid">
          {projects.map((project) => (
            <button className="finder-item" type="button" onClick={() => openProject(project)} key={project.slug}>
              <span className="mini-folder" aria-hidden="true" />
              <strong>{project.title}</strong>
              <small>{project.subtitle}</small>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (id === "resume") {
    return (
      <div className="resume-window">
        <div className="document-toolbar">
          <a className="mac-button is-default" href="/resume/BryceJohnson_EE_ML.pdf" download>Download</a>
          <a className="mac-button" href="/resume/BryceJohnson_EE_ML.pdf" target="_blank" rel="noreferrer">Open PDF</a>
          <button type="button" className="mac-button" onClick={() => window.print()}>Print</button>
        </div>
        <div className="resume-preview">
          <Image
            src="/resume/BryceJohnson_EE_ML-preview.png"
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
            <div>
              <h3><a href={job.website} target="_blank" rel="noreferrer">{job.company}<span aria-hidden="true"> ↗</span></a></h3>
              <p>{job.role}</p>
            </div>
            <div className="experience-meta"><strong>{job.dates}</strong><span>{job.location}</span></div>
            <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </article>
        ))}
      </div>
    );
  }

  if (id === "about") {
    return <AboutCarousel />;
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
        <button onClick={() => openApp("notepad")}><span className="mini-document" />Note Pad</button>
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

const aboutSlides = [
  {
    id: "intro",
    eyebrow: "A little more human",
    title: "Beyond the equations",
    body: "Believe it or not, beyond Fourier transforms and neural networks, I also have a personality! Feel free to swipe through to learn more about who I am outside of school and academics.",
    images: [
      { src: "/about/bryce-europe.jpeg", alt: "Bryce overlooking the coast in Santorini, Greece" }
    ]
  },
  {
    id: "travel",
    eyebrow: "Side quest 01",
    title: "I love to travel!",
    body: "A little fun fact about me is that I’ve visited all 30 MLB ballparks that currently host baseball teams. As a result, I’ve passed through a large majority of the U.S. states, and I’ve just recently started traveling overseas. I find that the best part of traveling isn’t the guided tours... it’s the side quests that give you a new perspective on how others live their lives abroad.",
    images: [
      { src: "/about/bryce-colosseum.jpeg", alt: "Bryce visiting the Colosseum at night" },
      { src: "/about/coronado-landscape.jpg", alt: "A coastal landscape photographed during Bryce’s travels" }
    ]
  },
  {
    id: "food",
    eyebrow: "Side quest 02",
    title: "I like food—a lot.",
    body: "I like food, and I like it a lot. I like to make it, eat it, and admire it. It’s the main reason that Beli is the only social media app I own. One of my favorite cuisines of all time is Japanese food, as featured in the image above. It’s from a place called DASHI in San Diego, CA. I highly recommend it.",
    images: [
      { src: "/about/food.jpg", alt: "A Japanese meal at DASHI in San Diego" }
    ]
  }
];

function AboutCarousel() {
  const [activePage, setActivePage] = useState(0);
  const slide = aboutSlides[activePage];
  const goBack = () => setActivePage((current) => (current - 1 + aboutSlides.length) % aboutSlides.length);
  const goForward = () => setActivePage((current) => (current + 1) % aboutSlides.length);

  return (
    <section className="about-carousel" aria-label="About Bryce slideshow">
      <div className={`about-slide about-slide--${slide.id}`} key={slide.id} aria-live="polite">
        <div className={`about-slide__media ${slide.images.length > 1 ? "about-slide__media--pair" : ""}`}>
          {slide.images.map((photo) => (
            <div className="about-slide__photo" key={photo.src}>
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 720px) 100vw, 520px" />
            </div>
          ))}
        </div>
        <div className="about-slide__copy">
          <p className="eyebrow">{slide.eyebrow}</p>
          <h2>{slide.title}</h2>
          <p>{slide.body}</p>
        </div>
      </div>

      <nav className="about-carousel__nav" aria-label="About page controls">
        <button type="button" className="about-carousel__arrow" onClick={goBack} aria-label="Previous About page">
          <span aria-hidden="true">←</span>
        </button>
        <div className="about-carousel__position">
          <span>{activePage + 1} of {aboutSlides.length}</span>
          <div className="about-carousel__dots" aria-hidden="true">
            {aboutSlides.map((item, index) => <i className={index === activePage ? "is-active" : ""} key={item.id} />)}
          </div>
        </div>
        <button type="button" className="about-carousel__arrow" onClick={goForward} aria-label="Next About page">
          <span aria-hidden="true">→</span>
        </button>
      </nav>
    </section>
  );
}

function ProjectWindow({ project }: { project: Project }) {
  return (
    <article className="project-window">
      <header className="project-window__hero">
        <div className="project-window__cover">
          <Image src={project.coverImage} alt={project.coverAlt} fill sizes="(max-width: 720px) 100vw, 420px" priority />
        </div>
        <div className="project-window__intro">
          <p className="eyebrow">Engineering Project File</p>
          <h2>{project.title}</h2>
          <p className="project-window__subtitle">{project.subtitle}</p>
          <p>{project.description}</p>
          <div className="project-window__tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          {project.link ? (
            <a className="mac-button is-default" href={project.link} target="_blank" rel="noreferrer">Visit live project</a>
          ) : null}
        </div>
      </header>

      <section className="project-window__highlights" aria-label="Project highlights">
        {project.highlights.map((highlight, index) => (
          <div key={highlight}><strong>{String(index + 1).padStart(2, "0")}</strong><p>{highlight}</p></div>
        ))}
      </section>

      <div className="project-window__sections">
        {project.sections.map((section, sectionIndex) => (
          <section className="project-section" key={`${section.title}-${sectionIndex}`}>
            <div className="project-section__heading">
              {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
              <h3>{section.title}</h3>
            </div>
            {section.body ? <div className="project-section__body">{section.body}</div> : null}
            {section.media?.length ? (
              <div className={`project-media-grid ${section.media.length === 1 ? "is-single" : ""}`}>
                {section.media.map((media, mediaIndex) => (
                  <ProjectMediaView media={media} key={`${media.src}-${mediaIndex}`} />
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}

function ProjectMediaView({ media }: { media: ProjectMedia }) {
  const driveMatch = media.src.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  const driveEmbed = driveMatch ? `https://drive.google.com/file/d/${driveMatch[1]}/preview` : null;

  return (
    <figure className={`project-media project-media--${media.aspect ?? "standard"} ${media.fit === "contain" ? "is-contain" : ""}`}>
      <div className="project-media__frame">
        {media.type === "video" ? (
          driveEmbed ? (
            <iframe src={driveEmbed} title={media.caption ?? "Project video"} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          ) : (
            <video controls preload="metadata"><source src={media.src} />Your browser does not support the video tag.</video>
          )
        ) : (
          <Image src={media.src} alt={media.alt ?? media.caption ?? "Project media"} fill sizes="(max-width: 720px) 100vw, 430px" />
        )}
      </div>
      {media.caption ? <figcaption>{media.caption}</figcaption> : null}
    </figure>
  );
}
