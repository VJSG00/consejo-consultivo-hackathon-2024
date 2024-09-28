import { z } from 'zod';

export const InventarioMensualSchema = z.object({
  pacientesActivos: z.number(),
  totalPacientes: z.number(),
  totalDonantes: z.number(),
  totalEntregas: z.number(),
  medicamentosMasSolicitados: z.array(z.object({
    nombre: z.string(),
    value: z.string(),
  })),
  comunidadesConMasPeticiones: z.array(z.object({
    comunidad: z.string(),
    value: z.string(),
  })),
  clubesDeEnfermedadesComunes: z.array(z.unknown()), // Asumiendo que es un array vacío o de objetos desconocidos
  pacientes: z.array(z.unknown()), // Asumiendo que es un array vacío o de objetos desconocidos
  medicamentosPorMes: z.array(z.object({
    mes: z.string().datetime(),
    cantidad: z.string(),
  })),
  donantesPorMes: z.array(z.object({
    mes: z.string().datetime(),
    cantidad: z.string(),
  })),
  porcentajeDemandaAbastecida: z.number(),
});

export type InventarioMensual = z.infer<typeof InventarioMensualSchema>;
