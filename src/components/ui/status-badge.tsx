type StatusBadgeProps = {
  status: string;
};

const labels: Record<string, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
  active: "Aktif",
  inactive: "Nonaktif",
};

const classes: Record<string, string> = {
  draft:
    "bg-[#c59b4b]/10 text-[#8a6a2a] ring-[#c59b4b]/30",
  published:
    "bg-[#073933]/10 text-[#073933] ring-[#073933]/20",
  archived:
    "bg-[#1c2b24]/08 text-[#66746d] ring-[rgba(28,43,36,0.15)]",
  active:
    "bg-[#073933]/10 text-[#073933] ring-[#073933]/20",
  inactive:
    "bg-red-50 text-red-700 ring-red-200/60",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[1.3px] ring-1 ring-inset ${
        classes[status] ?? "bg-[#1c2b24]/05 text-[#66746d] ring-[rgba(28,43,36,0.12)]"
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}
