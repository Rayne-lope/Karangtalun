import {
  HighlightBlock,
  InfoBlock,
  SidebarInfoCard,
  StaticPageContainer,
  StaticPageHeader,
  StaticPageLayout,
  TwoColumnLayout,
} from "@/components/public/static-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Kontak Dusun",
  description: "Hubungi Dusun Karangtalun untuk informasi layanan, kegiatan, dan kerja sama.",
  path: "/kontak",
});

const operationalHours = [
  { label: "Senin – Kamis", value: "08.00 – 15.00 WIB" },
  { label: "Jumat", value: "08.00 – 11.30 WIB" },
  { label: "Sabtu & Minggu", value: "Tutup" },
];

export default function KontakPage() {
  return (
    <StaticPageLayout>
      <StaticPageHeader
        eyebrow="Hubungi Kami"
        title="Kontak Dusun"
        description="Informasi alamat, kontak, dan jam layanan kantor Dusun Karangtalun yang dapat dihubungi oleh warga maupun pengunjung."
      />
      <StaticPageContainer>
        <HighlightBlock>
          Kami siap melayani Anda. Jangan ragu menghubungi kantor dusun
          untuk informasi, layanan administrasi, atau pertanyaan seputar
          Dusun Karangtalun.
        </HighlightBlock>

        <TwoColumnLayout
          main={
            <>
              <InfoBlock title="Alamat Kantor Dusun" seq="01">
                <p>Kantor Dusun Karangtalun</p>
                <p>
                  Dusun Karangtalun, Kecamatan Ngluwar,
                  <br />
                  Kabupaten Magelang, Jawa Tengah 56483
                </p>
              </InfoBlock>

              <InfoBlock title="Kontak Langsung" seq="02">
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[1.8px] text-[var(--muted-2)] mb-1">
                      Telepon
                    </p>
                    <p className="font-serif text-lg text-[var(--ink)]">
                      081215503366
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[1.8px] text-[var(--muted-2)] mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:ngluwarkarangtalun@gmail.com"
                      className="font-serif text-lg text-[var(--teal)] hover:underline"
                    >
                      ngluwarkarangtalun@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <a
                    href="https://wa.me/6281215503366"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[var(--teal)] px-8 text-[10px] font-extrabold tracking-[1.8px] uppercase text-white shadow-sm transition-all duration-300 hover:bg-[var(--teal-2)] hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                  >
                    Hubungi WhatsApp →
                  </a>
                  <a
                    href="mailto:ngluwarkarangtalun@gmail.com"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper-2)] px-8 text-[10px] font-extrabold tracking-[1.8px] uppercase text-[var(--ink)] transition-all duration-300 hover:border-[var(--teal)] hover:-translate-y-0.5 hover:shadow-sm active:scale-95"
                  >
                    Kirim Email
                  </a>
                </div>
              </InfoBlock>
            </>
          }
          sidebar={
            <SidebarInfoCard title="Jam Operasional" items={operationalHours} />
          }
        />
      </StaticPageContainer>
    </StaticPageLayout>
  );
}
