import {
  HighlightBlock,
  InfoBlock,
  SidebarInfoCard,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
  TwoColumnLayout,
} from "@/components/public/static-page";

const facts = [
  { label: "Nama Dusun", value: "Dusun Karangtalun" },
  { label: "Desa", value: "Desa Karangtalun" },
  { label: "Kecamatan", value: "Ngluwar" },
  { label: "Kabupaten", value: "Magelang" },
  { label: "Provinsi", value: "Jawa Tengah" },
  { label: "Kepala Dukuh", value: "Bapak Usman" },
  { label: "Jumlah RT", value: "5 RT" },
  { label: "Kepala Keluarga", value: "129 KK" },
  { label: "Jumlah Penduduk", value: "389 jiwa" },
  { label: "Laki-laki", value: "203 jiwa" },
  { label: "Perempuan", value: "186 jiwa" },
];

export default function ProfilPage() {
  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Profil Wilayah"
        title="Profil Dusun Karangtalun"
        description="Ringkasan umum mengenai wilayah, masyarakat, dan potensi Dusun Karangtalun, Desa Karangtalun, Kecamatan Ngluwar, Kabupaten Magelang."
      />
      <StaticPageContainer>
        <HighlightBlock>
          Dusun Karangtalun terus berkembang dengan tetap menjaga nilai-nilai sejarah, 
          budaya, dan semangat kebersamaan masyarakat dalam mewujudkan lingkungan 
          yang aman, nyaman, dan sejahtera.
        </HighlightBlock>

        <TwoColumnLayout
          main={
            <>
              <InfoBlock title="Identitas Wilayah" seq="01">
                <p>
                  Dusun Karangtalun merupakan salah satu dusun yang berada di wilayah Desa Karangtalun, 
                  Kecamatan Ngluwar, Kabupaten Magelang, Provinsi Jawa Tengah. Dusun ini terdiri atas 
                  lima wilayah Rukun Tetangga (RT), yaitu RT 01, RT 02, RT 03, RT 04, dan RT 05.
                </p>
                <p>
                  Pemerintahan dusun dipimpin oleh Kepala Dukuh yang dibantu oleh para Ketua RT dalam 
                  menyelenggarakan pelayanan kepada masyarakat serta pelaksanaan pembangunan di tingkat dusun.
                </p>
              </InfoBlock>

              <InfoBlock title="Kondisi Umum" seq="02">
                <p>
                  Dusun Karangtalun merupakan kawasan permukiman yang memiliki lingkungan asri dengan 
                  kehidupan masyarakat yang masih menjunjung tinggi nilai gotong royong, kekeluargaan, 
                  dan kebersamaan. Kehidupan sosial masyarakat berjalan dengan harmonis melalui berbagai 
                  kegiatan kemasyarakatan, keagamaan, maupun pembangunan lingkungan yang dilaksanakan secara bersama-sama.
                </p>
                <p>
                  Berdasarkan data administrasi Dusun Karangtalun per Januari 2025, jumlah penduduk mencapai 
                  389 jiwa yang terdiri atas 203 laki-laki dan 186 perempuan, dengan total 129 Kepala Keluarga (KK). 
                  Persebaran penduduk tersebut tersebar di lima wilayah RT yang menjadi bagian dari Dusun Karangtalun.
                </p>
              </InfoBlock>

              <InfoBlock title="Potensi Lokal" seq="03">
                <p>
                  Dusun Karangtalun memiliki potensi lokal yang didukung oleh kondisi geografis serta sumber daya masyarakat. 
                  Sebagian wilayah dusun dimanfaatkan sebagai area pertanian yang menjadi salah satu sumber mata pencaharian 
                  masyarakat. Selain itu, masyarakat Karangtalun juga memiliki semangat gotong royong yang kuat dalam mendukung 
                  berbagai kegiatan sosial, pembangunan, dan pelestarian lingkungan.
                </p>
                <p>
                  Di samping potensi sumber daya alam, Dusun Karangtalun juga memiliki potensi sejarah dan budaya. 
                  Keberadaan situs makam tua yang dipercaya berasal dari masa lampau serta cerita sejarah mengenai 
                  asal-usul Dusun Karangtalun menjadi bagian dari identitas budaya yang diwariskan secara turun-temurun oleh masyarakat.
                </p>
              </InfoBlock>
            </>
          }
          sidebar={
            <SidebarInfoCard title="Informasi Resmi Dusun" items={facts} />
          }
        />
      </StaticPageContainer>
    </StaticPageLayout>
  );
}
