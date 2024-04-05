import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = auth();

  // Redirect to select organization page if organization ID is not available
  if (!orgId) {
    redirect("/select-org");
  }

  // Fetch lists belonging to the board from the database
  const list = await db.list.findMany({
    where: {
      boardId: params.boardId, // Filter by board ID
      board: {
        orgId, // Filter by organization ID
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc", // Order cards within lists by ascending order
        },
      },
    },
    orderBy: {
      order: "asc", // Order lists by ascending order
    },
  });

  // Render the component UI
  return (
    <div className="p-4 h-screen overflow-x-auto">
      {/* Render ListContainer component to display the lists and their cards */}
      <ListContainer boardId={params.boardId} data={list} />
    </div>
  );
};

export default BoardIdPage;
