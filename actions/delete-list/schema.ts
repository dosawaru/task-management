import {z} from "zod";

// Defining the schema for deleting list
export const DeleteList = z.object({
    id: z.string(),
    boardId: z.string(),
});