import {createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import Pacientes, { loader as pacientesLoader, action as updateAdmittedAction} from './views/Pacientes'
import NewPatient, {action as newPatientAction} from './layouts/NewPatient'
import EditPatient, {loader as editPatientLoader, actionUpdate as editPatientAction, actionDelete as deletePatientAction} from './views/EditPatient'
import CompaniasTable from './views/Companias'
import Home from './views/Home'
import Estadisticas from './views/Estadisticas'
import AuthLayout from './views/auth/AuthLayout'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import ConfirmationToken from './views/auth/ConfirmationToken'
import RegisterView from './views/auth/RequestNewCode'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import InicioLayout from './layouts/InicioLayout'
import MedicineTable from './views/MedicineTable'


                // loader: pacientesLoader,
                // action: updateAdmittedAction
 //ROA pattern - Resource-oriented desing
export const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children: [
            {index: true,
                element: <Home />, 
                // loader: pacientesLoader,
                // action: updateAdmittedAction
            },
            {
                path: 'pacientes',
                element: <Pacientes />,
                loader: pacientesLoader,
                action: updateAdmittedAction
            },
            {
                path: 'pacientes/nuevo',
                element: <NewPatient />,
                action: newPatientAction
            },
            {
                path:'pacientes/:id/editar', //ROA pattern - Resource-oriented desing
                element:<EditPatient/>,
                loader: editPatientLoader,
                action: editPatientAction
            },
            {
                path:'pacientes/:id/eliminar',
                action: deletePatientAction
            },
            {
                path: 'companias', // Nueva ruta para el componente de compañías
                element: <CompaniasTable />
            },
            {
                path: 'graficos',
                element: <Estadisticas />
            }
        ]
    },{
        path: 'medicinas',
        element: <MedicineTable/>
    },
    {
        path: '/inicio',
        element: <InicioLayout/>
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: 'register',
                element: <Register/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'confirm-account',
                element: <ConfirmationToken/>
            },
            {
                path: 'request-code',
                element: <RegisterView/>
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordView/>
            },
            {
                path: 'new-password',
                element: <NewPasswordView/>
            }
        ]
    }
])