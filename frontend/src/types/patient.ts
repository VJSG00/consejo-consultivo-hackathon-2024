import { object, string, number, InferOutput, boolean , array } from "valibot"

// Draft no tiene disponibilidad
export const DraftPatienteSchema = object({
    name: string(),
    IdCard: number()
})

// Este tiene los datos cargados
//TODO: necesito incluir admitted: boolean() sin que explote el codigo.
export const PatientSchema = object ({
    id: number(),
    name: string(),
    IdCard: number(),
    admitted: boolean()
})

export const PatientsSchema = array(PatientSchema)
export type Patient = InferOutput<typeof PatientSchema>