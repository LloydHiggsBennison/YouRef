import { supabase } from "./supabaseClient.js";

/**
 * Registra una acción en la tabla de trazabilidad audit_logs.
 */
export async function logAction({
  entityType,
  entityId,
  action,
  performedByUserId,
  oldData = null,
  newData = null,
  metadata = {}
}) {
  try {
    const { error } = await supabase.from("audit_logs").insert([
      {
        entity_type: entityType,
        entity_id: entityId,
        action: action,
        performed_by_userid: performedByUserId,
        old_data: oldData,
        new_data: newData,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString()
        }
      }
    ]);

    if (error) {
      console.error("Error al guardar audit log:", error);
    }
  } catch (err) {
    console.error("Excepción al guardar audit log:", err);
  }
}
