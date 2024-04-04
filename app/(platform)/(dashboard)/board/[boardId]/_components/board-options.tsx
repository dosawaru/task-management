"use client";

import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-actions";
import { deleteBoard } from "@/actions/delete-board ";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error: string) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    // Utilized popover component to add delete functionality
    <Popover>
      <PopoverTrigger>
        <Button className="h-auto w-auto p-2">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 py-3 bg-white rounded"
        side="bottom"
        align="center"
      >
        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="w-full h-auto p-1 px-5 justify-start"
        >
          <span className="hover:bg-sky-200 rounded w-full p-3 text-md">
            Delete this board
          </span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
