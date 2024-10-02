import { z } from 'zod';

export const MedicamentoSchema = z.object({
  id: z.number(),
  nombreMedicamento: z.string(),
  recibidas: z.number(),
  demanda: z.number(),
  esencial: z.boolean(),
  club: z.array(z.string()),
  marca: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const InventarioMensualSchema = z.array(MedicamentoSchema);

export type InventarioMen = z.infer<typeof InventarioMensualSchema>;
