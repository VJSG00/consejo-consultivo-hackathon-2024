import { Donante } from "../../types/donante"; 

type DonanteFormProps = {
    donante?: Donante;
}

export default function DonanteForm({ donante }: DonanteFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">Nombre:</label>
                <input
                    id="nombre"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="nombre"
                    defaultValue={donante?.nombre}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">Teléfono:</label>
                <input
                    id="telefono"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="telefono"
                    defaultValue={donante?.telefono ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="correo">Correo:</label>
                <input
                    id="correo"
                    type="email"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="correo"
                    defaultValue={donante?.correo ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="frecuencia">Frecuencia:</label>
                <select
                    id="frecuencia"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="frecuencia"
                    defaultValue={donante?.frecuencia}
                >
                    <option value="unicos">Únicos</option>
                    <option value="recurrentes">Recurrentes</option>
                    <option value="frecuentes">Frecuentes</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="tipo">Tipo:</label>
                <select
                    id="tipo"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="tipo"
                    defaultValue={donante?.tipo}
                >
                    <option value="particular">Particular</option>
                    <option value="ong">ONG</option>
                    <option value="privada">Privada</option>
                    <option value="publico">Público</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="observaciones">Observaciones:</label>
                <input
                    id="observaciones"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="observaciones"
                    defaultValue={donante?.observaciones ?? ''}
                />
            </div>
        </>
    );
}
