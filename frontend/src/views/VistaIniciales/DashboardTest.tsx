import { FaBox, FaCalendarAlt, FaUser, FaPills, FaDonate, FaTruck, FaChartBar, FaClipboardList } from 'react-icons/fa';
import DashboardButton from '../components/ui/Boton';
import SideBar from '../components/Sidebar';
import PaginatedTable from '../components/TablasTest/PaginatedTable';
import { PieChartComponent, BarChartComponent, LineChartComponent } from '../components/GraficosTest2';
import Statistics from '../components/Estadisticas/StatisticsProps';
import TableStats from '../components/Estadisticas/TableStats';
// import { DashboardData } from '../types/Dashboard/Dashboard1';
// import { getDashboardData } from '../api/Dashboard';
// import { useLoaderData } from 'react-router-dom';
// import Spinner from '../components/Spinner';




export default function DashboardTest() {

    // const { data } = useLoaderData() as { data: DashboardData };

    // if (!data) {
    //     return <Spinner />;
    // }

    // const statisticsData = {
    //     activePatients: data.totalPacientes, // Assuming activePatients is the same as totalPacientes for this example
    //     totalPatients: data.totalPacientes,
    //     donors: data.totalDonantes,
    //     deliveries: data.totalEntregas,
    //     mostRequestedMedications: data.inventarioActual.map(item => ({
    //         name: item.medicamento.nombre,
    //         value: item.demanda
    //     })),
    //     communitiesWithMostRequests: [], // Puedes agregar datos reales aquí
    //     commonDiseaseClubs: data.inventarioActual.map(item => ({
    //         name: item.club,
    //         value: item.cantidad
    //     }))
    // };

    const exampleData = {
        activePatients: 120,
        totalPatients: 450,
        donors: 80,
        deliveries: 150,
        mostRequestedMedications: [
            { name: 'Paracetamol', value: 120 },
            { name: 'Ibuprofeno', value: 100 },
            { name: 'Amoxicilina', value: 80 },
        ],
        communitiesWithMostRequests: [
            { name: 'Comunidad A', value: 50 },
            { name: 'Comunidad B', value: 40 },
            { name: 'Comunidad C', value: 30 },
        ],
        commonDiseaseClubs: [
            { name: 'Cáncer', value: 20 },
            { name: 'Hipertensión', value: 15 },
            { name: 'Diabetes', value: 10 },
            { name: 'Asma', value: 5 },
        ],
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <div className="flex-1 overflow-y-auto px-20 py-20">
                <div className="relative bg-white rounded-lg shadow-2xl p-16">
                    <h1 className='text-4xl text-gray-700'>Bienvenido</h1>
                    <div className="border-t-2 border-gray-300 my-4"></div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <DashboardButton to="/route1" icon={<FaBox />} text="Inventario" />
                        <DashboardButton to="/route2" icon={<FaCalendarAlt />} text="Inventario Mensual" />
                        <DashboardButton to="/route3" icon={<FaUser />} text="Pacientes" />
                        <DashboardButton to="/route4" icon={<FaPills />} text="Medicamentos" />
                        <DashboardButton to="/route5" icon={<FaDonate />} text="Donantes" />
                        <DashboardButton to="/route6" icon={<FaTruck />} text="Entregas" />
                        <DashboardButton to="/route7" icon={<FaClipboardList />} text="Reporte" />
                        <DashboardButton to="/route8" icon={<FaChartBar />} text="Estadísticas" />
                    </div>

                    <div className="border-t-2 border-gray-300 my-4"></div>

                    <div className="grid grid-cols-3 gap-4 mb-10">
                        <DashboardButton to="/route9" icon={<FaPills />} text="Asignar Medicamentos" />
                        <DashboardButton to="/route10" icon={<FaTruck />} text="Crear Entrega" />
                        <DashboardButton to="/route11" icon={<FaUser />} text="Crear Pacientes" />
                    </div>


                    <PaginatedTable />

                    <div className="grid grid-cols-1 gap-4 mt-10">
                        <Statistics data={exampleData} />
                    </div>

                    <div className='grid grid-cols-3 gap-4 mt-10'>
                        <TableStats title="Medicamentos más solicitados" data={exampleData.mostRequestedMedications} />
                        <TableStats title="Comunidades con más Peticiones" data={exampleData.communitiesWithMostRequests} />
                        <TableStats title="Clubes de Enfermedades Comunes" data={exampleData.commonDiseaseClubs} />
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-10">
                        <PieChartComponent />
                        <BarChartComponent />
                        <LineChartComponent />
                    </div>
                </div>


            </div>
        </div>
    );




}
