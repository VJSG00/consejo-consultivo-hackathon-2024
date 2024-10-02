import { useState, useMemo } from 'react';

const usePaginatedSearch = (items: any[], searchKeys: string[], itemsPerPage: number) => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);
  const [searchKey, setSearchKey] = useState(searchKeys[0]);

  const filteredItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.filter(item =>
      searchKeys.some(key =>
        item[key]?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [items, query, searchKeys]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPageState);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPageState;
    const end = start + itemsPerPageState;
    return filteredItems.slice(start, end);
  }, [filteredItems, currentPage, itemsPerPageState]);

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
