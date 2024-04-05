import {z} from "zod";

// Defining the schema for deleting list
export const CopyList = z.object({
    id: z.string(),
    boardId: z.string(),
});