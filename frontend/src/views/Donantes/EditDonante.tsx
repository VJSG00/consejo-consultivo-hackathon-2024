import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import { deleteDonante, getDonanteById, updateDonante } from '../../api/DonanteApi';
import { Donante } from '../../types/donante';
import DonanteForm from '../../components/Forms/DonantesForm';

// getDonanteById
export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const donante = await getDonanteById(+params.id);
        if (!donante) {
            return redirect('/');
        }
        return donante;
    }
    return {};
    
}

// updateDonante
export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    // Validación en cliente
    let error = '';
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    if (error.length) {
        return error;
    }

    if (params.id !== undefined) {
        await updateDonante(+params.id, data);
    }

    return redirect('/');
}

// Delete donante
export async function actionDelete({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteDonante(+params.id);
        return redirect('/');
    }
}

// Componente EditDonante
export default function EditDonante() {
    const donante = useLoaderData() as Donante;
    const error = useActionData() as string;

    if (!donante) {
        return <div>Error: Donante no encontrado</div>;
    }
    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Editar donante</h2>
                <div className='flex justify-between'>
                    <Link
                        to='/'
                        className='rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                    >
                        Volver a donantes
                    </Link>

                    <Form
                        method='POST'
                        onSubmit={(e) => {
                            if (!confirm('¿Está seguro de que desea eliminar el donante de la base de datos?')) {
                                e.preventDefault();
                            }
                        }}
                        action={`/donantes/${donante.id}/eliminar`}
                    >
                        <input
                            type='submit'
                            value='Eliminar donante'
                            className='rounded-md p-3 bg-red-600 text-sm font-bold text-white shadow-sm hover:bg-red-500'
                        />
                    </Form>
                </div>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className='mt-10' method='POST' action=''>

                <DonanteForm key={donante.id} donante={donante} />

                <input
                    type='submit'
                    value='Guardar cambios'
                    className='rounded-md p-3 bg-green-600 text-sm font-bold text-white shadow-sm hover:bg-green-500'
                />
            </Form>
        </>
    );
}
