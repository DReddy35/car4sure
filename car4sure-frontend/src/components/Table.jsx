import React from "react";
import { Head, router, Link } from "@inertiajs/react";
import {
    useTable,
    useSortBy,
    usePagination,
    useGlobalFilter,
} from "react-table";

const Table = ({ columns, data, initialSortBy, onRowClick, showMailButton }) => {
    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     prepareRow,
    //     page,
    //     canPreviousPage,
    //     canNextPage,
    //     pageOptions,
    //     nextPage,
    //     previousPage,
    //     setGlobalFilter,
    //     state: { pageIndex, globalFilter },
    // } = useTable(
    //     {
    //         columns,
    //         data,
    //         initialState: { pageIndex: 0, ...(initialSortBy && { sortBy: initialSortBy }) } // Conditionally add sortBy
    //     },
    //     useGlobalFilter,
    //     useSortBy,
    //     usePagination
    // );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        setGlobalFilter,
        setPageSize,  // Add setPageSize to control page size
        state: { pageIndex, globalFilter, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: 0,
                pageSize: 10,  // Default page size
                ...(initialSortBy && { sortBy: initialSortBy }) // Conditionally add sortBy
            }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const handleFilterChange = (e) => {
        setGlobalFilter(e.target.value || undefined);
    };

    const archivedMails = () => {
        alert('yo bro archive dat sheeeeeeeeeeeeeeeeeee')
    }

    const bulkArchive = () => {
        alert('yo bro bulk dat thang')
    }

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
    };

    console.log(showMailButton);

    // Calculate the range of entries being displayed
    const startRow = pageIndex * pageSize + 1;
    const endRow = Math.min(startRow + page.length - 1, data.length);

    return (
        <div>
            {/* <input
                value={globalFilter || ""}
                onChange={handleFilterChange}
                className="mb-4 bg-white rounded-md border border-slate-100 w-full text-zinc-500/opacity-25 text-base font-normal  leading-tight"
                placeholder="Search table..."
            /> */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    {/* <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="bg-white rounded-md border border-slate-100 text-zinc-500 text-base font-normal leading-tight"
                    >
                        {[10, 25, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                Show {size} entries
                            </option>
                        ))}
                    </select> */}

                    <span className="text-xl font-bold">New Claims</span>
                </div>
                <div>
                    <input
                        value={globalFilter || ""}
                        onChange={handleFilterChange}
                        className="bg-white rounded-md border border-slate-100 w-48 text-zinc-500 text-base font-normal leading-tight"
                        placeholder="Search table..."
                    />
                </div>
            </div>
            <div className="w-full h-fit p-8 bg-white rounded-2xl shadow flex-col justify-start gap-6 inline-flex">
                <div className="px-4 sm:px-2 lg:px-4">
                    <div className="flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 px-8 align-middle">
                                <table {...getTableProps()} className="w-full divide-y divide-gray-300">
                                    <thead>
                                        {headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map(column => (
                                                    <th
                                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                                        className="bg-gray-50 py-3.5 pl-2 rounded-lg text-left text-primary text-sm border-none font-bold leading-[13.20px] "
                                                    >
                                                        {column.render('Header')}
                                                        <span>
                                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                                        </span>
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()} className="bg-white">
                                        {page.map(row => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()} onClick={() => onRowClick(row)}>
                                                    {row.cells.map(cell => (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="whitespace-nowrap py-5 text-xs pr-4 pl-2 text-left w-1/4 text-primary border-none"
                                                        >
                                                            {cell.column.id === 'linkColumn' ? (
                                                                <Link
                                                                    className="bg-gray-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-24"
                                                                    href={route("admin.client_video", cell.row.original.id)}
                                                                    onClick={e => e.stopPropagation()}
                                                                >
                                                                    VIDEO
                                                                    {cell.row.original.client_videos?.[0]?.videoUid ? (
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 512 512"
                                                                            className="w-5 h-5 fill-green-400"
                                                                        >
                                                                            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 512 512"
                                                                            className="w-5 h-5 fill-red-700"
                                                                        >
                                                                            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                                                                        </svg>
                                                                    )}
                                                                </Link>
                                                            ) : (
                                                                cell.render('Cell')
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-sm text-gray-700">
                                        Showing {startRow} to {endRow} of {data.length} entries
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => previousPage()}
                                            disabled={!canPreviousPage}
                                            className={`px-3 py-1 rounded-md ${!canPreviousPage ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                                        >
                                            Previous
                                        </button>
                                        <span className="mt-1">
                                            <strong className="text-lg mr-2">{pageIndex + 1}</strong>
                                            <span className="text-sm">{pageIndex + 2 === pageOptions.length ? '/' : ''}</span>
                                        </span>
                                        <button
                                            onClick={() => nextPage()}
                                            disabled={!canNextPage}
                                            className={`px-3 py-1 rounded-md ${!canNextPage ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-start">
                    <div>
                        {showMailButton && (
                            <div className="space-x-2">
                                <PrimaryButtonV2 buttonText="Archived Mails" onClick={archivedMails} />
                                <PrimaryButtonV2 buttonText="Bulk Archive" onClick={bulkArchive} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Table;
