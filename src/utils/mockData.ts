import type { Project, Status } from '../types';

const STATUSES: Status[] = ['Active', 'Pending', 'Completed', 'Alert'];

export const generateData = (count: number): Project[] => {
    const data: Project[] = [];
    for (let i = 0; i < count; i++) {
        // Generate lat/lng roughly distributed globally but avoiding poles
        const lat = (Math.random() * 160) - 80;
        const lng = (Math.random() * 360) - 180;

        data.push({
            id: `proj-${i}`,
            projectName: `Project ${String(i + 1).padStart(4, '0')}`,
            lat,
            lng,
            status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
            lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)).toISOString(),
            description: `This is a detailed description for Project ${i + 1}. It involves complex geospatial tracking and analysis.`,
            budget: Math.floor(Math.random() * 1000000) + 50000,
            manager: `Manager ${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}`,
            progress: Math.floor(Math.random() * 100),
            startDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)).toISOString(),
            endDate: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)).toISOString(),
        });
    }
    return data;
};
