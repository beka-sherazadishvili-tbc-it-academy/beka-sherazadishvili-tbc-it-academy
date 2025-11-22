export interface ICard {
    id: string;
    title: string;
    description?: string;
    labels: string[];
    createdAt: string;
    dueDate: string | null;
}