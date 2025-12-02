export interface ISeat {
    row: string;
    number: number;
    status: 'available' | 'selected' | 'reserved'
}