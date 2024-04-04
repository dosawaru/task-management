import { FormPopover } from "@/components/forms/form-popover";
import { User2 } from "lucide-react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  // Fetch boards belonging to the organization from the database
  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      {/* Title for the board list */}
      <div className="flex items-center font-semibold text-lg">
        <User2 className="h-6 w-6 mr-2" /> {/* Icon representing user */}
        Your Boards
      </div>

      {/* Grid layout for displaying boards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Map through fetched boards and render links to individual board pages */}
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative aspect-video bg-center bg-cover h-full w-full p-2 rounded overflow-hidden"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="inset-0 group-hover:bg-black/40 absolute rounded transition-transform transform hover:scale-110">
              {/* Display board title */}
              <p className="relative font-bold p-4 text-white">{board.title}</p>
            </div>
          </Link>
        ))}

        {/* FormPopover component for creating a new board */}
        <FormPopover side="right" sideOffset={10}>
          <div role="button">
            {/* Container for the new board button */}
            <div className="aspect-video bg-slate-300 h-full w-full relative rounded flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
              New Board
            </div>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};
