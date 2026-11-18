import { BryceOS } from "@/components/bryce-os/BryceOS";
import { projects } from "@/data/projects";

export default function Home() {
  return <BryceOS projects={projects} />;
}
