"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-actions";

import { List } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/forms/form-submit";
import { ElementRef, useRef } from "react";
import { copyList } from "@/actions/copy-list";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  // Initialize ref to control popover close button
  const closeRef = useRef<ElementRef<"button">>(null);
  //handles delete list action
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted!`);
      closeRef.current?.click();
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  //handles delete list submission
  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  //handles copy list action
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copyd!`);
      closeRef.current?.click();
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  //handles copy list submission
  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 py-3 bg-white rounded"
        side="bottom"
        align="center"
        title="List Actions"
      >
        <div className="text-md text-center underline">List Actions</div>
        {/* Button to add new card */}
        <Button className="w-full h-auto flex-col items-start">
          {/* Form to copy list */}
          <form action={onCopy} className="w-full">
            <input hidden name="id" id="id" defaultValue={data.id} />
            <input
              hidden
              name="boardId"
              id="boardId"
              defaultValue={data.boardId}
            />
            <FormSubmit className="bg-slate-500/30 rounded mt-2 w-full">
              Copy List...
            </FormSubmit>
          </form>
          {/* Form to delete list */}
          <form action={onDelete} className="w-full">
            <input hidden name="id" id="id" defaultValue={data.id} />
            <input
              hidden
              name="boardId"
              id="boardId"
              defaultValue={data.boardId}
            />
            <FormSubmit className="bg-slate-500/30 rounded mt-2 w-full">
              Delete List...
            </FormSubmit>
          </form>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
