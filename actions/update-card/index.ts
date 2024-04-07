"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";


import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { InputType, ReturnType } from "./types";
import { UpdateCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth();
    
    // Performs user authentication
    if (!userId || !orgId){
        return{
            error: "Unathorized",
        };
    }

    const {id, boardId, ...values} = data;

    let card;

    // update card in database
    try{
        card = await db.card.update({
        where: {
            id,
            list: {
                board:{
                    orgId,
                }
            }
        },
        data: {
            ...values,
        }
    });
    } catch(error){
        return {
            error: "Failed to update"
        }
    }

    // triggers revalidation for the corresponding board path
    revalidatePath(`/board/${boardId}`);
    return {data: card};
};

export const updateCard = createSafeAction(UpdateCard, handler);