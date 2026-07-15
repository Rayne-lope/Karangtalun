type FieldShellProps = {
  id: string;
  label: string;
  help?: string;
  helpRight?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
};

export function FieldShell({ id, label, help, helpRight, error, children }: FieldShellProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[11px] font-extrabold uppercase tracking-[1.8px]"
        style={{ color: "#1c2b24" }}
      >
        {label}
      </label>
      {children}
      {(help || helpRight) && (
        <div className="flex justify-between items-start gap-4">
          <FieldHelp id={`${id}-help`} help={help} />
          {helpRight && (
            <div className="text-[12px] leading-5" style={{ color: "#8b968f" }}>
              {helpRight}
            </div>
          )}
        </div>
      )}
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

export function FieldHelp({ id, help }: { id: string; help?: string }) {
  if (!help) return null;
  return (
    <p id={id} className="text-[12px] leading-5" style={{ color: "#8b968f" }}>
      {help}
    </p>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="text-[12px] font-bold leading-5" style={{ color: "#b91c1c" }}>
      {error}
    </p>
  );
}

export function describedBy(id: string, help?: string, error?: string) {
  return (
    [help ? `${id}-help` : null, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined
  );
}
