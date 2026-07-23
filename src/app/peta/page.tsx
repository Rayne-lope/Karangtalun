import {
  InfoBlock,
  SidebarInfoCard,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
  TwoColumnLayout,
} from "@/components/public/static-page";
import { PetaMap } from "@/components/public/peta-map";
import { getActiveUmkm } from "@/lib/data";
import { getPetaUmkmLocations } from "@/lib/karangtalun-map";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Peta Wilayah",
  description: "Peta interaktif lokasi UMKM Dusun Karangtalun, Kecamatan Ngluwar, Kabupaten Magelang.",
  path: "/peta",
});

const locationDetails = [
  { label: "Dusun", value: "Karangtalun" },
  { label: "Kecamatan", value: "Ngluwar" },
  { label: "Kabupaten", value: "Magelang" },
  { label: "Provinsi", value: "Jawa Tengah" },
  { label: "Kode Pos", value: "56483" },
];

export default async function PetaPage() {
  const locations = getPetaUmkmLocations(await getActiveUmkm());

  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Lokasi UMKM"
        title="Peta Karangtalun"
        description="Jelajahi lokasi usaha warga Karangtalun, lihat informasi singkat, lalu buka rute atau hubungi pelaku UMKM secara langsung."
      />
      <StaticPageContainer>
        <PetaMap locations={locations} />

        <TwoColumnLayout
          main={
            <InfoBlock title="Menemukan UMKM Lokal">
              <p>
                Pilih marker hijau atau nama usaha pada daftar untuk membuka
                profil, rute, serta kontak UMKM. Peta hanya menampilkan usaha
                yang telah memiliki kecocokan lokasi terverifikasi.
              </p>
              <p>
                Batas dusun, jalan, dan aliran sungai ditampilkan sebagai
                konteks wilayah. Lokasi usaha baru akan muncul setelah data
                koordinatnya tersedia dan terverifikasi.
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
