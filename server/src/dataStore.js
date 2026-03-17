import { supabase } from "./supabaseClient.js";

/**
 * Nota: Ya no necesitamos fs ni path para la base de datos local.
 * La trazabilidad se manejará a través de auditService.js en las rutas.
 */

export async function readDb() {
  // Para compatibilidad con el código actual que espera un objeto con arrays
  const { data: users } = await supabase.from("users").select("*");
  const { data: referrals } = await supabase.from("referrals").select("*").order("created_at", { ascending: false });
  
  return {
    users: users || [],
    referrals: referrals || [],
    pendingUsers: users?.filter(u => !u.is_verified) || [],
    passwordResets: [] // Manejado aparte o vía Supabase si se desea
  };
}

// Estos métodos se irán reemplazando por llamadas directas a Supabase en server.js
// pero mantenemos los básicos para compatibilidad durante la transición.

export async function writeDb(nextDb) {
  // Este método es ineficiente con SQL, se recomienda usar métodos específicos 
  // pero lo dejamos como fallback temporal si es necesario.
  console.warn("writeDb llamado: Se recomienda usar funciones específicas de Supabase.");
}

export async function getUserById(id) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
  if (error) return null;
  return data;
}

export async function getUserByEmail(email) {
  const { data, error } = await supabase.from("users").select("*").eq("email", email.toLowerCase()).single();
  if (error) return null;
  return data;
}

export async function createReferral(referral) {
  const { data, error } = await supabase.from("referrals").insert([referral]).select().single();
  if (error) throw error;
  return data;
}

export async function updateReferral(id, updates) {
  const { data, error } = await supabase.from("referrals").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
