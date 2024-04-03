import {z} from "zod";

// Defining the schema for create board with validation
export const CreateBoard = z.object({
    title: z.string({ 
        required_error: "Title is Required", 
        invalid_type_error: "Title is Required",
    }).min(3, { //requiring a minimum of 3 letter for title name
        message: "Minimum length of 3 letters!"
    }),
     image: z.string({ 
        required_error: "Image is Required", 
        invalid_type_error: "Image is Required",
    }),

});