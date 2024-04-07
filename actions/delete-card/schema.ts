import {z} from "zod";

// Defining the schema for deleting Card
export const DeleteCard = z.object({
    id: z.string(),
    boardId: z.string(),
});