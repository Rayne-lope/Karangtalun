import {
  HighlightBlock,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
} from "@/components/public/static-page";

type Official = {
  role: string;
  name: string;
  featured?: boolean;
};

const officials: Official[] = [
  { role: "Kepala Desa", name: "Nama Kepala Desa", featured: true },
  { role: "Sekretaris Desa", name: "Nama Sekretaris Desa" },
  { role: "Kaur Keuangan", name: "Nama Perangkat Desa" },
  { role: "Kaur Umum & Perencanaan", name: "Nama Perangkat Desa" },
  { role: "Kasi Pemerintahan", name: "Nama Perangkat Desa" },
  { role: "Kasi Kesejahteraan", name: "Nama Perangkat Desa" },
  { role: "Kasi Pelayanan", name: "Nama Perangkat Desa" },
];

export default function StrukturDesaPage() {
  const headOfficial = officials.find((o) => o.featured);
  const others = officials.filter((o) => !o.featured);

  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Perangkat Desa"
        title="Struktur Pemerintahan"
        description="Susunan perangkat dan aparatur Desa Karangtalun yang menjalankan roda pemerintahan dan pelayanan publik."
      />
      <StaticPageContainer>
        <HighlightBlock>
          Pemerintah Desa Karangtalun berkomitmen untuk memberikan pelayanan
          yang transparan, responsif, dan berpihak kepada kepentingan seluruh
          warga masyarakat.
        </HighlightBlock>

        {/* Featured: Kepala Desa */}
        {headOfficial && (
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-10 sm:p-12 shadow-[0_14px_40px_rgba(7,57,51,0.04)] flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex-shrink-0 flex items-center justify-center text-white text-3xl font-serif"
              style={{ background: "var(--teal)" }}
            >
              ◇
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[2.5px] text-[var(--teal)] mb-2">
                {headOfficial.role}
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-light text-[var(--ink)] leading-tight">
                {headOfficial.name}
              </p>
            </div>
          </div>
        )}

        {/* Grid: Perangkat lainnya */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((official, i) => (
            <div
              key={official.role}
              className="relative rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-7 shadow-[0_14px_40px_rgba(7,57,51,0.03)] transition-all duration-300 hover:shadow-[0_22px_60px_rgba(7,57,51,0.07)] hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="absolute top-5 right-6 font-serif text-[56px] leading-none text-[var(--ink)] opacity-[0.04] select-none pointer-events-none">
                {String(i + 2).padStart(2, "0")}
              </span>
              <p className="text-[10px] font-extrabold uppercase tracking-[1.8px] text-[var(--teal)] mb-3">
                {official.role}
              </p>
              <p className="font-serif text-xl font-light text-[var(--ink)]">
                {official.name}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[var(--muted-2)] mt-2">
          Data nama perangkat desa dapat diperbarui sesuai dokumen resmi pemerintah desa.
        </p>
      </StaticPageContainer>
    </StaticPageLayout>
  );
}
