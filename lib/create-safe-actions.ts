import { z } from "zod";

// Define field errors
export type fieldErrors<T> ={
    [K in keyof T]?: string[];
};

// Define type for action state
export type ActionState<TInput, TOutput> = {
    fieldErrors?: fieldErrors<TInput>;
    error?: string |null;
    data?: TOutput;
};

// Define type for action state
export const createSafeAction = <TInput, TOutput> (
    schema: z.Schema<TInput>,
    handler: (validatedDate: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
    // Return an asynchronous function that accepts input data and returns ActionState
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
        const validationResult = schema.safeParse(data); // Validate input data with the given schema
        if(!validationResult.success){
            // Extract field errors from validation result
            return{
                fieldErrors: validationResult.error.flatten().fieldErrors as fieldErrors<TInput>,
            }
        }
        //handler function is called with validated data
        return handler(validationResult.data);
    };
};