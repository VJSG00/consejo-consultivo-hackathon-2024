import { z } from 'zod';

export const PatientSchemaDash = z.object({
  id: z.number(),
  nombreCompleto: z.string(),
  fechaNacimiento: z.string(),
  telefono: z.string(),
  cedula: z.string().nullable(), // Cedula puede ser null
  enfermedadesCronicas: z.array(z.string()), // Array de strings
  comunidad: z.string(),
  status: z.string(),
});

export const DashboardDataSchema = z.object({
  pacientesActivos: z.number(),
  totalPacientes: z.number(),
  totalDonantes: z.number(),
  totalEntregas: z.number(),
  medicamentosMasSolicitados: z.array(z.object({
      nombre: z.string(),
      value: z.string() // Value es string en la respuesta del backend
  })),
  comunidadesConMasPeticiones: z.array(z.object({
      comunidad: z.string(),
      value: z.string() // Value es string en la respuesta del backend
  })),
  clubesDeEnfermedadesComunes: z.array(z.object({
      enfermedadesCronicas: z.array(z.string()), // Array de strings
      value: z.string() // Value es string en la respuesta del backend
  })),
  pacientes: z.array(PatientSchemaDash),
  medicamentosPorMes: z.array(z.object({
      mes: z.string(), // Fecha en formato ISO
      cantidad: z.string() // Cantidad es string en la respuesta del backend
  })),
  donantesPorMes: z.array(z.object({
      mes: z.string(), // Fecha en formato ISO
      cantidad: z.string() // Cantidad es string en la respuesta del backend
  })),
  porcentajeDemandaAbastecida: z.number()
});

export type DashboardData = z.infer<typeof DashboardDataSchema>;
