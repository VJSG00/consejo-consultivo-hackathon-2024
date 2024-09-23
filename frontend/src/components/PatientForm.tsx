import { Patient } from "../types/patient"

type ProductFormProps = {
    patient?: Patient
}

export default function PatientForm({patient}: ProductFormProps) {
  return (
    <>
        <div className="mb-4">
          
          <label
              className="text-gray-800"
              htmlFor="name"
          >Nombre del Paciente:
          </label>

          <input 
              id="name"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Ingrese el Nombre"
              name="name"
              defaultValue={patient?.name}
          />
        </div>
      
        <div className="mb-4">
          
          <label
              className="text-gray-800"
              htmlFor="price"
          >Cedula:</label>
          
          <input 
              id="price"
              type="number"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="ej. 1234567"
              name="IdCard"
              defaultValue={patient?.IdCard}
          />
        </div>
    </>
  )
}
