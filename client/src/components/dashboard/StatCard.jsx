import { classNames } from "../../utils";

export function StatCard({ label, value, accent = "from-[#183153] to-[#244f7c]", hint }) {
  return (
    <div className="premium-card group h-full">
      <div className={classNames("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r opacity-80 transition-opacity group-hover:opacity-100", accent)} />
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</div>
          <div className="font-display text-4xl font-bold tracking-tight text-slate-900">{value}</div>
        </div>
        {hint && <div className="mt-4 text-[11px] font-medium text-slate-500 italic">{hint}</div>}
      </div>
    </div>
  );
}

export function AdminInsightCard({ label, value, hint, accent }) {
  return (
    <div className="premium-card overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</div>
      <div className="mt-3 font-display text-5xl font-semibold tracking-[-0.06em] text-slate-950">{value}</div>
      <div className="mt-2 text-sm text-slate-600">{hint}</div>
    </div>
  );
}
