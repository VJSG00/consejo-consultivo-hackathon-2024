import {Router} from 'express'
import { createPaciente, getPacientes, getPacienteById, updatePaciente, /*updateAdmitted, DeletePaciente*/ } from '../controllers/paciente'
import { body, param} from 'express-validator'
import { handleInputErrors } from '../middleware'
import { Search } from '../handlers/Search'
import { createCompania, getCompanias } from '../handlers/Copanias'

//import para prueba hola mundo:
import { Request, Response } from "express"


const router = Router()

// Prueba "hola mundo" para el router
router.get('/', (req, res) => {
    res.send('Hola Mundo');
});


//Routing
// Obtener los datos de todos los pacientes.
router.get('/pacientes', getPacientes);

// Obtener un paciente por su id.
router.get('/pacientes/:id', 
    param('id')
        .isInt().withMessage('ID no válido'),
    handleInputErrors,
    getPacienteById
);


// Crear un paciente.
router.post('/pacientes', 
    body('nombre')
        .notEmpty().withMessage('Por favor, ingrese el nombre del paciente'),
    body('apellido')
        .notEmpty().withMessage('Por favor, ingrese el apellido del paciente'),
    body('cedula')
        .isNumeric().withMessage('Ingrese un valor válido')
        .notEmpty().withMessage('Por favor, ingrese el número de cédula')
        .custom(value => value > 1000000).withMessage('Ingrese un número de cédula válido'),
    body('club')
        .isIn(['cancer', 'diabetes', 'hipertensión']).withMessage('Club no válido'),
    body('fechaNacimiento')
        .isDate().withMessage('Ingrese una fecha de nacimiento válida'),
    handleInputErrors,
    createPaciente
);


// Actualizar un paciente.
router.put('/pacientes/:id', 
    param('id')
        .isInt().withMessage('ID no válido'),
    body('nombre')
        .notEmpty().withMessage('Por favor, ingrese el nombre del paciente'),
    body('apellido')
        .notEmpty().withMessage('Por favor, ingrese el apellido del paciente'),
    body('cedula')
        .isNumeric().withMessage('Ingrese un valor válido')
        .notEmpty().withMessage('Por favor, ingrese el número de cédula')
        .custom(value => value > 1000000).withMessage('Ingrese un número de cédula válido'),
    body('club')
        .isIn(['cancer', 'diabetes', 'hipertensión']).withMessage('Club no válido'),
    body('fechaNacimiento')
        .isDate().withMessage('Ingrese una fecha de nacimiento válida'),
    body('enEspera')
        .isBoolean().withMessage('Valor para enEspera no válido'),
    handleInputErrors,
    updatePaciente
);


// router.patch('/pacientes/:id', 
//     param('id')
//     .isInt().withMessage('id no valido'),
//     handleInputErrors,
//     updateAdmitted
// )



// router.delete('/:id', 
//     param('id')
//     .isInt().withMessage('id no valido'),
//     handleInputErrors,
//     DeletePaciente
// )

export default router