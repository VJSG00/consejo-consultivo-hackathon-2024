import { Request, Response } from 'express';
import HistoriaClinica from '../models/HistoriaClinica.model';

// Actualizar una historia clínica por ID
export const updateHistoriaClinica = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const historiaClinica = await HistoriaClinica.findByPk(id);
        if (!historiaClinica) {
            return res.status(404).json({ error: "La historia clínica no está registrada" });
        }
        await historiaClinica.update(req.body);
        res.json({ data: historiaClinica });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la historia clínica" });
    }
};

// Creación de una Historia Médica para un paciente nuevo.
export const createHistoriaClinica = async (req: Request, res: Response) => {
    const historiaClinica = await HistoriaClinica.create(req.body);
    res.status(201).json({ data: historiaClinica });
};

// Obtener todas las historias clínicas
export const getHistoriasClinicas = async (req: Request, res: Response) => {
    try {
        const historiasClinicas = await HistoriaClinica.findAll({
            order: [['id', 'DESC']],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.json({ data: historiasClinicas });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las historias clínicas" });
    }
};