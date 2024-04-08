import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { BoardOptions } from "./board-options";

interface BoardNavbarProps {
  id: string;
}

export const BoardNavbar = async ({ id }: BoardNavbarProps) => {
  const { orgId } = auth();
  const board = await db.board.findUnique({
    where: {
      id,
      orgId: orgId!,
    },
  });
  return (
    //Navbar to display board name and options to delete board
    <div className="w-full h-20 z-40 bg-black/50 fixed top-11 flex items-center px-6 text-white ">
      <span className="text-4xl">{board?.title}</span>
      <div className="ml-auto">
        <BoardOptions id={id} />
      </div>
    </div>
  );
};
