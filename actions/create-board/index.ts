"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";


import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth();
    
    // Performs user authentication
    if (!userId || !orgId){
        return{
            error: "Unathorized",
        };
    }

    const {title, image} = data;

    // dissociate and seperate each field
    const [imageId, imageThumbUrl, imageFullUrl]= image.split("|");

    // return error of image fields are no found
    if(!imageId || !imageThumbUrl || !imageFullUrl){
        return{
            error: "Missing Image. Can not create board!"
        }
    }


    let board;

    // creates a new board in the database
    try{
        board = await db.board.create({
        data: {
            title,
            orgId,
            imageId,
            imageThumbUrl,
            imageFullUrl,
        }
    });
    } catch(error){
        return {
            error: "Database Error"
        }
    }

    // triggers revalidation for the corresponding board path
    revalidatePath(`/board/${board.id}`);
    return {data: board};
};

export const createBoard = createSafeAction(CreateBoard, handler);