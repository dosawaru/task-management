"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";


import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { InputType, ReturnType } from "./types";
import { CreateCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth();
    
    // Performs user authentication
    if (!userId || !orgId){
        return{
            error: "Unathorized",
        };
    }

    const {title, boardId, listId} = data;

    let card;

    // creates a new card in the database
    try{
        const list = await db.list.findUnique({
            where: {
                id: listId,
                board: {
                    orgId
                }
            },
        });

        if(!list){
            return{
                error: "List not found!"
            }
        }

        const lastCard = await db.card.findFirst({
            where: {listId: listId},
            orderBy: {order: "desc"},
            select: {order: true},
        })

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
        data: {
            title,
            listId,
            order: newOrder
        },
    });
    } catch(error){
        return {
            error: "Failed to create"
        }
    }

    // triggers revalidation for the corresponding board path
    revalidatePath(`/board/${boardId}`);
    return {data: card};
};

export const createCard = createSafeAction(CreateCard, handler);