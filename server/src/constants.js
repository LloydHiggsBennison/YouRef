export const USER_ROLES = {
  ADMIN: "admin",
  ADVISOR: "advisor"
};

export const REFERRAL_STAGES = {
  PROSPECT: "prospecto",
  CONTACT: "contacto",
  MANAGEMENT: "gestion",
  CLOSING: "cierre"
};

export const REFERRAL_STATUSES = {
  prospecto: ["Nuevo lead", "Intento de contacto", "Contacto fallido"],
  contacto: ["En proceso", "Propuesta enviada", "Reunión agendada"],
  gestion: ["Negociación", "Aprobación bancaria", "Reserva"],
  cierre: ["Promesa firmada", "Escritura", "Completado"]
};


export const BUYER_GOALS = ["Vivir", "Invertir"];
