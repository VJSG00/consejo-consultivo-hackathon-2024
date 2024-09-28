import { Medicamento } from "../../types/medicamento";

type MedicineFormProps = {
    medicine?: Medicamento;
}

export default function MedicineForm({ medicine }: MedicineFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">Nombre del Medicamento:</label>
                <input
                    id="nombre"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el Nombre"
                    name="nombre"
                    defaultValue={medicine?.nombre}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="idDonante">ID del Donante:</label>
                <input
                    id="idDonante"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el ID del Donante"
                    name="idDonante"
                    defaultValue={medicine?.idDonante}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="idPaciente">ID del Paciente:</label>
                <input
                    id="idPaciente"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el ID del Paciente"
                    name="idPaciente"
                    defaultValue={medicine?.idPaciente ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="esencial">Esencial:</label>
                <select
                    id="esencial"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="esencial"
                    defaultValue={medicine?.esencial.toString()}
                >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="insumo">Insumo:</label>
                <select
                    id="insumo"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="insumo"
                    defaultValue={medicine?.insumo.toString()}
                >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="fechaRetiro">Fecha de Retiro:</label>
                <input
                    id="fechaRetiro"
                    type="datetime-local"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="fechaRetiro"
                    defaultValue={medicine?.fechaRetiro}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="presentacion">Presentación:</label>
                <input
                    id="presentacion"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese la Presentación"
                    name="presentacion"
                    defaultValue={medicine?.presentacion}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="fechaEntrega">Fecha de Entrega:</label>
                <input
                    id="fechaEntrega"
                    type="datetime-local"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="fechaEntrega"
                    defaultValue={medicine?.fechaEntrega}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="observaciones">Observaciones:</label>
                <textarea
                    id="observaciones"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese las Observaciones"
                    name="observaciones"
                    defaultValue={medicine?.observaciones ?? ''}
                />
            </div>
        </>
    );
}
