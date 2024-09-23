// types/medicine.ts
import { z } from 'zod';

export const MedicineSchema = z.object({
    id: z.number(),
    medicamento: z.string(),
    cantidad: z.number(),
    expirationDate: z.union([z.string().datetime(), z.null()]), // Acepta cadenas de texto y null
});

export const MedicinesSchema = z.array(MedicineSchema);

export type Medicine = z.infer<typeof MedicineSchema>;
