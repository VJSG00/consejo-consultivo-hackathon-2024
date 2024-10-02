import { z } from 'zod';

export const InventarioActualSchema = z.array(z.object({
    id: z.number(),
    nombreMedicamento: z.string(),
    cantidad: z.number(),
    demanda: z.number(),
    esencial: z.boolean(),
    mes: z.string(),
    club: z.array(z.string()),
    marca: z.string(),
    precioUnidad: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
}));

export type Inventario = z.infer<typeof InventarioActualSchema>;
