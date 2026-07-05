import {
  HighlightBlock,
  InfoBlock,
  SectionDivider,
  SidebarInfoCard,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
  TwoColumnLayout,
} from "@/components/public/static-page";

const facts = [
  { label: "Kecamatan", value: "Ngluwar" },
  { label: "Kabupaten", value: "Magelang" },
  { label: "Provinsi", value: "Jawa Tengah" },
  { label: "Kode Pos", value: "56483" },
  { label: "Dusun", value: "4 Dusun" },
  { label: "Status Wilayah", value: "Desa Definitif" },
];

export default function ProfilPage() {
  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Profil Wilayah"
        title="Profil Desa Karangtalun"
        description="Ringkasan umum mengenai wilayah, masyarakat, dan arah pengembangan Desa Karangtalun, Kecamatan Ngluwar, Kabupaten Magelang."
      />
      <StaticPageContainer>
        <HighlightBlock>
          Desa Karangtalun adalah wilayah yang kaya akan nilai gotong royong,
          potensi alam, dan semangat warga yang terus berkembang di tepi
          Kecamatan Ngluwar, Kabupaten Magelang.
        </HighlightBlock>

        <TwoColumnLayout
          main={
            <>
              <InfoBlock title="Gambaran Umum" seq="01">
                <p>
                  Desa Karangtalun merupakan wilayah desa yang terletak di
                  Kecamatan Ngluwar, Kabupaten Magelang, Provinsi Jawa Tengah.
                  Desa ini memiliki kehidupan masyarakat yang aktif dan beragam,
                  dengan mayoritas penduduk bermata pencaharian di sektor
                  pertanian, perdagangan, dan usaha mikro lokal.
                </p>
                <p>
                  Dengan empat dusun yang masing-masing memiliki karakter dan
                  potensi tersendiri, Karangtalun berkembang sebagai desa yang
                  mandiri dengan dukungan pemerintahan desa yang responsif
                  terhadap kebutuhan warga.
                </p>
              </InfoBlock>

              <InfoBlock title="Potensi Desa" seq="02">
                <p>
                  Potensi utama desa meliputi kegiatan pertanian yang subur,
                  usaha mikro kecil menengah berbasis kuliner dan kerajinan
                  tangan, serta sumber daya manusia yang aktif dalam kegiatan
                  sosial kemasyarakatan.
                </p>
                <p>
                  Kehadiran mahasiswa KKN dari berbagai universitas turut
                  mendorong pengembangan potensi desa melalui program kerja
                  yang berfokus pada pemberdayaan warga, digitalisasi informasi
                  desa, dan penguatan identitas lokal.
                </p>
              </InfoBlock>
            </>
          }
          sidebar={
            <SidebarInfoCard title="Identitas Wilayah" items={facts} />
          }
        />

        <SectionDivider />

        <InfoBlock title="Program Pengembangan" seq="03">
          <p>
            Pemerintah Desa Karangtalun secara aktif menjalankan berbagai
            program pengembangan infrastruktur, pelayanan publik digital,
            dan pemberdayaan ekonomi warga sebagai bagian dari visi desa
            yang maju dan mandiri.
          </p>
        </InfoBlock>
      </StaticPageContainer>
    </StaticPageLayout>
  );
}
