import {z} from "zod";

// Defining the schema for create board with validation for title 
export const CreateBoard = z.object({
    title: z.string({ 
        required_error: "Title is Required", 
        invalid_type_error: "Title is Required",
    }).min(3, {
        message: "Minimum length of 3 letters!"
     }),
});