import {
  HighlightBlock,
  InfoBlock,
  SectionDivider,
  SimpleList,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
} from "@/components/public/static-page";

const missions = [
  "Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, dan berpihak kepada kepentingan warga.",
  "Mendorong pemberdayaan masyarakat melalui kegiatan ekonomi, sosial, pendidikan, dan kesehatan yang inklusif.",
  "Mengembangkan potensi UMKM, pertanian lokal, dan sumber daya alam desa secara berkelanjutan.",
  "Memperkuat solidaritas, gotong royong, dan partisipasi warga dalam setiap proses pembangunan desa.",
  "Meningkatkan kualitas infrastruktur desa dan fasilitas pelayanan publik yang merata dan meningkat kualitasnya.",
];

export default function VisiMisiPage() {
  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Arah & Tujuan"
        title="Visi dan Misi"
        description="Arah pembangunan dan tujuan pengembangan Desa Karangtalun yang menjadi panduan gerak pemerintahan desa."
      />
      <StaticPageContainer>
        <HighlightBlock>
          Terwujudnya Desa Karangtalun yang maju, tertata, mandiri, dan berdaya
          melalui pelayanan publik yang baik serta partisipasi aktif seluruh
          lapisan masyarakat.
        </HighlightBlock>

        <InfoBlock title="Visi Desa" seq="—">
          <p className="font-serif text-xl text-[var(--ink)] leading-relaxed">
            &ldquo;Terwujudnya Desa Karangtalun yang maju, tertata, mandiri,
            dan berdaya melalui pelayanan publik yang baik serta partisipasi
            aktif masyarakat.&rdquo;
          </p>
          <p className="mt-3">
            Visi ini menjadi kompas utama seluruh kebijakan dan program kerja
            pemerintah desa dalam membangun Karangtalun yang lebih baik untuk
            generasi kini dan mendatang.
          </p>
        </InfoBlock>

        <SectionDivider />

        <InfoBlock title="Misi Desa" seq="—">
          <SimpleList items={missions} />
        </InfoBlock>
      </StaticPageContainer>
    </StaticPageLayout>
  );
}
