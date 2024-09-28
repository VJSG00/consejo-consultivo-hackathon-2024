import { useState, useEffect } from 'react';

const usePaginatedSearch = (data: any[], searchKeys: string[], itemsPerPage: number) => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);
  const [searchKey, setSearchKey] = useState(searchKeys[0]); // Inicializamos searchKey con el primer valor de searchKeys

  const filteredData = data.filter(item => {
    const value = item[searchKey];
    return value ? value.toString().toLowerCase().includes(query.toLowerCase()) : false;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPageState);
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPageState, currentPage * itemsPerPageState);

  useEffect(() => {
    setCurrentPage(1); // Reiniciar la página actual cuando cambia la consulta de búsqueda
  }, [query, searchKey]);

  return {
    query,
    setQuery,
    currentPage,
    setCurrentPage,
    itemsPerPageState,
    setItemsPerPageState,
    currentItems,
    totalPages,
    searchKey,
    setSearchKey,
  };
};

export default usePaginatedSearch;
