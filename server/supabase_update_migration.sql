-- Migración para actualizar tablas existentes a la nueva estructura de YouRef CRM

-- 1. Actualizar tabla 'users'
-- Asegurarse de que las columnas existan o agregarlas si no están
DO $$ 
BEGIN
    -- Agregar columnas si no existen
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='otp_code') THEN
        ALTER TABLE users ADD COLUMN otp_code TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='otp_expires_at') THEN
        ALTER TABLE users ADD COLUMN otp_expires_at TIMESTAMPTZ;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='invited_by_userid') THEN
        ALTER TABLE users ADD COLUMN invited_by_userid TEXT;
    END IF;

    -- Hacer RUT y password_hash opcionales para el flujo de invitación
    ALTER TABLE users ALTER COLUMN rut DROP NOT NULL;
    ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;
END $$;

-- 2. Actualizar tabla 'referrals'
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='referrals' AND column_name='updated_by_userid') THEN
        ALTER TABLE referrals ADD COLUMN updated_by_userid TEXT;
    END IF;
END $$;

-- 3. Crear tabla 'audit_logs' si no existe
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL, -- 'user', 'referral', 'auth'
    entity_id TEXT,
    action TEXT NOT NULL, -- 'create', 'update', 'delete', 'login', 'status_change'
    performed_by_userid TEXT,
    old_data JSONB,
    new_data JSONB,
    metadata JSONB, -- IPs, User Agents, etc.
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Crear tabla 'sessions' si no existe
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    token TEXT NOT NULL UNIQUE,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- 5. Crear políticas básicas para el Service Role (opcional, usualmente ya tiene acceso)
-- Pero si se desea que el backend maneje todo:
-- CREATE POLICY "Service role full access" ON users FOR ALL TO service_role USING (true);
