import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Company } from '../../types/companies';

const Companias = () => {
  const [companias, setCompanias] = useState<Company[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('ASC');
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(companias.length / itemsPerPage);

  useEffect(() => {
    fetchCompanias();
  }, [search, sort, order, filter, status, currentPage, itemsPerPage]);

  const fetchCompanias = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/companias`;
      const response = await axios(url, {
        params: {
          search,
          sort,
          order,
          filter,
          status,
          page: currentPage,
          limit: itemsPerPage
        }
      });
      setCompanias(response.data.data);
    } catch (error) {
      console.error('Error fetching companias:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Companias</h1>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Buscar por nombre, tipo, dirección o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="name">Nombre</option>
          <option value="type">Tipo</option>
          <option value="direction">Dirección</option>
          <option value="phone">Teléfono</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ASC">Ascendente</option>
          <option value="DESC">Descendente</option>
        </select>
        <input
          type="text"
          placeholder="Filtrar por tipo..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            className="border p-2 rounded"
          />
          <span>Activo</span>
        </label>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border p-2 rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Dirección</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Estado</th>
          </tr>
        </thead>
        <tbody>
          {companias.map((compania) => (
            <tr key={compania.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{compania.name}</td>
              <td className="py-2 px-4 border-b">{compania.type}</td>
              <td className="py-2 px-4 border-b">{compania.direction}</td>
              <td className="py-2 px-4 border-b">{compania.phone}</td>
              <td className="py-2 px-4 border-b">{compania.status ? 'Activo' : 'Inactivo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Companias;
