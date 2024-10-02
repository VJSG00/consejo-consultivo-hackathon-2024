import { Entrega } from "../../types/entregas";

type EntregaFormProps = {
    entrega?: Entrega;
}

export default function EntregaForm({ entrega }: EntregaFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="fechaDonante">Fecha Donante:</label>
                <input
                    id="fechaDonante"
                    type="date"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="fechaDonante"
                    defaultValue={entrega?.fechaDonante ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="idDonante">ID Donante:</label>
                <input
                    id="idDonante"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el ID del Donante"
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
                    placeholder="Ingrese las Cantidades (separadas por comas)"
                    name="cantidadUnidades"
                    defaultValue={entrega?.cantidadUnidades.join(', ') ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="motivo">Motivo:</label>
                <input
                    id="motivo"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el Motivo"
                    name="motivo"
                    defaultValue={entrega?.motivo}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="comunidad">Comunidad:</label>
                <input
                    id="comunidad"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese la Comunidad"
                    name="comunidad"
                    defaultValue={entrega?.comunidad}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="observaciones">Observaciones:</label>
                <textarea
                    id="observaciones"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese las Observaciones"
                    name="observaciones"
                    defaultValue={entrega?.observaciones ?? ''}
                />
            </div>
        </>
    );
}
