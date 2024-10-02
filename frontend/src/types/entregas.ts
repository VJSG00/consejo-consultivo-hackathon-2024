// types/entrega.ts
import { z } from 'zod';

export const EntregaSchema = z.object({
    id: z.number(),
    fechaDonante: z.string().datetime(),
    idDonante: z.number(),
    cantidadUnidades: z.array(z.number()),
    motivo: z.string(),
    comunidad: z.string(),
    observaciones: z.string().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export const EntregasSchema = z.array(EntregaSchema);

export type Entrega = z.infer<typeof EntregaSchema>;
