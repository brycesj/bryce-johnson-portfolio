type SkillTagProps = {
  label: string;
};

export function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 shadow-sm shadow-cyan-950/20">
      {label}
    </span>
  );
}
