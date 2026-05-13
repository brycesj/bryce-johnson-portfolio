import Link from "next/link";
import { Cpu } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-cyan-300/15 bg-slate-950/82 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3 font-bold text-white">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.18)]">
            <Cpu className="h-5 w-5" />
          </span>
          <span>Bryce Johnson</span>
        </Link>
        <div className="flex items-center gap-5 text-sm font-semibold text-slate-200">
          <Link className="transition hover:text-cyan-200" href="/#projects">
            Projects
          </Link>
          <Link className="transition hover:text-cyan-200" href="/about">
            About
          </Link>
          <Link
            className="hidden rounded-full bg-cyan-300 px-4 py-2 text-slate-950 transition hover:bg-white sm:inline-flex"
            href="https://www.linkedin.com/in/brycejohnsonurl/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </Link>
        </div>
      </nav>
    </header>
  );
}
