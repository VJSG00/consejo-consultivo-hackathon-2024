// types/donante.ts
import { z } from 'zod';

export const DonanteSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    telefono: z.string(),
    correo: z.string(),
    frecuencia: z.enum(['unicos', 'recurrente', 'frecuente', 'periodica']),
    tipo: z.enum(['particular', 'ong', 'privada', 'publico']),
    observaciones: z.string().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export const DonantesSchema = z.array(DonanteSchema);

export type Donante = z.infer<typeof DonanteSchema>;
