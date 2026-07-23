import Link from "next/link";
import { Plus } from "lucide-react";

type PageHeadingProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function PageHeading({ title, description, actionHref, actionLabel }: PageHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b pb-6" style={{ borderColor: "rgba(28,43,36,0.10)" }}>
      <div>
        <h2
          className="font-light leading-tight text-[#1c2b24]"
          style={{
            fontFamily: 'var(--font-cormorant-garamond), "Cormorant Garamond", Georgia, serif',
            fontSize: "clamp(26px, 3.5vw, 36px)",
          }}
        >
          {title}
        </h2>
        <p className="mt-1 max-w-xl text-sm text-[#66746d]">{description}</p>
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-[11px] font-extrabold uppercase tracking-[1.7px] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md"
          style={{ background: "#062b27" }}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
