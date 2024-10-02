import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createFullEntrega } from '../../api/EntregaApi';

interface AsignarMedicamentosProps {
  idPaciente: number;
  nombreMedicamento: string;
  cantidad: number;
}

const AsignarMedicamentos: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nombreMedicamento, setNombreMedicamento] = useState('');
  const [cantidad, setCantidad] = useState(0);

  const handleAsignarMedicamento = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: AsignarMedicamentosProps = {
      idPaciente: parseInt(id!, 10),
      nombreMedicamento,
      cantidad,
    };

    try {
      const result = await createFullEntrega(data);
      console.log('Medicamento asignado:', result);
      navigate('/dashboard/index/pacientes'); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Asignar Medicamentos al Paciente {id}</h1>
      <form onSubmit={handleAsignarMedicamento}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreMedicamento">
            Nombre del Medicamento
          </label>
          <input
            type="text"
            id="nombreMedicamento"
            value={nombreMedicamento}
            onChange={(e) => setNombreMedicamento(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidad">
            Cantidad
          </label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 rounded-sm bg-[#005d90] hover:bg-[#35a1da] text-white">
          Asignar Medicamento
        </button>
      </form>
    </div>
  );
};

export default AsignarMedicamentos;
