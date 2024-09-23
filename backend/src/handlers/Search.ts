import { Request, Response } from 'express';
import Companias from '../models/Companias.model';
import { Op } from 'sequelize';

// Función para obtener compañías con paginación, búsqueda, filtro y ordenado
export const Search = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;
  const search = req.query.search as string || '';
  const sort = req.query.sort as string || 'name';
  const order = req.query.order as string || 'ASC';

  console.log(req.query.search)
  const whereClause = search ? {
    [Op.or]: [
      { name: { [Op.iLike]: `%${search}%` } },
      { type: { [Op.iLike]: `%${search}%` } },
      { direction: { [Op.iLike]: `%${search}%` } },
      { phone: { [Op.iLike]: `%${search}%` } }
    ]
  } : {};

  try {
    console.log(whereClause)
    const { count, rows } = await Companias.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [[sort, order]]
    });

    res.json({
      totalItems: count,
      companias: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las compañías', error });
  }
};


