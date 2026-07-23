import {
  BigStatGrid,
  InfoBlock,
  SectionDivider,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
} from "@/components/public/static-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Data & Statistik Dusun",
  description: "Data kependudukan, distribusi RT, dan statistik administratif Dusun Karangtalun.",
  path: "/data-dusun",
});

const stats = [
  {
    label: "Jumlah Penduduk",
    value: "389",
    description: "Terdiri atas 203 laki-laki dan 186 perempuan.",
  },
  {
    label: "Kepala Keluarga",
    value: "129",
    description: "Jumlah KK terdaftar secara administratif per Januari 2025.",
  },
  {
    label: "Jumlah RT",
    value: "5",
    description: "Dusun Karangtalun terbagi menjadi lima wilayah RT.",
  },
  {
    label: "Rasio Gender",
    value: "52%",
    description: "Proporsi warga laki-laki (203) dibandingkan perempuan (186).",
  },
];

const rtData = [
  { name: "RT 01", kk: 26, male: 46, female: 42, total: 88 },
  { name: "RT 02", kk: 29, male: 41, female: 35, total: 76 },
  { name: "RT 03", kk: 16, male: 24, female: 19, total: 43 },
  { name: "RT 04", kk: 27, male: 44, female: 44, total: 88 },
  { name: "RT 05", kk: 31, male: 48, female: 46, total: 94 },
];

export default function DataDusunPage() {
  const totals = rtData.reduce(
    (acc, curr) => ({
      kk: acc.kk + curr.kk,
      male: acc.male + curr.male,
      female: acc.female + curr.female,
      total: acc.total + curr.total,
    }),
    { kk: 0, male: 0, female: 0, total: 0 }
  );

  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Angka &amp; Fakta"
        title="Data &amp; Statistik Dusun"
        description="Ringkasan data kependudukan, distribusi wilayah, dan administratif Dusun Karangtalun per Januari 2025."
      />
      <StaticPageContainer>
        {/* KPI Grid */}
        <BigStatGrid stats={stats} />

        <SectionDivider />

        {/* RT Visual Breakdown Cards */}
        <section className="space-y-6">
          <div className="text-left">
            <span className="section-tag mb-3 inline-flex">Distribusi Demografi</span>
            <h2 className="text-2xl font-serif font-medium text-[var(--ink)]">
              Persebaran Penduduk per RT
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-2xl mt-2 leading-relaxed">
              Visualisasi proporsi jumlah KK, total penduduk, serta perbandingan gender di setiap wilayah Rukun Tetangga (RT) Dusun Karangtalun.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rtData.map((rt) => {
              const malePercent = ((rt.male / rt.total) * 100).toFixed(1);
              const femalePercent = ((rt.female / rt.total) * 100).toFixed(1);

              return (
                <div
                  key={rt.name}
                  className="rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_14px_40px_rgba(7,57,51,0.02)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(7,57,51,0.07)] hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-serif text-2xl font-light text-[var(--ink)]">
                      {rt.name}
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase tracking-[1.5px] bg-[var(--cream)] border border-[var(--line)] text-[var(--teal)] px-3 py-1 rounded-full">
                      Wilayah RT
                    </span>
                  </div>

                  {/* RT Mini Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 border-b border-[var(--line)] pb-5">
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-[var(--muted-2)] mb-1">
                        Kepala Keluarga
                      </p>
                      <p className="font-serif text-xl font-light text-[var(--ink)]">
                        {rt.kk} <span className="text-xs text-[var(--muted)] font-sans">KK</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-[var(--muted-2)] mb-1">
                        Total Penduduk
                      </p>
                      <p className="font-serif text-xl font-light text-[var(--ink)]">
                        {rt.total} <span className="text-xs text-[var(--muted)] font-sans">jiwa</span>
                      </p>
                    </div>
                  </div>

                  {/* Gender Ratio Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-[var(--muted-2)]">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[var(--teal)]" />
                        L: {rt.male} ({malePercent}%)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                        P: {rt.female} ({femalePercent}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-[var(--cream)] border border-[var(--line)] flex overflow-hidden">
                      <div
                        style={{ width: `${malePercent}%` }}
                        className="h-full bg-[var(--teal)] transition-all duration-500"
                        title={`Laki-laki: ${rt.male} jiwa`}
                      />
                      <div
                        style={{ width: `${femalePercent}%` }}
                        className="h-full bg-[var(--gold)] transition-all duration-500"
                        title={`Perempuan: ${rt.female} jiwa`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <SectionDivider />

        {/* Premium Data Table */}
        <section className="space-y-6">
          <div className="text-left">
            <span className="section-tag mb-3 inline-flex">Format Tabular</span>
            <h2 className="text-2xl font-serif font-medium text-[var(--ink)]">
              Tabel Demografi Rinci
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-2xl mt-2 leading-relaxed">
              Tabel data administratif kependudukan resmi Dusun Karangtalun berdasarkan masing-masing Rukun Tetangga (RT).
            </p>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--paper)] shadow-[0_14px_40px_rgba(7,57,51,0.02)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--line)] bg-[var(--cream)]/40">
                    <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-[2px] text-[var(--muted-2)]">
                      Rukun Tetangga (RT)
                    </th>
                    <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-[2px] text-[var(--muted-2)] text-right">
                      Jumlah KK
                    </th>
                    <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-[2px] text-[var(--muted-2)] text-right">
                      Laki-Laki
                    </th>
                    <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-[2px] text-[var(--muted-2)] text-right">
                      Perempuan
                    </th>
                    <th className="py-4 px-6 text-[10px] font-extrabold uppercase tracking-[2px] text-[var(--muted-2)] text-right">
                      Total Penduduk
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rtData.map((rt) => (
                    <tr
                      key={rt.name}
                      className="border-b border-[var(--line)] transition-colors duration-200 hover:bg-[var(--cream)]/20"
                    >
                      <td className="py-4.5 px-6 font-serif text-lg font-light text-[var(--ink)]">
                        {rt.name}
                      </td>
                      <td className="py-4.5 px-6 text-right font-serif text-lg font-light text-[var(--ink)]">
                        {rt.kk} <span className="text-xs text-[var(--muted)] font-sans">KK</span>
                      </td>
                      <td className="py-4.5 px-6 text-right font-serif text-lg font-light text-[var(--ink)]">
                        {rt.male} <span className="text-xs text-[var(--muted)] font-sans">jiwa</span>
                      </td>
                      <td className="py-4.5 px-6 text-right font-serif text-lg font-light text-[var(--ink)]">
                        {rt.female} <span className="text-xs text-[var(--muted)] font-sans">jiwa</span>
                      </td>
                      <td className="py-4.5 px-6 text-right font-serif text-xl text-[var(--teal)] font-medium">
                        {rt.total} <span className="text-xs text-[var(--muted)] font-sans">jiwa</span>
                      </td>
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr className="bg-[var(--cream)]/30 font-bold">
                    <td className="py-5 px-6 font-serif text-lg text-[var(--ink)]">
                      Total Dusun
                    </td>
                    <td className="py-5 px-6 text-right font-serif text-lg text-[var(--ink)]">
                      {totals.kk} <span className="text-xs text-[var(--ink)] opacity-70 font-sans">KK</span>
                    </td>
                    <td className="py-5 px-6 text-right font-serif text-lg text-[var(--ink)]">
                      {totals.male} <span className="text-xs text-[var(--ink)] opacity-70 font-sans">jiwa</span>
                    </td>
                    <td className="py-5 px-6 text-right font-serif text-lg text-[var(--ink)]">
                      {totals.female} <span className="text-xs text-[var(--ink)] opacity-70 font-sans">jiwa</span>
                    </td>
                    <td className="py-5 px-6 text-right font-serif text-2xl text-[var(--teal)]">
                      {totals.total} <span className="text-xs text-[var(--teal)] font-sans">jiwa</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[11px] text-[var(--muted-2)] font-semibold text-right pr-4 italic">
            Sumber: Data Administrasi Dusun Karangtalun, per Januari 2025.
          </p>
        </section>

        <SectionDivider />

        {/* Insights and Catatan Data */}
        <InfoBlock title="Analisis &amp; Rangkuman Data" seq="—">
          <p className="leading-relaxed">
            Data administratif kependudukan per Januari 2025 ini menunjukkan bahwa persebaran penduduk di wilayah 
            Dusun Karangtalun relatif merata pada setiap Rukun Tetangga (RT). Wilayah dengan jumlah penduduk terbanyak 
            berada di <strong>RT 05</strong> dengan total 94 jiwa, diikuti oleh <strong>RT 01</strong> dan <strong>RT 04</strong> yang masing-masing 
            memiliki populasi sebanyak 88 jiwa. Wilayah dengan jumlah penduduk paling sedikit berada di <strong>RT 03</strong> dengan 43 jiwa.
          </p>
          <p className="leading-relaxed mt-4">
            Informasi statistik kependudukan ini menjadi instrumen perencanaan pembangunan yang sangat vital. 
            Melalui data rincian per RT ini, pemerintah dusun beserta tim KKN PPM UPN Veteran Yogyakarta dapat 
            menilai prioritas kebutuhan masyarakat, merumuskan program kesehatan (seperti pemetaan sanitasi dan PHBS), 
            serta memetakan sebaran pelaku UMKM secara presisi di setiap rukun tetangga.
          </p>
        </InfoBlock>
      </StaticPageContainer>
    </StaticPageLayout>
  );
}
