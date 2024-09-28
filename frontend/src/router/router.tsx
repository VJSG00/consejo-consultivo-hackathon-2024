import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import InicioLayout from '../layouts/InicioLayout';
import AuthLayout from '../views/auth/AuthLayout';
import Home from '../views/VistaIniciales/Home';
import Services from '../views/VistaIniciales/MyV';
import Contacto from '../views/VistaIniciales/Contacto';
import Info from '../views/VistaIniciales/Info';
import Preguntas from '../views/VistaIniciales/Preguntas';
import Login from '../views/auth/Login';
import ConfirmationToken from '../views/auth/ConfirmationToken';
import RegisterView from '../views/auth/RequestNewCode';
import ForgotPasswordView from '../views/auth/ForgotPasswordView';
import NewPasswordView from '../views/auth/NewPasswordView';
import Pacientes, { loader as pacientesLoader } from '../views/Pacientes/Pacientes';
import NewPatient, { action as newPatientAction } from '../views/Pacientes/NewPatient';
import EditPatient, { loader as editPatientLoader, actionUpdate as editPatientAction, actionDelete as deletePatientAction } from '../views/Pacientes/EditPatient';
import Estadisticas from '../views/Estadisticas';
import MedicineTable from '../views/Medicinas/MedicineTable';
import NewMedicine, { action as newMedicineAction } from '../views/Medicinas/newMedicine';
import EditMedicine, { action as editMedicineAction, loader as editMedicineLoader } from '../views/Medicinas/editMedicine';
import CreateEntrega, { action as createEntregaAction } from '../views/Entregas/CrearEntregaFull';
import EntregaTable from '../views/Entregas/EntregaTable';
import EditEntrega, { loader as entregaLoader, action as editEntregaAction } from '../views/Entregas/EditEntregas';
import DonanteTable from '../views/Donantes/DonanteTable';
import CrearDonante, { action as createDonanteAction } from '../views/Donantes/CrearDonante';
import EditDonante, { loader as donanteLoader, action as editDonanteAction } from '../views/Donantes/EditDonante';
import DashboardTest, { loader as dashboardLoader } from '../views/DashboardTestD';
import PdfGenerator from '../views/Reporte';
import RoleRoute from './RoleRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'mision', element: <Services /> },
            { path: 'contacto', element: <Contacto /> },
            { path: 'about', element: <Info /> },
            { path: 'login', element: <Login /> },
            { path: 'preguntas', element:<Preguntas />}
        ],
    },
    {
        path: '/inicio',
        element: <InicioLayout />,
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'confirm-account', element: <ConfirmationToken /> },
            { path: 'register', element: <RegisterView /> },
            { path: 'forgot-password', element: <ForgotPasswordView /> },
            { path: 'new-password', element: <NewPasswordView /> },
        ],
    },
    {
        path: '/pacientes',
        element: <RoleRoute role="Paciente" />,
        children: [
            { index: true, element: <Pacientes />, loader: pacientesLoader },
            { path: 'nuevo', element: <NewPatient />, action: newPatientAction },
            { path: ':id/editar', element: <EditPatient />, loader: editPatientLoader, action: editPatientAction },
            { path: ':id/eliminar', action: deletePatientAction },
            { path: 'graficos', element: <Estadisticas /> },
        ],
    },
    {
        path: '/donantes',
        element: <RoleRoute role="Donante" />,
        children: [
            { index: true, element: <DonanteTable /> },
            { path: 'nuevo', element: <CrearDonante />, action: createDonanteAction },
            { path: ':id/editar', element: <EditDonante />, loader: donanteLoader, action: editDonanteAction },
        ],
    },
    {
        path: '/dashboard',
        element: <RoleRoute role="Gestor" />,
        children: [
            { index: true, element: <DashboardTest />, loader: dashboardLoader },
            { path: 'pacientes', element: <Pacientes />, loader: pacientesLoader },
            { path: 'pacientes/nuevo', element: <NewPatient />, action: newPatientAction },
            { path: 'pacientes/:id/editar', element: <EditPatient />, loader: editPatientLoader, action: editPatientAction },
            { path: 'pacientes/:id/eliminar', action: deletePatientAction },
            { path: 'medicinas', element: <MedicineTable /> },
            { path: 'medicinas/nuevo', element: <NewMedicine />, action: newMedicineAction },
            { path: 'medicinas/:id/editar', element: <EditMedicine />, loader: editMedicineLoader, action: editMedicineAction },
            { path: 'entregas', element: <EntregaTable /> },
            { path: 'entregas/crear-entrega', element: <CreateEntrega />, action: createEntregaAction },
            { path: 'entregas/:id/editar', element: <EditEntrega />, loader: entregaLoader, action: editEntregaAction },
            { path: 'crear-full-entrega', element: <CreateEntrega />, action: createEntregaAction },
            //{ path: 'asignar-medicamentos', element: <AsignarMedicamentos /> },
            //{ path: 'inventario-mensual', element: <InventarioMensual /> },
            //{ path: 'inventario-actual', element: <InventarioActual /> },
            //{ path: 'reportes', element: <PdfGenerator /> },
        ],
    },
    {
        path: '/reporte',
        element: <RoleRoute role="Donante" />,
        children: [
            { index: true, element: <PdfGenerator /> },
        ],
    },
    {
        path: '/pruebas',
        element: <RoleRoute role="Gestor" />,
        children: [
            { index: true, element: <DashboardTest />, loader: dashboardLoader },
        ],
    },
]);
