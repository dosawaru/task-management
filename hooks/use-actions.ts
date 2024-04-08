import { useState, useCallback } from "react";
import { ActionState, fieldErrors } from "@/lib/create-safe-actions";

type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
    onSuccess?: (data: TOutput) => void; 
    onError?: (error: string) => void; 
    onComplete?: () => void; 
};

// Define the useAction hook to use local component state 
export const useAction = <TInput, TOutput> (
    action: Action<TInput, TOutput>, 
    options: UseActionOptions<TOutput> = {} 
) => {
    // variables to manage field errors, error message, output data, and loading state
    const [fieldErrors, setFieldErrors] = useState<fieldErrors<TInput> | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [data, setData] = useState<TOutput | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const execute = useCallback(
        async (input: TInput) => {
            setIsLoading(true); // Set loading state to true when executing the action

            try {
                const result = await action(input); 

                if (!result) {
                    return; // Exit early if no result is returned
                }

                setFieldErrors(result.fieldErrors); // Set field errors 

                if (result.error) {
                    setError(result.error); // Set error message 
                    options.onError?.(result.error);
                }

                if (result.data) {
                    setData(result.data); // Set output data 
                    options.onSuccess?.(result.data); 
                }
            } finally {
                setIsLoading(false); // Set loading state to false after action execution
                options.onComplete?.();
            }
        },
        [action, options] 
    );

    // Return the execute function along with state variables
    return {
        execute,
        fieldErrors,
        error,
        data,
        isLoading,
    };
};
