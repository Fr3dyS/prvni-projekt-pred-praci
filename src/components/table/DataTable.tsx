import { Cell, Column, HeaderGroup, Row, useTable } from 'react-table';

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

  // TODO: přidání paginace + výběru kolik záznamů na stránku (5, 10, 20, 50) - usePagination + https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/pagination?file=/src/App.js
  // TODO: filtrování ve sloupcích - useFilters + https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/filtering?file=/src/App.js
  // TODO: řazení sloupce - useSortBy + https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/sorting

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup: HeaderGroup<T>, headerIdx: number) => {
          return (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerIdx}>
              {headerGroup.headers.map((column: HeaderGroup<T>, colIdx: number) => (
                <th {...column.getHeaderProps()} key={colIdx}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: Row<T>, rowIdx: number) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={rowIdx}>
              {row.cells.map((cell: Cell<T, any>, cellIdx: number) => {
                return (
                  <td {...cell.getCellProps()} key={cellIdx}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
