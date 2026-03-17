import { supabase } from "./src/supabaseClient.js";
import { createId, createOtpCode } from "./src/utils.js";
import { logAction } from "./src/auditService.js";

async function simulateInvite() {
  console.log("--- Simulando Invitación de Admin ---");

  const testEmail = "test_invitado_" + Date.now() + "@example.com";
  const otpCode = createOtpCode();
  
  const newUser = {
    id: createId("usr_test_"),
    first_name: "Test",
    last_name: "Invitado",
    email: testEmail,
    role: "advisor",
    is_verified: false,
    otp_code: otpCode,
    otp_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString()
  };

  console.log(`[ ] Creando usuario invitado: ${testEmail}`);
  const { error: insertError } = await supabase.from("users").insert([newUser]);

  if (insertError) {
    console.error("[-] Error al insertar usuario:", insertError.message);
    return;
  }
  console.log("[+] Usuario invitado creado en Supabase.");

  console.log("[ ] Registrando acción en audit_logs...");
  await logAction({
    entityType: "user",
    entityId: newUser.id,
    action: "invite_simulation",
    performedByUserId: "test_admin",
    newData: { email: testEmail }
  });
  console.log("[+] Acción registrada exitosamente.");

  // Limpiar prueba
  console.log("[ ] Limpiando datos de prueba...");
  await supabase.from("users").delete().eq("id", newUser.id);
  console.log("[+] Prueba finalizada con éxito.");
}

simulateInvite();
