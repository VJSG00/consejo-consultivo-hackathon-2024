import { Patient } from "../types/patient"
// import { formatCurrency } from "../utils"

type PatientsDetailsProps={
    patient: Patient
}

export default function PatientsDetails({patient}: PatientsDetailsProps) {
  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {patient.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {patient.IdCard}
        </td>
        <td className="p-3 text-lg text-gray-800">
            costo consulta: formatCurrency(patient.cost)
            isAdmitted ? 'Ingresado':'En alta'
        </td>
        <td className="p-3 text-lg text-gray-800 ">
        
        </td>
    </tr>
  )
}
