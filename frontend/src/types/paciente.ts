// types/paciente.ts
import { z } from 'zod';

export const PacienteSchema = z.object({
    id: z.number(),
    nombreCompleto: z.string(),
    fechaNacimiento: z.string().datetime(),
    direccion: z.string(),
    telefono: z.string(),
    correo: z.string(),
    identificador: z.enum(['cedula', 'p. nacimiento']),
    cedula: z.string().nullable(),
    partidaNacimiento: z.string().nullable(),
    antecedentes: z.array(z.string()),
    enfermedadesCronicas: z.array(z.string()),
    medicamentosBasicos: z.array(z.string()),
    medicamentosEsenciales: z.array(z.string()),
    prioridad: z.boolean(),
    periodoTratamiento: z.string().datetime(),
    observaciones: z.string().nullable(),
    comunidad: z.string(),
    tipoComunidad: z.string(),
    tipoVivienda: z.string(),
    genero: z.string(),
    status: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export const PacientesSchema = z.array(PacienteSchema);

export type Paciente = z.infer<typeof PacienteSchema>;
