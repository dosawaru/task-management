import {z} from "zod";

// Defining the schema for update card with validation
export const UpdateCard = z.object({
    boardId: z.string(),
    description: z.optional( 
        z.string({ 
            required_error: "Description is Required", 
            invalid_type_error: "Description is Required",
        }).min(3, { 
            message: "Minimum length of 3 letters!"
        })
    ),
    title: z.optional(
        z.string({ 
            required_error: "Title is Required", 
            invalid_type_error: "Title is Required",
        }).min(3, { 
            message: "Minimum length of 3 letters!"
        })
    ),
     id: z.string(),
});