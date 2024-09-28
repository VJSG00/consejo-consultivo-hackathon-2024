import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import { deleteEntrega, getEntregaById, updateEntrega } from '../../api/EntregaApi';
import { Entrega } from '../../types/entregas';
import EntregaForm from '../../components/Forms/EntregaForm';

// getEntregaById
export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const entrega = await getEntregaById(+params.id);
        if (!entrega) {
            return redirect('/');
        }
        return entrega;
    }
    return {};
}

// updateEntrega
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
        await updateEntrega(+params.id, data);
    }

    return redirect('/');
}

// Delete entrega
export async function actionDelete({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteEntrega(+params.id);
        return redirect('/');
    }
}

// Componente EditEntrega
export default function EditEntrega() {
    const entrega = useLoaderData() as Entrega;
    const error = useActionData() as string;

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Editar entrega</h2>
                <div className='flex justify-between'>
                    <Link
                        to='/'
                        className='rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                    >
                        Volver a entregas
                    </Link>

                    <Form
                        method='POST'
                        onSubmit={(e) => {
                            if (!confirm('¿Está seguro de que desea eliminar la entrega de la base de datos?')) {
                                e.preventDefault();
                            }
                        }}
                        action={`/entregas/${entrega.id}/eliminar`}
                    >
                        <input
                            type='submit'
                            value='Eliminar entrega'
                            className='rounded-md p-3 bg-red-600 text-sm font-bold text-white shadow-sm hover:bg-red-500'
                        />
                    </Form>
                </div>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className='mt-10' method='POST' action=''>
                
                <EntregaForm key={entrega.id} entrega={entrega} />

                <input
                    type='submit'
                    value='Guardar cambios'
                    className='rounded-md p-3 bg-green-600 text-sm font-bold text-white shadow-sm hover:bg-green-500'
                />
            </Form>
        </>
    );
}
