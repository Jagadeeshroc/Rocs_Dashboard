export type Status = 'Active' | 'Pending' | 'Completed' | 'Alert';

export interface Project {
    id: string;
    projectName: string;
    lat: number;
    lng: number;
    status: Status;
    lastUpdated: string; // ISO Date string
    description: string;
    budget: number;
    manager: string;
    progress: number; // 0-100
    startDate: string;
    endDate: string;
}
