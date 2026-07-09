import {
  HighlightBlock,
  InfoBlock,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
} from "@/components/public/static-page";

const rtList = [
  { rt: "RT 01", name: "Bapak Khoirul Anan" },
  { rt: "RT 02", name: "Bapak Samidi" },
  { rt: "RT 03", name: "Bapak Muhrowi" },
  { rt: "RT 04", name: "Bapak Edi Prayitno" },
  { rt: "RT 05", name: "Bapak Budiono" },
];

export default function StrukturDusunPage() {
  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Kepengurusan Kewilayahan"
        title="Struktur Pemerintahan"
        description="Susunan kepemimpinan dukuh, rukun warga (RW), dan rukun tetangga (RT) di Dusun Karangtalun."
      />
      <StaticPageContainer>
        <HighlightBlock>
          Pemerintahan Dusun Karangtalun dipimpin oleh Kepala Dukuh yang bertugas 
          mengoordinasikan penyelenggaraan pemerintahan, pelayanan kepada masyarakat, 
          serta pembangunan di tingkat dusun. Dalam menjalankan tugasnya, Kepala Dukuh 
          didukung oleh para Ketua Rukun Tetangga (RT) yang berperan sebagai penghubung 
          antara pemerintah dusun dengan masyarakat.
        </HighlightBlock>

        {/* SECTION: Visualisasi Struktur Kewilayahan */}
        <section className="space-y-6">
          <div className="text-left">
            <span className="section-tag mb-3 inline-flex">Struktur Teritorial</span>
            <h2 className="text-2xl font-serif font-medium text-[var(--ink)]">
              Organisasi Kewilayahan RT &amp; RW
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-2xl mt-2 leading-relaxed">
              Bagan koordinasi antara Kepala Dukuh, Ketua RW, dan para Ketua RT di Dusun Karangtalun sebagai pilar pelayanan warga.
            </p>
          </div>

          {/* 1. DESKTOP VISUAL TREE (Horizontal Hierarchy) */}
          <div className="hidden md:flex flex-col items-center w-full py-8 my-4 rounded-[28px] border border-[var(--line)] bg-[var(--paper)]/50 shadow-[0_14px_40px_rgba(7,57,51,0.02)]">
            {/* Kepala Dukuh */}
            <div className="rounded-2xl border border-[var(--teal)] bg-[var(--paper)] px-8 py-4 shadow-[0_8px_30px_rgba(7,57,51,0.04)] text-center w-56">
              <p className="text-[9px] font-extrabold uppercase tracking-[1.8px] text-[var(--teal)] mb-1">Kepala Dukuh</p>
              <p className="font-serif text-lg text-[var(--ink)] font-medium">Bapak Usman</p>
            </div>
            
            {/* Connector Line */}
            <div className="w-px h-8 bg-[var(--teal)]" />
            
            {/* Ketua RW */}
            <div className="rounded-2xl border border-[var(--teal)] bg-[var(--paper)] px-8 py-4 shadow-[0_8px_30px_rgba(7,57,51,0.04)] text-center w-56">
              <p className="text-[9px] font-extrabold uppercase tracking-[1.8px] text-[var(--teal)] mb-1">Ketua RW</p>
              <p className="font-serif text-lg text-[var(--ink)] font-medium">Bapak Tukiran</p>
            </div>
            
            {/* Connector Line */}
            <div className="w-px h-8 bg-[var(--line)]" />
            
            {/* Horizontal connector bar */}
            <div className="relative w-[80%] h-px bg-[var(--line)]" />
            
            {/* 5 Column branch lines and RT boxes */}
            <div className="grid grid-cols-5 w-full px-4">
              {rtList.map((rt) => (
                <div key={rt.rt} className="flex flex-col items-center">
                  <div className="w-px h-6 bg-[var(--line)]" />
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4 text-center w-36 shadow-sm transition-all duration-300 hover:border-[var(--teal)] hover:shadow-[0_10px_25px_rgba(7,57,51,0.06)] hover:-translate-y-0.5">
                    <p className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-[var(--gold)] mb-1.5">Ketua {rt.rt}</p>
                    <p className="font-serif text-sm text-[var(--ink)] font-light leading-snug">{rt.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. MOBILE VISUAL TREE (Vertical Nested Hierarchy) */}
          <div className="flex md:hidden flex-col gap-4 py-6 px-5 rounded-[24px] border border-[var(--line)] bg-[var(--paper)]/50">
            {/* Kepala Dukuh */}
            <div className="rounded-xl border border-[var(--teal)] bg-[var(--paper)] p-4 shadow-sm">
              <p className="text-[8px] font-extrabold uppercase tracking-[1.5px] text-[var(--teal)] mb-0.5">Kepala Dukuh</p>
              <p className="font-serif text-base text-[var(--ink)] font-medium">Bapak Usman</p>
            </div>
            
            {/* Connector line down to RW */}
            <div className="pl-6 border-l-2 border-[var(--teal)] space-y-4">
              {/* Ketua RW */}
              <div className="rounded-xl border border-[var(--teal)] bg-[var(--paper)] p-4 shadow-sm">
                <p className="text-[8px] font-extrabold uppercase tracking-[1.5px] text-[var(--teal)] mb-0.5">Ketua RW</p>
                <p className="font-serif text-base text-[var(--ink)] font-medium">Bapak Tukiran</p>
              </div>
              
              {/* Connector line down to RTs */}
              <div className="pl-6 border-l-2 border-[var(--line)] space-y-3">
                {rtList.map((rt) => (
                  <div key={rt.rt} className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3.5 shadow-sm">
                    <p className="text-[8px] font-extrabold uppercase tracking-[1.5px] text-[var(--gold)] mb-0.5">Ketua {rt.rt}</p>
                    <p className="font-serif text-sm text-[var(--ink)] font-light">{rt.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs italic text-[var(--muted-2)] text-right pr-2">
            Sumber: Hasil wawancara Kepala Dusun, 6 Juli 2026.
          </p>
        </section>

        <SectionDivider />

        {/* SECTION: Komitmen Bersama */}
        <InfoBlock title="Sinergi &amp; Komitmen Pelayanan" seq="—">
          <p className="leading-relaxed">
            Melalui sinergi yang erat antara Kepala Dukuh, Ketua RW, dan para Ketua RT, Pemerintah Dusun Karangtalun 
            berkomitmen penuh untuk mewujudkan tata kelola pemerintahan tingkat dusun yang efektif, transparan, 
            dan responsif terhadap setiap kebutuhan warga masyarakat.
          </p>
          <p className="leading-relaxed mt-4">
            Dengan senantiasa mengedepankan semangat gotong royong, kekeluargaan, dan kebersamaan yang diwariskan oleh 
            para pendahulu, pemerintah dusun terus berupaya meningkatkan kualitas pelayanan publik serta mendukung 
            pembangunan yang berkelanjutan demi meningkatkan kemakmuran dan kesejahteraan seluruh warga Dusun Karangtalun.
          </p>
        </InfoBlock>
      </StaticPageContainer>
    </StaticPageLayout>
  );
}

// Custom SectionDivider since it's used inside the page
function SectionDivider() {
  return <div className="my-14 h-px bg-[var(--line)] w-full" />;
}
