import { object, string, number, InferOutput, boolean, array } from "valibot"

// Draft no tiene disponibilidad
export const DraftCompanySchema = object({
  name: string(),
  type: string(), // tipo de compañía (e.g. "suministrador", "comprador", etc.)
  direction: string(),
  phone: string()
})

// Este tiene los datos cargados
export const CompanySchema = object({
  id: number(),
  name: string(),
  type: string(),
  direction: string(),
  phone: string(),
  status: boolean() // estado de la compañía (e.g. activa, inactiva, etc.)
})

export const CompaniesSchema = array(CompanySchema)
export type Company = InferOutput<typeof CompanySchema>