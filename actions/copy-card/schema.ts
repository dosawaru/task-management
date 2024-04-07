import {z} from "zod";

// Defining the schema for deleting Card
export const CopyCard = z.object({
    id: z.string(),
    boardId: z.string(),
});