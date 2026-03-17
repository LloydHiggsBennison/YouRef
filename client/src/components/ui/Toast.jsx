export function Toast({ message }) {
  return (
    <div className="pointer-events-none fixed right-6 top-6 z-50 animate-[toastIn_220ms_ease]">
      <div className="min-w-[320px] max-w-[420px] rounded-[1.4rem] border border-[#e8dcc7] bg-white/95 px-5 py-4 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0d5d56]" />
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Actualizacion</div>
            <div className="mt-1 text-sm font-medium text-slate-700">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
