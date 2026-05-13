import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-cyan-300/15 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
        <p>Built for engineering projects, prototypes, and the next good idea.</p>
        <div className="flex gap-5 font-semibold">
          <Link className="hover:text-cyan-200" href="/about">
            About
          </Link>
          <Link
            className="hover:text-cyan-200"
            href="https://www.linkedin.com/in/brycejohnsonurl/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
