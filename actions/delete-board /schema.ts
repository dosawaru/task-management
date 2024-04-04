import {z} from "zod";

// Defining the schema for deleting board
export const DeleteBoard = z.object({
    id: z.string(),
});