import { Request, Response } from 'express';
import Alergia from '../models/Alergias.model';

// Actualizar una alergia por ID
export const updateAlergia = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const alergia = await Alergia.findByPk(id);
        if (!alergia) {
            return res.status(404).json({ error: "La alergia no está registrada" });
        }
        await alergia.update(req.body);
        res.json({ data: alergia });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la alergia" });
    }
};

// Crear las alergias para un paciente nuevo.
export const createAlergia = async (req: Request, res: Response) => {
    const alergia = await Alergia.create(req.body);
    res.status(201).json({ data: alergia });
};


// Obtener todas las alergias
export const getAlergias = async (req: Request, res: Response) => {
    try {
        const alergias = await Alergia.findAll({
            order: [['id', 'DESC']],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.json({ data: alergias });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las alergias" });
    }
};