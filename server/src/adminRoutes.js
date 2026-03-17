import express from "express";
import { adminRequired, authRequired } from "./auth.js";
import { supabase } from "./supabaseClient.js";
import { createId, createOtpCode } from "./utils.js";
import { sendMail } from "./emailService.js";
import { logAction } from "./auditService.js";

const router = express.Router();

/**
 * Invitación de nuevo usuario por parte del Admin.
 * Flujo: Admin -> Solo email/nombre -> Sistema -> OTP -> Usuario.
 */
router.post("/users/invite", authRequired(), adminRequired(), async (req, res) => {
  const { firstName, lastName, email, role } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: "Nombre, apellido y correo son obligatorios." });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    
    // Verificar si el usuario ya existe
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", normalizedEmail)
      .single();

    if (existingUser) {
      return res.status(409).json({ message: "Ya existe un usuario con este correo electrónico." });
    }

    const otpCode = createOtpCode();
    const newUser = {
      id: createId("usr_"),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: normalizedEmail,
      role: role || "advisor",
      is_verified: false,
      otp_code: otpCode,
      otp_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas para invitaciones
      invited_by_userid: req.user.id,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from("users").insert([newUser]);
    if (error) throw error;

    // Trazabilidad
    await logAction({
      entityType: "user",
      entityId: newUser.id,
      action: "invite",
      performedByUserId: req.user.id,
      newData: { email: normalizedEmail, role: newUser.role }
    });

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const registrationUrl = `${clientUrl}?email=${encodeURIComponent(normalizedEmail)}&otp=${otpCode}`;

    // Enviar correo
    await sendMail({
      to: normalizedEmail,
      subject: "Invitación a YouRef CRM",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #0d2a4a;">Hola ${firstName},</h2>
          <p>Has sido invitado a unirte al equipo de <strong>YouRef CRM</strong> como ${newUser.role}.</p>
          <p>Para completar tu registro, por favor haz clic en el siguiente enlace e ingresa tu código de activación:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${registrationUrl}" style="background-color: #0d2a4a; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Ir al Registro</a>
          </div>
          <p style="text-align: center; font-size: 1.2em;">Tu código de activación es: <strong>${otpCode}</strong></p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 0.8em; color: #666;">Si el botón no funciona, copia y pega este enlace en tu navegador: ${registrationUrl}</p>
        </div>
      `,
      debugPayload: { otpCode, registrationUrl }
    });

    res.status(201).json({ message: "Invitación enviada correctamente." });
  } catch (err) {
    console.error("Error en invite:", err);
    res.status(500).json({ message: "Error interno al procesar la invitación." });
  }
});

export default router;
