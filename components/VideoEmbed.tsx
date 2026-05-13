type VideoEmbedProps = {
  src: string;
  caption?: string;
};

export function VideoEmbed({ src, caption }: VideoEmbedProps) {
  return (
    <figure className="mx-auto w-full overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950 shadow-soft shadow-cyan-950/20">
      <video className="aspect-video w-full object-contain" controls preload="metadata">
        <source src={src} />
        Your browser does not support the video tag.
      </video>
      {caption ? (
        <figcaption className="border-t border-white/10 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-200">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
