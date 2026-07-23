import {
  HighlightBlock,
  InfoBlock,
  SectionDivider,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
} from "@/components/public/static-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Sejarah Dusun",
  description: "Catatan asal-usul, jejak kepemimpinan, dan warisan budaya Dusun Karangtalun.",
  path: "/sejarah",
});

const leaders = [
  {
    period: "Masa Lampau (Pra-Kemerdekaan)",
    name: "Lurah Sodikromo",
    desc: "Salah satu lurah terdahulu yang memimpin wilayah Karangtalun. Hingga kini, keturunan atau trah beliau masih tinggal dan menjadi bagian erat dari masyarakat Dusun Karangtalun.",
  },
  {
    period: "Era Transisi Kemerdekaan",
    name: "Bapak Harjowasito",
    desc: "Kepala Dukuh yang memimpin jalannya pemerintahan dusun di masa awal penataan wilayah pasca-kemerdekaan.",
  },
  {
    period: "Tahun 1975 – 2002",
    name: "Bapak Nur Salam",
    desc: "Mengabdi selama lebih dari dua dekade. Beliau memimpin Dusun Karangtalun dalam menjaga stabilitas sosial dan kekeluargaan antarwarga.",
  },
  {
    period: "Tahun 2002 – Sekarang",
    name: "Bapak Usman (Kepala Dukuh Aktif)",
    desc: "Menjabat sejak tahun 2002. Beliau memimpin jalannya pelayanan masyarakat dan pembangunan dusun secara berkelanjutan, menyelaraskan tradisi lokal dengan kemajuan zaman.",
  },
];

export default function SejarahPage() {
  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Jejak Waktu &amp; Asal-Usul"
        title="Sejarah Dusun Karangtalun"
        description="Catatan asal-usul wilayah, silsilah kepemimpinan dari masa ke masa, serta kearifan lokal yang mengakar di Dusun Karangtalun."
      />
      <StaticPageContainer>
        <HighlightBlock>
          &ldquo;Sejarah adalah jembatan yang menghubungkan kearifan masa lalu 
          dengan arah gerak masa depan. Dusun Karangtalun merawat setiap cerita 
          dan peninggalan sebagai modal sosial pembangunan.&rdquo;
        </HighlightBlock>

        {/* Bab I: Asal-Usul Nama & Jejak Geologis Merapi */}
        <InfoBlock title="I. Etimologi & Jejak Aliran Lahar Gunung Merapi" seq="—">
          <p className="font-serif text-lg text-[var(--ink)] leading-relaxed mb-4">
            Secara etimologi, asal-usul nama &ldquo;Karangtalun&rdquo; memiliki penafsiran geografis yang mendalam.
          </p>
          <div className="grid gap-6 md:grid-cols-[1fr_280px] items-start">
            <div className="space-y-4 text-sm leading-relaxed text-[var(--muted)]">
              <p>
                Kata <strong>karang</strong> diartikan sebagai batu atau lahan, sedangkan kata <strong>talun</strong> diyakini berkaitan erat dengan jalur aliran lahar. Penafsiran tersebut muncul karena wilayah Karangtalun pada masa lampau diduga kuat pernah dilalui aliran material vulkanik dari Gunung Merapi.
              </p>
              <p>
                Sebagai bukti geologis yang masih dapat disaksikan hingga kini, masyarakat masih dapat menjumpai batu-batu berukuran besar yang tersebar di area persawahan maupun di sekitar aliran sungai sebagai jejak nyata aktivitas vulkanik purba tersebut. Kondisi geografis inilah yang diyakini menjadi salah satu asal mula penamaan Dusun Karangtalun.
              </p>
            </div>
            
            {/* Etymology Card */}
            <div className="rounded-[20px] bg-[var(--cream)]/40 border border-[var(--line)] p-5 text-left space-y-3.5">
              <span className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-[var(--teal)] block">
                Arti Nama Wilayah
              </span>
              <div>
                <p className="font-serif text-lg font-medium text-[var(--ink)] mb-0.5">Karang</p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">Batu / Lahan Berbatu</p>
              </div>
              <div className="h-px bg-[var(--line)]" />
              <div>
                <p className="font-serif text-lg font-medium text-[var(--ink)] mb-0.5">Talun</p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">Jalur Aliran Lahar Gunung</p>
              </div>
            </div>
          </div>
        </InfoBlock>

        <SectionDivider />

        {/* Bab II: Jejak Mataram Kuno */}
        <InfoBlock title="II. Warisan Kerajaan Mataram Kuno" seq="—">
          <p>
            Keberadaan permukiman di Dusun Karangtalun diperkirakan telah ada sejak masa kejayaan Kerajaan Mataram Islam. Hal ini didasarkan pada keberadaan sebuah situs makam tua yang terletak di bagian utara dusun.
          </p>
          <p className="mt-3">
            Masyarakat meyakini bahwa makam tersebut merupakan makam dari seorang pegawai keraton (utusan kerajaan) yang gugur ketika sedang menjalankan tugas mulia. Cerita tersebut diwariskan secara lisan dari generasi ke generasi dan hingga kini masih menjadi bagian sakral dari sejarah lokal masyarakat Karangtalun.
          </p>
          <p className="mt-3">
            Walaupun belum didukung oleh bukti sejarah tertulis yang autentik, keberadaan makam tua tersebut menjadi salah satu peninggalan cagar budaya lokal yang tetap dijaga kelestariannya dan dihormati oleh seluruh masyarakat dusun.
          </p>
        </InfoBlock>

        <SectionDivider />

        {/* Bab III: Otonomi Pra & Pasca-Kemerdekaan */}
        <InfoBlock title="III. Perkembangan Sistem Pemerintahan Wilayah" seq="—">
          <p className="font-serif text-lg text-[var(--ink)] leading-relaxed mb-4">
            Berdasarkan penuturan sesepuh dan Kepala Dukuh Bapak Usman, sebelum proklamasi kemerdekaan Indonesia, wilayah Karangtalun telah memiliki tata pemerintahan lokal mandiri yang dipimpin oleh seorang Lurah.
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Pada masa kolonial, beberapa wilayah di sekitar Karangtalun, seperti Kajuran dan Jangkang, juga memiliki lurah masing-masing yang memimpin otonomi wilayahnya secara independen.
            </p>
            <p>
              Setelah masa kemerdekaan, terjadi penataan administrasi pemerintahan di tingkat desa melalui penggabungan beberapa wilayah otonom kecil tersebut. Proses penyatuan dilakukan melalui pemilihan kepala wilayah desa (Lurah Desa) yang baru. Meskipun pusat pemerintahan administratif desa kemudian ditempatkan di wilayah lain, nama <strong>Karangtalun</strong> tetap dipertahankan secara kuat sebagai identitas kolektif dusun dan tetap hidup hingga saat ini.
            </p>
          </div>
        </InfoBlock>

        <SectionDivider />

        {/* Bab IV: Silsilah Kepemimpinan (Timeline) */}
        <InfoBlock title="IV. Silsilah Estafet Kepemimpinan Dusun" seq="—">
          <p className="mb-8">
            Dalam sejarah perjalanannya, kepemimpinan Dusun Karangtalun terus berjalan secara teratur melalui estafet kepemimpinan para Kepala Dukuh/Kepala Dusun. Berikut adalah urutan kepemimpinan yang tercatat dalam sejarah lisan warga dusun:
          </p>

          {/* Timeline Visual Component */}
          <div className="relative border-l border-[var(--line)] ml-4 pl-8 space-y-8 py-2">
            {leaders.map((leader) => (
              <div key={leader.name} className="relative">
                {/* Timeline Circle */}
                <span className="absolute -left-[38px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[var(--paper)] border-2 border-[var(--teal)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
                </span>
                
                <div>
                  <span className="font-serif text-[11px] font-semibold text-[var(--gold)] uppercase tracking-[1.5px] block">
                    {leader.period}
                  </span>
                  <h4 className="text-lg font-serif font-medium text-[var(--ink)] mt-0.5">
                    {leader.name}
                  </h4>
                  <p className="text-xs text-[var(--muted)] mt-1.5 leading-relaxed max-w-2xl">
                    {leader.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs italic text-[var(--muted-2)]">
            Sumber: Hasil wawancara mendalam dengan Kepala Dukuh Dusun Karangtalun, Bapak Usman, yang menjabat sejak tahun 2002.
          </p>
        </InfoBlock>

        <SectionDivider />

        {/* Kesimpulan */}
        <InfoBlock title="Warisan Budaya &amp; Semangat Hari Ini" seq="—">
          <p>
            Sejarah kepemimpinan dan perjalanan Dusun Karangtalun menunjukkan bahwa wilayah ini memiliki tata kelola kemasyarakatan yang kokoh dan berkelanjutan sejak masa lampau. Nilai-nilai gotong royong, kekeluargaan, dan kebersamaan yang diwariskan oleh para pendahulu masih terus dijaga erat oleh warga.
          </p>
          <p className="mt-3">
            Sebagai dusun yang memiliki sejarah panjang, Karangtalun terus berkembang mengikuti perkembangan zaman tanpa kehilangan akar budayanya. Semangat warga dalam merawat warisan leluhur dan melestarikan tradisi lokal menjadi modal sosial terkuat untuk mewujudkan Dusun Karangtalun yang harmonis, mandiri, dan berdaya.
          </p>
        </InfoBlock>
      </StaticPageContainer>
    </StaticPageLayout>
  );
}
