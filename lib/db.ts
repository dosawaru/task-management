import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
};

// assign globalThis.prisma if it exists, otherwise create a new PrismaClient instance
export const db = globalThis.prisma || new PrismaClient();

// assign the prisma instance to globalThis.prisma if its not in production environment, 
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;