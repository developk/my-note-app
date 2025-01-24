export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isStarred: number;
    isLocked: number;
    isDeleted: number;
}