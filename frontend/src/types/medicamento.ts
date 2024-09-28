// types/medicamento.ts
import { z } from 'zod';

export const MedicamentoSchema = z.object({
    id: z.number(),
    idDonante: z.number(),
    idPaciente: z.number().nullable(),
    nombre: z.string(),
    esencial: z.boolean(),
    insumo: z.boolean(),
    fechaPaciente: z.string().datetime().nullable(),
    fechaVencimiento: z.string().datetime(),
    tipo: z.array(z.string()),
    devuelto: z.boolean(),
    presentacion: z.string(),
    fechaDonante: z.string().datetime(),
    observaciones: z.string().nullable(),
    marca: z.string(),
    precio: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export const MedicamentosSchema = z.array(MedicamentoSchema);

export type Medicamento = z.infer<typeof MedicamentoSchema>;
