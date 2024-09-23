import { Link, Form, useActionData, ActionFunctionArgs, redirect} from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { addPatient } from '../services/PatientServices'
import PatientForm from '../components/PatientForm'

export async function action({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
 



  //A pesar de que tengamos validacion en API, debemos validar en cliente
  let error = ''
  if (Object.values(data).includes('')) {
    error='Todos los campos son obligatorios'
  }
  if(error.length) {
    return error
  }

  await addPatient(data)


  //Siempre debemos devolver algo.
  return redirect('/')
}

export default function NewPatient() {
  
  const error = useActionData() as string

  return (
    <>
      
      
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500' >Registrar paciente</h2>
        
        <Link
          to='/'
          className='rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
        >
          Volver a productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage> }

      <Form className="mt-10" method='POST' action=''>
 
        <PatientForm/>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />

      </Form>

    </>
  )
}
