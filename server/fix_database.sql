-- Ejecuta este script en el Editor SQL de Supabase para corregir la tabla 'referrals'

-- 1. Agregar columna para notas de estado si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='referrals' AND column_name='status_note') THEN
        ALTER TABLE referrals ADD COLUMN status_note TEXT;
    END IF;
END $$;

-- 2. Asegurarse de que 'description' existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='referrals' AND column_name='description') THEN
        ALTER TABLE referrals ADD COLUMN description TEXT;
    END IF;
END $$;

-- 3. Asegurarse de que las columnas numéricas sean correctas
ALTER TABLE referrals ALTER COLUMN income TYPE NUMERIC;
ALTER TABLE referrals ALTER COLUMN down_payment TYPE NUMERIC;

-- 4. Verificar que las columnas de nombre existan (snake_case para Supabase)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='referrals' AND column_name='first_name') THEN
        ALTER TABLE referrals ADD COLUMN first_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='referrals' AND column_name='last_name') THEN
        ALTER TABLE referrals ADD COLUMN last_name TEXT;
    END IF;
END $$;
