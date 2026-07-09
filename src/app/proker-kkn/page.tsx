import {
  HighlightBlock,
  InfoBlock,
  SectionDivider,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
} from "@/components/public/static-page";

export default function ProkerKknPage() {
  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Pengabdian &amp; KKN"
        title="Program Kerja KKN"
        description="Daftar program kerja utama KKN PPM UPN Veteran Yogyakarta Angkatan 84 di Dusun Karangtalun."
      />
      <StaticPageContainer>
        <HighlightBlock>
          &ldquo;Program Kerja KKN PPM UPN Veteran Yogyakarta berfokus pada kolaborasi,
          inovasi, dan pemberdayaan masyarakat untuk mewujudkan pembangunan Dusun
          Karangtalun yang berdaya dan mandiri.&rdquo;
        </HighlightBlock>

        <InfoBlock title="1. Digitalisasi Informasi &amp; Website Dusun" seq="01">
          <p className="font-serif text-lg text-[var(--ink)] leading-relaxed">
            Pengembangan portal informasi dusun sebagai pusat publikasi berita, UMKM, galeri, dan profil wilayah secara digital.
          </p>
          <p className="mt-3">
            Program ini mencakup pembuatan website resmi dusun, pelatihan pengelolaan sistem admin web untuk pemuda/karang taruna, dan optimalisasi penyebaran informasi kegiatan secara online.
          </p>
        </InfoBlock>

        <SectionDivider />

        <InfoBlock title="2. Pemberdayaan UMKM &amp; Pemasaran Kreatif" seq="02">
          <p className="font-serif text-lg text-[var(--ink)] leading-relaxed">
            Mendorong daya saing produk lokal melalui pembuatan materi branding, kemasan produk, dan digital marketing.
          </p>
          <p className="mt-3">
            Fokus program ini adalah melakukan pendampingan kepada pelaku usaha kriya, kuliner, dan kopi lokal agar dapat mengoptimalkan promosi, memperluas akses pasar melalui media sosial, serta mendesain kemasan yang lebih menarik.
          </p>
        </InfoBlock>

        <SectionDivider />

        <InfoBlock title="3. Pemetaan &amp; Sistem Informasi Geografis" seq="03">
          <p className="font-serif text-lg text-[var(--ink)] leading-relaxed">
            Penyusunan peta digital batas wilayah dan sebaran potensi ekonomi di setiap RT Dusun Karangtalun.
          </p>
          <p className="mt-3">
            Kegiatan berupa pengambilan data koordinat batas wilayah administratif, lokasi UMKM, serta fasilitas umum untuk diolah menjadi peta digital interaktif yang berguna bagi perencanaan pembangunan dusun ke depan.
          </p>
        </InfoBlock>

        <SectionDivider />

        <InfoBlock title="4. Edukasi Pola Hidup Bersih &amp; Sehat (PHBS)" seq="04">
          <p className="font-serif text-lg text-[var(--ink)] leading-relaxed">
            Sosialisasi kebersihan lingkungan, pemilahan sampah, serta pendataan kondisi sanitasi warga dusun.
          </p>
          <p className="mt-3">
            Program ini meliputi sosialisasi pentingnya pemilahan sampah sejak dari rumah, kerja bakti bersama warga, serta pengumpulan data kondisi sarana sanitasi guna mendukung program kesehatan lingkungan dusun.
          </p>
        </InfoBlock>
      </StaticPageContainer>
    </StaticPageLayout>
  );
}
