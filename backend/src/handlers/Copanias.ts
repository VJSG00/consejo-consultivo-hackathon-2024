import { Request, Response } from "express";
import { Op } from "sequelize";
import Companias from "../models/Companias.model";

export const getCompanias = async (req: Request, res: Response) => {
  const { search, sort = 'name', order = 'ASC', filter, status = true, page = 1, limit = 10 } = req.query;

  const whereClause: any = {};
  if (search) {
    whereClause[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { type: { [Op.like]: `%${search}%` } },
      { direction: { [Op.like]: `%${search}%` } },
      { phone: { [Op.like]: `%${search}%` } }
    ];
  }
  if (filter) {
    whereClause.type = filter;
  }
  if (status !== undefined) {
    whereClause.status = status === 'true';
  }

  const offset = (Number(page) - 1) * Number(limit);

  const companias = await Companias.findAll({
    where: whereClause,
    order: [[sort as string, order as string]],
    limit: Number(limit),
    offset: offset,
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });

  res.json({ data: companias });
};



export const createCompania = async (req: Request, res: Response) => {
    const compania = await Companias.create(req.body)
    res.status(201).json({data: compania}) 
}

