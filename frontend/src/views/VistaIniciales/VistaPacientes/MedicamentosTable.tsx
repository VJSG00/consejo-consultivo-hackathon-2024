import React, { useState } from "react";

interface Medication {
  name: string;
  status: string;
  date: string;
}

interface MedicationsTableProps {
  medications: Medication[];
}

const MedicationsTable: React.FC<MedicationsTableProps> = ({ medications }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    if (!isButtonClicked) {
      setIsButtonClicked(true);
      // Aquí puedes añadir la lógica para actualizar los datos
      console.log("Datos actualizados");
    }
  };

  return (
    <div>
      <div className="flex justify-start mb-4">
        <button
          onClick={handleButtonClick}
          disabled={isButtonClicked}
          className={`px-4 py-2 text-white ${
            isButtonClicked ? "bg-gray-400" : "bg-[#005d90]"
          } rounded-lg hover:bg-[#35a1da] `}
        >
          Actualizar
        </button>
      </div>
      <h3 className="py-3 text-lg font-bold mt-4">Sus medicamentos son:</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 hover:bg-gray-100">Nombre del Medicamento</th>
            <th className="py-2 hover:bg-gray-100">Status</th>
            <th className="py-2 hover:bg-gray-100">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 hover:bg-gray-100">
                {medication.name}
              </td>
              <td
                className={`border hover:bg-gray-100 px-4 py-2 ${
                  medication.status === "Asignado"
                    ? "text-Blue-500 bg-Blue-100 rounded"
                    : "text-gray-500"
                }`}
              >
                {medication.status}
              </td>
              <td className="border hover:bg-gray-100 px-4 py-2">
                {medication.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationsTable;
