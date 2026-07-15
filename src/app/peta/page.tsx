import {
  InfoBlock,
  SidebarInfoCard,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
  TwoColumnLayout,
} from "@/components/public/static-page";

const locationDetails = [
  { label: "Dusun", value: "Karangtalun" },
  { label: "Kecamatan", value: "Ngluwar" },
  { label: "Kabupaten", value: "Magelang" },
  { label: "Provinsi", value: "Jawa Tengah" },
  { label: "Kode Pos", value: "56483" },
];

export default function PetaPage() {
  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Lokasi Dusun"
        title="Peta Wilayah"
        description="Temukan lokasi Dusun Karangtalun di Kecamatan Ngluwar, Kabupaten Magelang, Jawa Tengah melalui peta interaktif."
      />
      <StaticPageContainer>
        {/* Peta Utama — dominan dan penuh */}
        <section className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--paper)] shadow-[0_14px_40px_rgba(7,57,51,0.04)] transition-all duration-300 hover:shadow-[0_22px_60px_rgba(7,57,51,0.09)]">
          <div className="aspect-[16/8] bg-[var(--paper-2)] min-h-[450px]">
            <iframe
              title="Peta Dusun Karangtalun, Ngluwar, Magelang"
              src="/qgis/index.html"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>

        <TwoColumnLayout
          main={
            <InfoBlock title="Keterangan Wilayah">
              <p>
                Dusun Karangtalun terletak di Kecamatan Ngluwar, Kabupaten
                Magelang, Provinsi Jawa Tengah. Dusun ini dapat diakses melalui
                jalur darat dari berbagai arah dan berada tidak jauh dari
                pusat kecamatan.
              </p>
              <p>
                Peta di atas menampilkan lokasi umum dusun. Untuk koordinat
                lebih akurat beserta batas-batas wilayah administratif, silakan
                hubungi kantor dusun atau merujuk pada peta wilayah resmi dari
                pemerintah kabupaten.
              </p>
            </InfoBlock>
          }
          sidebar={
            <SidebarInfoCard title="Informasi Lokasi" items={locationDetails} />
          }
        />
      </StaticPageContainer>
    </StaticPageLayout>
  );
}
