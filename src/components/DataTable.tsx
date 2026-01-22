import { useState, useRef, useMemo, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Project } from '../types';
import { clsx } from 'clsx';
import { ArrowUpDown } from 'lucide-react';

interface DataTableProps {
    data: Project[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export const DataTable = ({ data, selectedId, onSelect }: DataTableProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const parentRef = useRef<HTMLDivElement>(null);

    const columns = useMemo<ColumnDef<Project>[]>(() => [
        {
            accessorKey: 'projectName',
            header: 'Project Name',
            cell: info => <span className="font-semibold text-slate-200">{info.getValue() as string}</span>,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: info => {
                const status = info.getValue() as string;
                const color = status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    status === 'Alert' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                        status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            'bg-amber-500/10 text-amber-400 border-amber-500/20';
                return (
                    <span className={`px-2 py-0.5 rounded text-xs border ${color} font-medium`}>
                        {status}
                    </span>
                );
            },
        },
        {
            accessorKey: 'lat',
            header: 'Lat',
            cell: info => (info.getValue() as number).toFixed(4),
        },
        {
            accessorKey: 'lng',
            header: 'Lng',
            cell: info => (info.getValue() as number).toFixed(4),
        },
        {
            accessorKey: 'lastUpdated',
            header: 'Last Updated',
            cell: info => new Date(info.getValue() as string).toLocaleDateString(),
        },
    ], []);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const { rows } = table.getRowModel();

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 48,
        overscan: 20,
    });

    // Auto-scroll to selected row if it changes (Optional, might be jarring)
    useEffect(() => {
        if (selectedId && parentRef.current) {
            const index = rows.findIndex(r => r.original.id === selectedId);
            if (index !== -1) {
                rowVirtualizer.scrollToIndex(index, { align: 'center' });
            }
        }
    }, [selectedId, rows, rowVirtualizer]);

    return (
        <div className="h-full flex flex-col bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Header */}
            <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {table.getHeaderGroups().map(headerGroup => (
                    <div key={headerGroup.id} className="flex w-full">
                        {headerGroup.headers.map(header => (
                            <div
                                key={header.id}
                                className={clsx(
                                    "flex-1 flex items-center gap-1 cursor-pointer hover:text-slate-200 transition-colors",
                                    header.column.getIsSorted() && "text-sky-400"
                                )}
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                <ArrowUpDown className="w-3 h-3 opacity-50" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-auto custom-scrollbar bg-slate-900/40" ref={parentRef}>
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative'
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const row = rows[virtualRow.index];
                        const isSelected = row.original.id === selectedId;

                        return (
                            <div
                                key={row.id}
                                className={clsx(
                                    "absolute top-0 left-0 w-full flex items-center px-4 transition-colors border-b border-slate-800/50",
                                    isSelected ? "bg-sky-500/20" : "hover:bg-slate-800",
                                    "cursor-pointer"
                                )}
                                style={{
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                                onClick={() => onSelect(row.original.id)}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <div key={cell.id} className="flex-1 truncate px-2 text-sm text-slate-300 first:pl-0">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                    {rows.length === 0 && (
                        <div className="flex items-center justify-center p-10 text-slate-500">
                            No results found
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-slate-800 border-t border-slate-700 px-4 py-2 text-xs text-slate-500 flex justify-between">
                <span>Showing {rows.length} records</span>
                <span>Sorted by: {JSON.stringify(sorting) === '[]' ? 'Default' : 'Active'}</span>
            </div>
        </div>
    );
};
