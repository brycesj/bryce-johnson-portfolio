import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { SkillTag } from "./SkillTag";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-cyan-300/15 bg-slate-900/78 shadow-soft shadow-cyan-950/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
        <Image
          src={project.coverImage}
          alt={project.coverAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-6">
        <div>
          <p className="text-sm font-semibold text-cyan-200">{project.subtitle}</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{project.title}</h3>
        </div>
        <p className="text-sm leading-6 text-slate-300">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <SkillTag key={tag} label={tag} />
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white"
        >
          View project
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
