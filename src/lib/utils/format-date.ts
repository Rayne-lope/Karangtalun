export function formatDate(value?: string | null) {
  if (!value) {
    return "Belum dipublikasikan";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(new Date(value));
}
