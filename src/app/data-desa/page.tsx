import {
  BigStatGrid,
  InfoBlock,
  SectionDivider,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
} from "@/components/public/static-page";

const stats = [
  {
    label: "Jumlah Penduduk",
    value: "—",
    description: "Ganti dengan jumlah penduduk terbaru dari data resmi desa.",
  },
  {
    label: "Kepala Keluarga",
    value: "—",
    description: "Ganti dengan jumlah KK yang terdaftar secara administratif.",
  },
  {
    label: "Jumlah Dusun",
    value: "4",
    description: "Desa Karangtalun terdiri atas empat dusun.",
  },
  {
    label: "RT / RW",
    value: "— / —",
    description: "Ganti dengan jumlah RT dan RW aktif dari data pemerintah desa.",
  },
];

export default function DataDesaPage() {
  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Angka & Fakta"
        title="Data & Statistik Desa"
        description="Ringkasan data kependudukan dan administratif Desa Karangtalun sebagai gambaran umum kondisi wilayah."
      />
      <StaticPageContainer>
        <BigStatGrid stats={stats} />

        <SectionDivider />

        <InfoBlock title="Catatan Data" seq="—">
          <p>
            Angka-angka pada halaman ini merupakan placeholder yang perlu
            diperbarui dengan data resmi terbaru dari pemerintah desa sebelum
            website dipublikasikan secara luas.
          </p>
          <p>
            Data kependudukan tersedia di kantor desa Karangtalun atau melalui
            sistem administrasi kependudukan yang resmi. Pembaruan data secara
            berkala memastikan informasi yang disajikan tetap akurat dan dapat
            dipertanggungjawabkan.
          </p>
        </InfoBlock>
      </StaticPageContainer>
    </StaticPageLayout>
  );
}
