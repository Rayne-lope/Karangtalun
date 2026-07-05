import Image from "next/image";
import Link from "next/link";

type ContentCardProps = {
  href: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  meta?: string | null;
};

export function ContentCard({ href, title, description, imageUrl, meta }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-md border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm"
    >
      <div className="relative aspect-[16/10] bg-stone-200">
        {imageUrl ? (
          <Image src={imageUrl} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-stone-500">
            Karangtalun
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        {meta ? <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">{meta}</p> : null}
        <h3 className="line-clamp-2 text-base font-bold text-stone-950 group-hover:text-emerald-800">{title}</h3>
        {description ? <p className="line-clamp-3 text-sm leading-6 text-stone-600">{description}</p> : null}
      </div>
    </Link>
  );
}
