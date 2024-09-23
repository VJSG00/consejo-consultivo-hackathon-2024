import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData} from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { deletePatient, getPatientById, updatePatient } from '../services/PatientServices'
import { Patient } from '../types/patient'
import PatientForm from '../components/PatientForm'

//TODO: Añadir Status a alguna parte de este codigo

//getPatientById
export async function loader({params}: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const patient = await getPatientById(+params.id)
    if(!patient) {
      //throw new Response('', {status:404, statusText: 'No Encontrado'})
      return redirect('/')
    }

    return patient

}
  return {}
}


//updatePatient
export async function actionUpdate({request, params}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
 


  //A pesar de que tengamos validacion en API, debemos validar en cliente
  let error = ''
  if (Object.values(data).includes('')) {
    error='Todos los campos son obligatorios'
  }
  if(error.length) {
    return error
  }

  if(params.id !== undefined){
    await updatePatient(data, +params.id )
  }
  


  //Siempre debemos devolver algo.
  return redirect('/')
}

//Editar disponibilidad:
const availabilityOptions = [
  { name: 'Ingresado', value: true},
  { name: 'De alta', value: false}
]

//Delete patient
export async function actionDelete({params}: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deletePatient(+params.id)
    return redirect("/")
  }
  
  
}

//Componente EditPatient
export default function EditPatient() {
  
  const patient = useLoaderData() as Patient
  const error = useActionData() as string

  return (
    <>
      
      
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500' >Editar paciente</h2>
        
        <div className='flex justify-between'>
          
          {/* TODO: corregir este boton, cuando abres la consola se hace innecesariamente grande */}
          <Link
              to='/'
              className='rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
            >
              Volver a productos
            </Link>

            <Form
              method='POST'
              onSubmit={(e) => {
                if(!confirm('¿Está seguro de que desea eliminar al paciente de la base de datos?')){
                  e.preventDefault()
                }
              }}
              action={`/pacientes/${patient.id}/eliminar`}
            >
              <input 
              type='submit' 
              value='Eliminar producto'
              className='rounded-md p-3 bg-red-600 text-sm font-bold text-white shadow-sm hover:bg-red-500'
              />
              
            </Form>
        </div>

      </div>

      {error && <ErrorMessage>{error}</ErrorMessage> }

      <Form className="mt-10" method='POST' action=''>
 
        <PatientForm 
          key={patient.id}
          patient = {patient}
        />

        <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="admitted"
                >Disponibilidad:</label>
                <select 
                    id="admitted"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="admitted"
                    defaultValue={patient?.admitted.toString()}
                >
                    {availabilityOptions.map(option => (
                      <option key={option.name} value={option.value.toString()}>{option.name}</option>
                    ))}
                </select>
            </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />

      </Form>

    </>
  )
}