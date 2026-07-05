type ErrorMessageProps = {
  message?: string | string[];
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  const text = Array.isArray(message) ? message[0] : message;
  if (!text) return null;

  return (
    <div
      className="rounded-2xl border px-5 py-4 text-sm font-medium leading-relaxed"
      style={{
        background: "rgba(185,28,28,0.04)",
        borderColor: "rgba(185,28,28,0.18)",
        color: "#b91c1c",
      }}
    >
      {text}
    </div>
  );
}
