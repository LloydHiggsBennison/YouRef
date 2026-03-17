export function Field({ label, value, onChange, type = "text", disabled = false }) {
  return (
    <label className={`block ${disabled ? "cursor-not-allowed opacity-80" : ""}`}>
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</span>
      <input 
        type={type} 
        value={value} 
        onChange={(event) => !disabled && onChange(event.target.value)} 
        className={`premium-input ${disabled ? "bg-slate-100/80 border-slate-200 text-slate-400 select-none pointer-events-none" : ""}`}
        readOnly={disabled}
        tabIndex={disabled ? -1 : 0}
      />
    </label>
  );
}

export function SectionTitle({ eyebrow, title, description }) {
  return (
    <div>
      {eyebrow ? <div className="premium-eyebrow">{eyebrow}</div> : null}
      <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950">{title}</h2>
      {description ? <p className="mt-2 max-w-2xl text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}
