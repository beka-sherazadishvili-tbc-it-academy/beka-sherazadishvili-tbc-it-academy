export interface ITodo {
    id: string;
    title: string;
    createdAt: Date;
    completedAt?: Date | null;
    completed: boolean
}

export type TodoFilter = 'all' | 'active' | 'completed';
export type TodoSort = 'createdAt' | 'completedAt';