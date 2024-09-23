import {ActionFunctionArgs, Link, useFetcher, useLoaderData, useNavigate } from 'react-router-dom'
import { getPatients, updatePatientAdmitted } from '../services/PatientServices'
import { Patient } from '../types/patient'
//import PatientsDetails from '../components/PatientsDetails'

export async function loader() {
  const patients = await getPatients()

  return patients
}

export async function action({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updatePatientAdmitted(+data.id)
  return null
}

export default function Pacientes() {

  //Use navigate puede ser utilizado en cualquier parte del componente
  //Link solo se utiliza despues del return del componente
  const navigate = useNavigate()
  const patients = useLoaderData() as Patient[]
  const fetcher = useFetcher()

  return (
    <>

      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500' >Pacientes</h2>

        <Link
          to='pacientes/nuevo'
          className='rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
        >
          agregar Paciente
        </Link>


      </div>

      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto" >

      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Status
         </th>
         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Médicos
         </th>
        </tr>
      </thead>


      <tbody className="bg-white divide-y divide-gray-200">
        
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              
              <div className="flex items-center">
                
                {/* Imagen */}
                <div className="flex-shrink-0 h-10 w-10">
                  <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/100?img=${patient.id}`} alt={patient.name} />
                </div>
                
                {/* Nombre y Cedula - codigo alternativo con link*/}
                <div className="ml-4" onClick={() => navigate(`/pacientes/${patient.id}/editar`)} style={{ cursor: 'pointer' }} >
                  
                  <div className="text-sm font-medium text-gray-900">
                    {patient.name}
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    C.i: {patient.IdCard}
                  </div>

                </div>

              </div>
            </td>
            {/* ... Other table cells (Status and Médicos) */}
            <td>
              {/* costo consulta: formatCurrency(patient.cost) */}
                <fetcher.Form method='POST' >
                  <button 
                  type='submit' 
                  name='id' 
                  value={patient.id}
                  className={` ${patient.admitted? 'text-green-500' : 'text-gray-500' } px-6 py-4 whitespace-nowrap text-sm text-gray-500`}
                  >
                  {patient.admitted ? 'Ingresado':'En alta'}
                  </button>
                </fetcher.Form>
            </td>
            <td className=  "px-6 py-4 whitespace-nowrap text-sm text-gray-500" >
              {/* {patient.medicos} */}
            </td>
          </tr>
        ))}
      </tbody>
      </table>



      {/* Tabla de productos
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
              <tr>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Disponibilidad</th>
                  <th className="p-2">Acciones</th>
              </tr>
          </thead>
          <tbody>
            {patients.map( patient => (
              <PatientsDetails
                key={patient.id}
                patient={patient}

              />
            ))}
          </tbody>
        </table>
      </div> */}

    </>
  )
}
