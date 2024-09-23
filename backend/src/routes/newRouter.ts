// src/routes/routes.ts
import { Router } from 'express';
import { body } from 'express-validator';
import { createAllData, getAllData, updateAllData } from '../controllers/mainController';
import { handleInputErrors } from '../middleware';
import { createEntregaMedicamentos, getEntregasMedicamentos } from '../controllers/entregaMedicamentos';

const newRouter = Router();

// Validaciones para los datos del paciente
const pacienteValidation = [
    body('pacienteData.nombre').notEmpty().isString().withMessage('El nombre debe ser una cadena de texto'),
    body('pacienteData.apellido').notEmpty().isString().withMessage('El apellido debe ser una cadena de texto'),
    body('pacienteData.cedula').notEmpty().isInt().withMessage('La cédula debe ser un número entero'),
    body('pacienteData.club').notEmpty().isString().withMessage('El club debe ser una cadena de texto'),
    body('pacienteData.fechaNacimiento').notEmpty().isDate().withMessage('La fecha de nacimiento debe ser una fecha válida'),
    body('pacienteData.enEspera').notEmpty().isBoolean().withMessage('El estado en espera debe ser un valor booleano')
];

// Validaciones para los datos de alergias
const alergiasValidation = [
    body('alergiasData.*.tipo').notEmpty().isString().withMessage('El tipo de alergia debe ser una cadena de texto'),
    body('alergiasData.*.severidad').notEmpty().isString().withMessage('La severidad debe ser una cadena de texto')
];

// Validaciones para los datos de historias clínicas
const historiasClinicasValidation = [
    body('historiasClinicasData.*.descripcion').notEmpty().isString().withMessage('La descripción debe ser una cadena de texto'),
    body('historiasClinicasData.*.fecha').notEmpty().isDate().withMessage('La fecha debe ser una fecha válida')
];

// Validaciones para los datos de entregas de medicamentos
const entregasMedicamentosValidation = [
    body('entregasMedicamentosData.*.fechaEntrega').notEmpty().isDate().withMessage('La fecha de entrega debe ser una fecha válida'),
    body('entregasMedicamentosData.*.medicamento').notEmpty().isString().withMessage('El nombre del medicamento debe ser una cadena de texto'),
    body('entregasMedicamentosData.*.cantidad').notEmpty().isInt().withMessage('La cantidad debe ser un número entero'),
    body('entregasMedicamentosData.*.expirationDate').optional().isDate().withMessage('La fecha de expiración debe ser una fecha válida')
];

// Ruta para actualizar todos los datos
newRouter.put('/update-all', 
    pacienteValidation, 
    alergiasValidation, 
    historiasClinicasValidation, 
    entregasMedicamentosValidation, 
    handleInputErrors, 
    updateAllData
);

// Ruta para crear todos los datos
newRouter.post('/create-all', 
    pacienteValidation, 
    alergiasValidation, 
    historiasClinicasValidation, 
    entregasMedicamentosValidation, 
    handleInputErrors, 
    createAllData
);

// Ruta para obtener todos los datos
newRouter.get('/pacientes', getAllData);

// Conexión back y front primera parte
// testeando las medicinas
newRouter.get('/medicinas', getEntregasMedicamentos)


// Ruta para crear una entrega de medicamento
newRouter.post('/medicinas', 
    entregasMedicamentosValidation, 
    handleInputErrors, 
    createEntregaMedicamentos
);

export default newRouter;
