export const profilePalette = ["#0d2a4a", "#0d5d56", "#d4af37", "#4e2f3f", "#1e293b"];

export function currency(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

export function classNames(...values) {
  return values.filter(Boolean).join(" ");
}
