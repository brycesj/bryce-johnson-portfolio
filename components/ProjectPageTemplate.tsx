import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectGallery } from "./ProjectGallery";
import { SkillTag } from "./SkillTag";

type ProjectPageTemplateProps = {
  project: Project;
};

export function ProjectPageTemplate({ project }: ProjectPageTemplateProps) {
  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-30`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(34,211,238,0.24),transparent_28rem)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1fr_0.9fr] md:items-center lg:py-24">
          <div>
            <Link href="/#projects" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-100">{project.subtitle}</p>
            <h1 className="electric-text mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{project.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <SkillTag key={tag} label={tag} />
              ))}
            </div>
            {project.link ? (
              <Link
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-white"
              >
                Visit live project
                <ExternalLink className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-cyan-300/25 bg-white/10 shadow-lift shadow-cyan-950/30">
            <Image src={project.coverImage} alt={project.coverAlt} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {project.highlights.map((highlight) => (
            <div key={highlight} className="rounded-2xl border border-cyan-300/15 bg-white/[0.06] p-5 text-sm font-semibold leading-6 text-slate-200 shadow-sm">
              {highlight}
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-14 px-5 pb-20">
        {project.sections.map((section) => {
          const mediaLeft = section.layout === "media-left" && section.media?.length;
          const showcase = section.layout === "showcase" && section.media?.length;

          return (
            <section key={section.title} className="rounded-3xl border border-cyan-300/15 bg-slate-900/72 p-6 shadow-soft shadow-cyan-950/20 sm:p-8">
              {showcase ? (
                <>
                  {section.title ? (
                    <h2 className="mb-7 text-center text-3xl font-black tracking-tight text-white">{section.title}</h2>
                  ) : null}
                  <ProjectGallery media={section.media ?? []} columns="auto" variant="showcase" />
                </>
              ) : mediaLeft ? (
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center">
                  <ProjectGallery media={section.media ?? []} columns="auto" />
                  <div>
                    {section.eyebrow ? (
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">{section.eyebrow}</p>
                    ) : null}
                    <h2 className="mt-3 text-3xl font-black tracking-tight text-white">{section.title}</h2>
                    <div className="mt-4 space-y-4 whitespace-pre-line text-base leading-8 text-slate-300">
                      {section.body}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {section.eyebrow ? (
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">{section.eyebrow}</p>
                  ) : null}
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-white">{section.title}</h2>
                  {section.body ? (
                    <div className="mt-4 max-w-4xl space-y-4 whitespace-pre-line text-base leading-8 text-slate-300">
                      {section.body}
                    </div>
                  ) : null}
                  {section.media?.length ? (
                    <div className="mt-8">
                      <ProjectGallery media={section.media} columns={section.layout === "paired" ? "two" : "auto"} />
                    </div>
                  ) : null}
                </>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
