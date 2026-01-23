import { useState, useMemo } from 'react';
import { generateData } from '../utils/mockData';
import { MapView } from './MapView';
import { DataTable } from './DataTable';
import { ProjectDetails } from './ProjectDetails';
import type { Status } from '../types';
import { Search, Filter, Map as MapIcon, Table as TableIcon } from 'lucide-react';

export const Dashboard = () => {
    // Generate data only once.
    const initialData = useMemo(() => generateData(6000), []);
    const [data] = useState(initialData);

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Derived state for filtering
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesSearch = item.projectName.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [data, search, statusFilter]);

    return (
        <div className="h-screen w-full flex flex-col bg-slate-950 text-slate-100 font-sans overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center px-6 justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-sky-500/20 p-2 rounded-lg border border-sky-500/30">
                        <MapIcon className="w-6 h-6 text-sky-400" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                        ROCsDashboard <span className="text-slate-500 font-medium text-sm ml-2">v1.0</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="bg-slate-800 border border-slate-700 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-32 md:w-64 transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <select
                            className="bg-slate-800 border border-slate-700 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-sky-500 appearance-none cursor-pointer hover:bg-slate-700/50 transition-colors"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as Status | 'All')}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Alert">Alert</option>
                        </select>
                    </div>

                    <div className="h-8 w-[1px] bg-slate-700 mx-2"></div>
                    <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                            <span className="text-xs">JD</span>
                        </div>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            {/* Main Content */}
            <main className="flex-1 p-4 flex flex-col lg:grid lg:grid-cols-3 gap-4 overflow-y-auto lg:overflow-hidden relative custom-scrollbar min-h-0">
                {/* Left Panel: Table */}
                <div className="lg:col-span-1 h-[500px] lg:h-full flex flex-col gap-2 shrink-0">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                            <TableIcon className="w-4 h-4" />
                            Project List
                            <span className="bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full text-xs">{filteredData.length}</span>
                        </h2>
                    </div>
                    <DataTable
                        data={filteredData}
                        selectedId={selectedId}
                        onSelect={(id) => {
                            setSelectedId(id);
                            setIsDetailsOpen(true);
                        }}
                    />
                </div>

                {/* Right Panel: Map */}
                <div className="lg:col-span-2 h-[500px] lg:h-full flex flex-col gap-2 relative overflow-hidden rounded-xl border border-slate-700 shadow-2xl shrink-0">
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                        {/* Map Controls Overlay could go here */}
                    </div>
                    <MapView
                        data={filteredData}
                        selectedId={selectedId}
                        onSelect={(id) => {
                            setSelectedId(id);
                            setIsDetailsOpen(true);
                        }}
                    />

                    {/* Detailed View Overlay */}
                    {isDetailsOpen && (
                        <ProjectDetails
                            project={data.find(p => p.id === selectedId) || null}
                            onClose={() => {
                                setIsDetailsOpen(false);
                                setSelectedId(null);
                            }}
                            onViewOnMap={() => setIsDetailsOpen(false)}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};
