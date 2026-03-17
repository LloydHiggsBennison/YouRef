export function DashboardGroup({ title, color, data, icon }) {
  return (
    <div className="premium-card">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] text-base font-semibold text-white shadow-[0_10px_20px_rgba(15,23,42,0.12)]" style={{ background: color }}>
          {icon}
        </div>
        <div>
          <div className="premium-eyebrow">Pipeline</div>
          <h3 className="font-display text-[1.65rem] font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
        </div>
      </div>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 border border-transparent dark:border-white/5">
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
            <span className="text-lg font-semibold text-slate-950">{item.value || "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MiniBars({ title, data, accent, tone }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className="premium-card">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="premium-eyebrow">Analitica</div>
          <h3 className="font-display text-[1.65rem] font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
        </div>
        <div className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ backgroundColor: tone, color: "rgba(15, 23, 42, 0.9)" }}>
          Dinamico
        </div>
      </div>
      <div className="space-y-5">
        {data.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="font-semibold text-slate-950">{item.value}</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-3 rounded-full transition-all duration-500 render-layer" style={{ width: `${(item.value / max) * 100}%`, background: accent }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
