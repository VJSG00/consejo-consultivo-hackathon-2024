import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import AuthLayout from '../views/auth/AuthLayout';
import Home from '../views/VistaIniciales/Home';
import Services from '../views/VistaIniciales/MyV';
import Contacto from '../views/VistaIniciales/Contacto';
import Info from '../views/VistaIniciales/Info';
import Preguntas from '../views/VistaIniciales/Preguntas';
import Login from '../views/auth/Login';
import PacientesTable, { loader as pacientesLoader } from '../views/Pacientes/PacientesTabla';
import NewPatient, { action as newPatientAction } from '../views/Pacientes/NewPatient';
import EditPatient, { loader as editPatientLoader, actionUpdate as editPatientAction, actionDelete as deletePatientAction } from '../views/Pacientes/EditPatient';
import MedicineTable, {loader as medicinaLoader} from '../views/Medicinas/MedicinaTabla';
import NewMedicine, { action as newMedicineAction } from '../views/Medicinas/newMedicine';
import EditMedicine, { action as editMedicineAction, loader as editMedicineLoader } from '../views/Medicinas/editMedicine';
import AsignarMedicamentos from '../views/Entregas/CrearEntregaFull';
import EditEntrega, { loader as entregaEditLoader, action as editEntregaAction } from '../views/Entregas/EditEntregas';
import Dashboard, { loader as dashboardLoader } from '../views/Dashboard/Dashboard';
import RoleRoute from './RoleRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import InventarioActual, { loader as inventarioLoader, action as inventarioAction } from '../views/InventarioActual';
import InventarioMensual, { loader as inventarioMenLoader, action as inventarioMenAction } from '../views/InventarioMensual';
import Donantes, {loader as donantesLoader} from '../views/Donantes/DonanteTable';
import Entregas, {loader as entregaLoader} from '../views/Entregas/EntregaTable';
import DatosMedicos from '../views/VistasRoles/Donantes/VistaDonantes';
import PacienteView from '../views/VistasRoles/Pacientes/PacienteVista';
import CrearDonante, {action as newDonanteAction} from '../views/Donantes/CrearDonante';
import AssignMedication from '../views/AsignarMedicamentos/AsignarMedicamentos';
import EntregaDonacionForm from '../views/CrearEntrega/CrearEntrega';
import ConfirmAccountView from '../views/auth/ConfirmationToken';
import SetPasswordView from '../views/auth/ConfirmarContraseña';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'mision', element: <Services /> },
            { path: 'contacto', element: <Contacto /> },
            { path: 'about', element: <Info /> },
            { path: 'preguntas', element: <Preguntas /> }
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'confirm-account/:token', element: <ConfirmAccountView /> },
            {path: "establecer-contraseña", element: <SetPasswordView /> }
        ],
    },
    {
        path: '/pacientes',
        element: <RoleRoute role="Paciente" />,
        children: [
            { index: true, element: <PacienteView /> },
        ],
    },
    {
        path: '/donantes',
        element: <RoleRoute role="Donante" />,
        children: [
            { index: true, element: <DatosMedicos /> },
        ],
    },
    {
        path: '/dashboard',
        element: <RoleRoute role="Gestor" />,
        children: [
            {
                path: 'index',
                element: <DashboardLayout />,
                children: [
                    { index: true, element: <Dashboard />, loader: dashboardLoader },
                    { path: 'pacientes', element: <PacientesTable />, loader: pacientesLoader },
                    { path: 'pacientes/:id/asignar-medicamentos', element: <AsignarMedicamentos /> },
                    { path: 'pacientes/nuevo', element: <NewPatient />, action: newPatientAction },
                    { path: 'pacientes/:id/editar', element: <EditPatient />, loader: editPatientLoader, action: editPatientAction },
                    { path: 'pacientes/:id/eliminar', action: deletePatientAction },
                    { path: 'medicinas', element: <MedicineTable />, loader: medicinaLoader },
                    { path: 'medicinas/nuevo', element: <NewMedicine />, action: newMedicineAction },
                    { path: 'medicinas/:id/editar', element: <EditMedicine />, loader: editMedicineLoader, action: editMedicineAction },
                    { path: 'entregas', element: <Entregas /> , loader:entregaLoader },
                    { path: 'entregas/:id/editar', element: <EditEntrega />, loader: entregaEditLoader, action: editEntregaAction },
                    { path: 'donantes', element: <Donantes />, loader: donantesLoader },
                    { path: 'donantes/nuevo', element: <CrearDonante />, action: newDonanteAction },
                    { path: 'inventario-mensual', element: <InventarioMensual />, loader: inventarioMenLoader, action: inventarioMenAction },
                    { path: 'inventario-actual', element: <InventarioActual />, loader: inventarioLoader, action: inventarioAction },
                    { path: 'asignar-medicamentos', element: <AssignMedication />},
                    { path: 'crear-full-entrega', element: <EntregaDonacionForm />}
                    //{ path: 'reportes', element: <PdfGenerator /> },
                ],
            },]
    },
]);
