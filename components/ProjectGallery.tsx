import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ProjectMedia } from "@/data/projects";
import { VideoEmbed } from "./VideoEmbed";

type ProjectGalleryProps = {
  media: ProjectMedia[];
  columns?: "auto" | "two";
};

export function ProjectGallery({ media, columns = "auto" }: ProjectGalleryProps) {
  const isSparkFive = media.length === 5;
  const gridClass =
    columns === "two" || media.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : isSparkFive
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-6"
        : columns === "auto" && media.length === 1
          ? "grid-cols-1"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-5 ${gridClass}`}>
      {media.map((item, index) => {
        const placementClass = isSparkFive
          ? index < 3
            ? "lg:col-span-2"
            : index === 3
              ? "lg:col-span-2 lg:col-start-2"
              : "lg:col-span-2 lg:col-start-4"
          : "";

        if (item.type === "video") {
          return (
            <div className="md:col-span-2 lg:col-span-full" key={`${item.src}-${item.caption}`}>
              <VideoEmbed src={item.src} caption={item.caption} />
            </div>
          );
        }

        const imageFit = item.fit === "contain" ? "object-contain p-3" : "object-cover";
        const imageBg = item.fit === "contain" ? "bg-slate-950/80" : "bg-slate-950";
        const aspectClass =
          item.aspect === "poster"
            ? "aspect-[3/4]"
            : item.aspect === "wide" || item.fit === "contain"
              ? "aspect-[16/10]"
              : "aspect-[4/3]";

        const image = (
          <figure className="group h-full overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-900/80 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-lift">
            <div className={`relative ${aspectClass} overflow-hidden ${imageBg}`}>
              <Image
                src={item.src}
                alt={item.alt ?? item.caption}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className={`${imageFit} transition duration-500 group-hover:scale-[1.03]`}
              />
            </div>
            <figcaption className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-sm font-medium text-slate-200">
              <span>{item.caption}</span>
              {item.href ? <ExternalLink className="h-4 w-4 text-cyan-300" /> : null}
            </figcaption>
          </figure>
        );

        return item.href ? (
          <Link className={placementClass} href={item.href} target="_blank" rel="noreferrer" key={`${item.src}-${item.caption}`}>
            {image}
          </Link>
        ) : (
          <div className={placementClass} key={`${item.src}-${item.caption}`}>{image}</div>
        );
      })}
    </div>
  );
}
