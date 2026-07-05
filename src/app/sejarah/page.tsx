import {
  HighlightBlock,
  InfoBlock,
  SectionDivider,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
} from "@/components/public/static-page";

export default function SejarahPage() {
  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Jejak Waktu"
        title="Sejarah Desa"
        description="Catatan asal-usul, cerita lokal, dan perkembangan Karangtalun dari masa ke masa — merekam perjalanan panjang sebuah desa yang terus tumbuh."
      />
      <StaticPageContainer>
        <HighlightBlock>
          &ldquo;Nama Karangtalun berakar dari tradisi dan cerita leluhur yang
          menjadi identitas kuat masyarakatnya hingga hari ini.&rdquo;
        </HighlightBlock>

        <InfoBlock title="Asal-Usul Nama" seq="01">
          <p>
            Nama &ldquo;Karangtalun&rdquo; dipercaya berasal dari gabungan dua
            kata dalam bahasa Jawa: <em>karang</em> yang merujuk pada batu atau
            lahan, dan <em>talun</em> yang berarti ladang atau hutan. Gabungan
            ini mencerminkan kondisi geografis wilayah desa pada masa awal
            pembentukannya — sebuah kawasan berladang yang subur dengan tutupan
            alami yang khas.
          </p>
          <p>
            Cerita asal-usul ini diturunkan secara lisan oleh warga setempat
            dan menjadi bagian penting dari identitas kolektif komunitas desa
            yang masih dijaga hingga kini.
          </p>
        </InfoBlock>

        <SectionDivider />

        <InfoBlock title="Era Pembentukan Desa" seq="02">
          <p>
            Seperti banyak desa di wilayah Kabupaten Magelang, Karangtalun
            terbentuk melalui proses pemukiman bertahap yang dipimpin oleh
            tokoh-tokoh masyarakat setempat. Wilayah ini secara administratif
            mulai tercatat sebagai desa definitif dan terus berkembang seiring
            pertumbuhan jumlah penduduk dan pengelolaan lahan.
          </p>
        </InfoBlock>

        <InfoBlock title="Perkembangan Wilayah" seq="03">
          <p>
            Seiring waktu, Desa Karangtalun berkembang melalui beberapa fase
            penting: dari desa agraris yang mengandalkan pertanian, hingga
            berkembangnya usaha-usaha lokal dan kegiatan industri rumahan yang
            memperkuat perekonomian warga.
          </p>
          <p>
            Pembangunan infrastruktur desa, perbaikan jalan, fasilitas
            pendidikan, serta layanan kesehatan turut menjadi penanda kemajuan
            yang berkelanjutan dari masa ke masa.
          </p>
        </InfoBlock>

        <InfoBlock title="Karangtalun Hari Ini" seq="04">
          <p>
            Saat ini, Karangtalun berdiri sebagai desa yang aktif dengan warga
            yang berpartisipasi dalam berbagai kegiatan sosial, ekonomi, dan
            kemasyarakatan. Program KKN dari berbagai universitas yang
            berulang kali hadir turut memperkuat dokumentasi dan pengembangan
            potensi desa secara berkelanjutan.
          </p>
        </InfoBlock>
      </StaticPageContainer>
    </StaticPageLayout>
  );
}
