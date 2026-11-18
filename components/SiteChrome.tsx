"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesktop = pathname === "/";

  if (isDesktop) return children;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
