import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

const usePaginatedSearch = (data: any[], keys: string[], itemsPerPage: number) => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

  const fuse = useMemo(() => new Fuse(data, { keys }), [data, keys]);

  const filteredData = useMemo(() => {
    return query ? fuse.search(query).map(result => result.item) : data;
  }, [query, fuse]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPageState);
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPageState;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageState;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, itemsPerPageState, filteredData]);

  return {
    query,
    setQuery,
    currentPage,
    setCurrentPage,
    itemsPerPageState,
    setItemsPerPageState,
    currentItems,
    totalPages,
  };
};

export default usePaginatedSearch;
