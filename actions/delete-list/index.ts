"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";


import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { InputType, ReturnType } from "./types";
import { DeleteList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth();
    
    // Performs user authentication
    if (!userId || !orgId){
        return{
            error: "Unathorized",
        };
    }

    const {id, boardId} = data;

    let list;

    try{
        list = await db.list.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                }
            },
    });
    } catch(error){
        return {
            error: "Failed to delete list."
        }
    }

    // triggers revalidation to return to organization page 
    revalidatePath(`/board/${boardId}`);
    return {data: list}
};

export const deleteList = createSafeAction(DeleteList, handler);