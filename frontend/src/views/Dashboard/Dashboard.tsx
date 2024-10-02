import { FaUser, FaDonate, FaPills, FaBox, FaCalendarAlt, FaTruck, FaClipboardList, FaChartBar } from 'react-icons/fa';
import DashboardButton from '../../components/ui/Boton';
import PaginatedTable from '../../components/Tablas/PaginatedTable';
import { PieChartComponent, BarChartComponent, LineChartComponent } from '../../components/GraficosTest2';
import Statistics from '../../components/Estadisticas/StatisticsProps';
import TableStats from '../../components/Estadisticas/TableStats';
//import { DashboardData } from '../types/Dashboard/Dashboard1';
import { getDashboardData } from '../../api/Dashboard';
import { useLoaderData } from 'react-router-dom';


export async function loader() {
  const data = await getDashboardData();
  console.log("desde la componente: ", data)
  return data;
}

interface Patient {
  id: number;
  nombreCompleto: string;
  fechaNacimiento: string;
  telefono: string;
  cedula: string | "no tiene";
  enfermedadesCronicas: string[];
  comunidad: string;
  status: string;
}

interface DashboardData {
  pacientes: Patient[];
  pacientesActivos: number;
  totalPacientes: number;
  totalDonantes: number;
  totalEntregas: number;
  medicamentosMasSolicitados: { nombre: string; value: number }[];
  comunidadesConMasPeticiones: { comunidad: string; value: number }[];
  clubesDeEnfermedadesComunes: { enfermedadesCronicas: string[]; value: number }[];
  medicamentosPorMes: { mes: string; cantidad: number }[];
  donantesPorMes: { mes: string; cantidad: number }[];
  porcentajeDemandaAbastecida: number;
}




export default function Dashboard() {


  const data = useLoaderData() as DashboardData
  console.log("dentro del componente ", data)


  const statisticsData = {
    pacientesActivos: data.pacientesActivos,
    totalPacientes: data.totalPacientes,
    totalDonantes: data.totalDonantes,
    totalEntregas: data.totalEntregas,
  };

  const mostRequestedMedications = data.medicamentosMasSolicitados.map(item => ({
    name: item.nombre,
    value: Number(item.value)
  }));

  const communitiesWithMostRequests = data.comunidadesConMasPeticiones.map(item => ({
    name: item.comunidad || 'Desconocida',
    value: Number(item.value)
  }));

  const commonDiseaseClubs = data.clubesDeEnfermedadesComunes.map(item => ({
    name: item.enfermedadesCronicas.join(', '),
    value: Number(item.value)
  }));

  const medicationsPerMonth = data.medicamentosPorMes.map(item => ({
    month: new Date(item.mes).toLocaleString('default', { month: 'long' }),
    value: Number(item.cantidad)
  }));

  const donorsPerMonth = data.donantesPorMes.map(item => ({
    month: new Date(item.mes).toLocaleString('default', { month: 'long' }),
    value: Number(item.cantidad)
  }));

  const demandSupplyPercentage = [
    { name: 'Abastecida', value: data.porcentajeDemandaAbastecida },
    { name: 'No Abastecida', value: 100 - data.porcentajeDemandaAbastecida }
  ];

  return (
    <>
      
      <div className="flex-1 overflow-y-auto p-4">
          <h1 className='text-4xl text-gray-700'>Bienvenido</h1>
          <div className="border-t-2 border-gray-300 my-4"></div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <DashboardButton to="inventario-actual" icon={<FaBox />} text="Inventario" />
            <DashboardButton to="inventario-mensual" icon={<FaCalendarAlt />} text="Inventario Mensual" />
            <DashboardButton to="pacientes" icon={<FaUser />} text="Pacientes" />
            <DashboardButton to="medicinas" icon={<FaPills />} text="Medicamentos" />
            <DashboardButton to="donantes" icon={<FaDonate />} text="Donantes" />
            <DashboardButton to="entregas" icon={<FaTruck />} text="Entregas" />
            <DashboardButton to="/route7" icon={<FaClipboardList />} text="Reporte" />
            <DashboardButton to="/route8" icon={<FaChartBar />} text="Estadísticas" />
          </div>

          <div className="border-t-2 border-gray-300 my-4"></div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <DashboardButton to="asignar-medicamentos" icon={<FaPills />} text="Asignar Medicamentos" />
            <DashboardButton to="crear-full-entrega" icon={<FaTruck />} text="Crear Entrega" />
            <DashboardButton to="pacientes/nuevo" icon={<FaUser />} text="Crear Pacientes" />
          </div>

          <PaginatedTable patients={data.pacientes} />

          <div className="grid grid-cols-1">
            <Statistics data={statisticsData} />
          </div>

          <div className='grid grid-cols-3 gap-4 mt-4'>
            <TableStats title="Medicamentos más solicitados" data={mostRequestedMedications} />
            <TableStats title="Comunidades con más Peticiones" data={communitiesWithMostRequests} />
            <TableStats title="Enfermedades más Comunes" data={commonDiseaseClubs} />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <PieChartComponent data={demandSupplyPercentage} />
            <BarChartComponent data={medicationsPerMonth} />
            <LineChartComponent data={donorsPerMonth} />
          </div>
        </div>

    </>



  );
}
