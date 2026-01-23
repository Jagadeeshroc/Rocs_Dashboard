import type { Project } from '../types';
import { X, Calendar, DollarSign, User, Activity, Map as MapIcon } from 'lucide-react';

interface ProjectDetailsProps {
    project: Project | null;
    onClose: () => void;
    onViewOnMap: () => void;
}

export const ProjectDetails = ({ project, onClose, onViewOnMap }: ProjectDetailsProps) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 lg:absolute lg:inset-auto lg:top-0 lg:right-0 lg:h-full lg:w-96 bg-slate-900/95 backdrop-blur-xl border-l border-slate-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:z-20 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-100">{project.projectName}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded border mt-1 inline-block ${project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        project.status === 'Alert' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                            project.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                        {project.status}
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {/* Description */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Description</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-xs font-medium">Budget</span>
                        </div>
                        <p className="text-lg font-semibold text-emerald-400">
                            ${project.budget.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <User className="w-4 h-4" />
                            <span className="text-xs font-medium">Manager</span>
                        </div>
                        <p className="text-lg font-semibold text-sky-400">
                            {project.manager}
                        </p>
                    </div>
                </div>

                {/* Progress */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Progress
                        </h3>
                        <span className="text-sm font-bold text-slate-200">{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-1000"
                            style={{ width: `${project.progress}%` }}
                        />
                    </div>
                </div>

                {/* Dates */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Timeline
                    </h3>
                    <div className="flex justify-between text-sm border-l-2 border-slate-700 pl-4 py-1">
                        <div>
                            <p className="text-slate-500 text-xs">Start Date</p>
                            <p className="text-slate-300">{new Date(project.startDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-500 text-xs">End Date</p>
                            <p className="text-slate-300">{new Date(project.endDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Geo Location */}
                <div className="pt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-500 font-mono">
                        LAT: {project.lat.toFixed(6)} | LNG: {project.lng.toFixed(6)}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900 flex gap-3">
                <button
                    onClick={onViewOnMap}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2"
                >
                    <MapIcon className="w-4 h-4" />
                    See on Map
                </button>
                <button className="flex-1 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-medium transition-colors text-sm">
                    View Full Report
                </button>
            </div>
        </div>
    );
};
