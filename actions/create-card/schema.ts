import {z} from "zod";

// Defining the schema for create card
export const CreateCard = z.object({
    title: z.string({ 
        required_error: "Title is Required", 
        invalid_type_error: "Title is Required",
    }),
    boardId: z.string(),
    listId: z.string(),
});