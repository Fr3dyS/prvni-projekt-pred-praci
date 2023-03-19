import { Cell, Column, HeaderGroup, Row, useTable } from 'react-table';
import { useState } from 'react';

interface Props<T> {
  columns: Array<Column<T | any>>;
  data: Array<T>;
}

/** Komponenta představující tabulku se sloupci a daty */
export default function DataTable<T extends object>({ columns, data }: Props<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // TODO: filtrování ve sloupcích - useFilters 

  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPageIndex(0);
  };

  const pageCount = Math.ceil(rows.length / pageSize);

  return (
<div className="overflow-x-auto">
  <div className="mb-4">
    <select
      className="px-3 py-2 border border-gray-300 rounded-md"
      value={pageSize}
      onChange={handlePageSizeChange}
    >
      {[5, 10, 20, 50].map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  </div>
  <div className="inline-block min-w-full overflow-hidden">
    <table className="min-w-full">
      <thead>
        {headerGroups.map((headerGroup: HeaderGroup<T>, headerIdx: number) => {
          return (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerIdx}>
              {headerGroup.headers.map((column: HeaderGroup<T>, colIdx: number) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  key={colIdx}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize).map((row: Row<T>, rowIdx: number) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={rowIdx}>
              {row.cells.map((cell: Cell<T, any>, cellIdx: number) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    key={cellIdx}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
          onClick={() => setPageIndex(0)}
          disabled={pageIndex === 0}
        >
          {'<<'}
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
        >
          {'<'}
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex === pageCount - 1}
        >
          {'>'}
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
          onClick={() => setPageIndex(pageCount - 1)}
          disabled={pageIndex === pageCount - 1}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
}
