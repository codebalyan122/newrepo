import React from "react";
import { useTable, usePagination } from "react-table";
import "./table.css";

import { Button } from "react-bootstrap";

const ReactTableWithPagination = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // You can adjust the initial page index and page size
    },
    usePagination
  );

  return (
    <div style={{ margin: "1rem" }}>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end">
        <span className="mr-3 mt-2">
          Page
          <strong>
            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </strong>
        </span>

        <Button
          className="mr-3 btn"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>
        <Button
          className="mr-3 btn"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const Table = ({ columns, data }) => {
  return <ReactTableWithPagination columns={columns} data={data} />;
};

export default Table;
