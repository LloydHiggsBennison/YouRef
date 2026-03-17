export function DonutChart({ title, subtitle, data, centerLabel, centerValue }) {
  const safeData = data.filter((item) => item.value > 0);
  const fallbackData = safeData.length ? safeData : [{ label: "Sin datos", value: 1, color: "#d8dee8" }];
  const total = fallbackData.reduce((sum, item) => sum + item.value, 0);
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  return (
    <div className="premium-card">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="premium-eyebrow">Visualizacion</div>
          <h3 className="font-display text-[1.65rem] font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Donut</div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
        <div className="relative mx-auto h-[220px] w-[220px]">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
            <circle cx="100" cy="100" r={radius} fill="none" stroke="#edf1f6" strokeWidth="22" />
            {fallbackData.map((item) => {
              const slice = (item.value / total) * circumference;
              const dashArray = `${slice} ${circumference - slice}`;
              const dashOffset = -currentOffset;
              currentOffset += slice;
              return <circle key={item.label} cx="100" cy="100" r={radius} fill="none" stroke={item.color} strokeWidth="22" strokeDasharray={dashArray} strokeDashoffset={dashOffset} strokeLinecap="butt" />;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{centerLabel}</div>
            <div className="mt-1 font-display text-5xl font-semibold tracking-[-0.06em] text-slate-950">{centerValue}</div>
          </div>
        </div>

        <div className="space-y-3">
          {fallbackData.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-950">{item.value}</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{Math.round((item.value / total) * 100)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StageTable({ rows }) {
  const total = Math.max(rows.reduce((sum, row) => sum + row.value, 0), 1);
  return (
    <div className="premium-card">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="premium-eyebrow">Etapas</div>
          <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-slate-950">Distribucion del pipeline</h3>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Q referidos</div>
      </div>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: row.color }} />
                <span className="font-medium text-slate-700">{row.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-950">{row.value}</span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{Math.round((row.value / total) * 100)}%</span>
              </div>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full" style={{ width: `${(row.value / total) * 100}%`, backgroundColor: row.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatusGrid({ rows }) {
  return (
    <div className="premium-card">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="premium-eyebrow">Detalle</div>
          <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-slate-950">Estados de referidos</h3>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Actual</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: row.color }} />
                <span className="text-sm font-medium text-slate-700">{row.label}</span>
              </div>
              <span className="font-display text-3xl font-semibold tracking-[-0.04em] text-slate-950">{row.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
