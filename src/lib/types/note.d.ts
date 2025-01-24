export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isStarred: boolean;
    isLocked: boolean;
    isDeleted: boolean;
}