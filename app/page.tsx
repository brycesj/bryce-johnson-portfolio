import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin, Wrench } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main>
      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.08fr_0.92fr] md:items-center lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-[0_0_32px_rgba(34,211,238,0.18)]">
            <Wrench className="h-4 w-4" />
            Electrical Engineering Portfolio
          </div>
          <h1 className="electric-text mt-6 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Bryce Johnson
          </h1>
          <p className="mt-5 text-xl font-semibold text-cyan-100">
            Electrical Engineering Student | Embedded Systems | Circuits | Robotics
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            I build hands-on engineering projects that connect code, circuits, sensors, and physical systems. Think embedded prototypes, analog experiments, robotics, and learning tools with a little spark behind the solder.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_38px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              View projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/brycejohnsonurl/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:text-cyan-100"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/4.25] overflow-hidden rounded-3xl border border-cyan-300/25 bg-slate-900 shadow-lift shadow-cyan-950/30">
            <Image
              src="/images/professional-image.jpeg"
              alt="Bryce Johnson professional portrait"
              fill
              priority
              sizes="(min-width: 768px) 44vw, 100vw"
              className="portrait-crop"
            />
          </div>
          <div className="absolute -bottom-6 left-5 right-5 rounded-2xl border border-cyan-300/20 bg-slate-950/88 p-5 shadow-soft backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Current focus</p>
            <p className="mt-2 text-base font-semibold text-slate-100">
              Embedded prototypes, analog circuits, robotics, and learning tools.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-cyan-300/15 bg-white/[0.04]">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <p className="max-w-4xl text-xl leading-9 text-slate-200">
            I am an Electrical Engineering student at UC San Diego with a strong interest in embedded systems, circuits, robotics, and hands-on hardware development.
          </p>
          <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 hover:text-white">
            More about me
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-5 py-16 lg:py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Featured Projects</p>
            <h2 className="electric-text mt-3 text-4xl font-black tracking-tight text-white">Engineering work with a pulse.</h2>
          </div>
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
