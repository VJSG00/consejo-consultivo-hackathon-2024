import usePaginatedSearch from "./usePaginatedSearch";

interface PaginatedTableProps {
    items: any[];
    columns: { key: string; label: string }[];
    searchKeys: string[];
  }
  
  const PaginatedTable: React.FC<PaginatedTableProps> = ({ items, columns, searchKeys }: PaginatedTableProps) => {
    const {
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
    } = usePaginatedSearch(items, searchKeys, 5);
  
    return (
      <div>
        <input
          type="text"
          placeholder="Buscar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <select
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className="mb-4 px-2 py-2.5 border border-gray-300 rounded"
        >
          {searchKeys.map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <select
          value={itemsPerPageState}
          onChange={(e) => setItemsPerPageState(Number(e.target.value))}
          className="mb-4 px-2 py-2.5 border border-gray-300 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <table className="min-w-full bg-white border rounded-sm border-gray-300">
          <thead className="bg-[#005d90] text-white">
            <tr>
              {columns.map(column => (
                <th key={column.key} className="py-2 border border-gray-300">{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id} className="odd:bg-white even:bg-slate-100">
                  {columns.map(column => (
                    <td key={column.key} className="py-2 px-1  text-sm whitespace-nowrap border border-gray-300">{item[column.key]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-2 px-1 text-sm text-center border border-gray-300">No se encontraron resultados</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-[#005d90] hover:bg-[#35a1da] rounded-sm disabled:opacity-50 disabled:bg-gray-400"
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-[#005d90] hover:bg-[#35a1da] rounded-sm disabled:opacity-50 disabled:bg-gray-400"
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  };
  
  export default PaginatedTable;
  