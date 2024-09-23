import { Request, Response } from 'express';
import EntregaMedicamentos from '../models/EntregaMedicamentos.model';

// Actualizar una entrega de medicamentos por ID
export const updateEntregaMedicamentos = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const entregaMedicamentos = await EntregaMedicamentos.findByPk(id);
        if (!entregaMedicamentos) {
            return res.status(404).json({ error: "La entrega de medicamentos no está registrada" });
        }
        await entregaMedicamentos.update(req.body);
        res.json({ data: entregaMedicamentos });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la entrega de medicamentos" });
    }
};

// Registro de Medicamentos para un Paciente Nuevo.
export const createEntregaMedicamentos = async (req: Request, res: Response) => {
    const entregaMedicamentos = await EntregaMedicamentos.create(req.body);
    res.status(201).json({ data: entregaMedicamentos });
};

// Obtener todas las entregas de medicamentos
export const getEntregasMedicamentos = async (req: Request, res: Response) => {
    
    const entregasMedicamentos = await EntregaMedicamentos.findAll({
        order: [['id', 'DESC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.json({data: entregasMedicamentos})
    
//     try {
//         const entregasMedicamentos = await EntregaMedicamentos.findAll({
//             order: [['id', 'DESC']],
//             attributes: { exclude: ['createdAt', 'updatedAt'] }
//         });
//         console.log(entregasMedicamentos);
//         res.status(200).json({ data: entregasMedicamentos });
//     } catch (error) {
//         res.status(500).json({ error: "Error al obtener las entregas de medicamentos" });
//     }
};
