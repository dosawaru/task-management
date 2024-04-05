"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";


import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { InputType, ReturnType } from "./types";
import { CopyList } from "./schema";

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
        const listToCopy = await db.list.findUnique({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                }
            },
            include: {
                cards: true,
            },
    });

    if(!listToCopy){
        return {error: "List not found"};
    }

    const lastList = await db.list.findFirst({
        where: {boardId},
        orderBy: {order: "desc"},
        select: {order: true},
    })

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
        data: {
            boardId: listToCopy.boardId,
            title: `${listToCopy.title} - Copy`,
            order: newOrder,
            cards: {
                createMany: {
                    data: listToCopy.cards.map((card) => ({
                        title: card.title,
                        description: card.description,
                        order: card.order,
                    })),
                },
            },
        },
        include: {
            cards: true,
        },
    });
    } catch(error){
        return {
            error: "Failed to copy list."
        }
    }

    // triggers revalidation to return to organization page 
    revalidatePath(`/board/${boardId}`);
    return {data: list}
};

export const copyList = createSafeAction(CopyList, handler);