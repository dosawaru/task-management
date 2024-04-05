"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";


import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { InputType, ReturnType } from "./types";
import { CreateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth();
    
    // Performs user authentication
    if (!userId || !orgId){
        return{
            error: "Unathorized",
        };
    }

    const {title, boardId} = data;

    let list;

    // creates a new list in the database
    try{

        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId,
            },
        });

        if(!board){
            return{
                error: "Board not found!"
            }
        }

        const lastList = await db.list.findFirst({
            where: {boardId: boardId},
            orderBy: {order: "desc"},
            select: {order: true},
        })

        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
        data: {
            title,
            boardId,
            order: 1
        },
    });
    } catch(error){
        return {
            error: "Failed to create"
        }
    }

    // triggers revalidation for the corresponding board path
    revalidatePath(`/board/${boardId}`);
    return {data: list};
};

export const createList = createSafeAction(CreateList, handler);