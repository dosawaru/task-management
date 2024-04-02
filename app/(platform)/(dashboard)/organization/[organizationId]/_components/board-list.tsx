import { FormPopover } from "@/components/forms/form-popover";
import { User2 } from "lucide-react";

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <FormPopover side="right" sideOffset={10}>
        <div
          role="button"
          className="frid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <div className=" aspect-video bg-slate-600 h-full w-full relative rounded flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
            New Board
          </div>
        </div>
      </FormPopover>
    </div>
  );
};
