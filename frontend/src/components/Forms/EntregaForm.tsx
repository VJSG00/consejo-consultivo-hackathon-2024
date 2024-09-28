import { Entrega } from "../../types/entregas"; 

type EntregaFormProps = {
    entrega?: Entrega;
}

export default function EntregaForm({ entrega }: EntregaFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="fechaEntrega">Fecha de Entrega: </label>
                <input
                    id="fechaEntrega"
                    type="datetime-local"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="fechaEntrega"
                    defaultValue={entrega?.fechaEntrega}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="idDonante">ID del Donante:</label>
                <input
                    id="idDonante"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="idDonante"
                    defaultValue={entrega?.idDonante}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="cantidadUnidades">Cantidad de Unidades:</label>
                <input
                    id="cantidadUnidades"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="cantidadUnidades"
                    defaultValue={entrega?.cantidadUnidades.join(', ')}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="medicamentos">Medicamentos:</label>
                <input
                    id="medicamentos"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese los IDs de los Medicamentos (separados por comas)"
                    name="medicamentos"
                    defaultValue={entrega?.medicamentos?.map(m => m.id).join(',') || ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="pacientes">Pacientes:</label>
                <input
                    id="pacientes"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese los IDs de los Pacientes (separados por comas)"
                    name="pacientes"
                    defaultValue={entrega?.pacientes?.join(',') || ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="periodo">Periodo:</label>
                <select
                    id="periodo"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="periodo"
                    defaultValue={entrega?.periodo.toString()}
                >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="periodoDias">Periodo en Días:</label>
                <input
                    id="periodoDias"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="periodoDias"
                    defaultValue={entrega?.periodoDias ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="fechaRetiro">Fecha de Retiro:</label>
                <input
                    id="fechaRetiro"
                    type="datetime-local"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="fechaRetiro"
                    defaultValue={entrega?.fechaRetiro ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="observaciones">Observaciones:</label>
                <input
                    id="observaciones"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="observaciones"
                    defaultValue={entrega?.observaciones ?? ''}
                />
            </div>
        </>
    );
}
