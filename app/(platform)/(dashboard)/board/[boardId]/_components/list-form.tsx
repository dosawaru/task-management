"use client";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/forms/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/forms/form-submit";
import { useAction } from "@/hooks/use-actions";
import { toast } from "sonner";
import { createList } from "@/actions/create-list";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  // Initialize state for edit mode and input,form reference
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  // Function to enable editing mode
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  // Function to disable editing mode
  const disableEditing = () => {
    setIsEditing(false);
  };

  // hooks to handle successful and failed submissions
  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  // Listens to escape keypress to disable Editing form
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing;
    }
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    execute({
      title,
      boardId,
    });
  };

  // Add event listener for Escape key and click outside the form to disable editing mode
  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <li className="shrink-0 h-full w-[280px] select-none pt-4">
        <form
          action={onSubmit}
          ref={formRef}
          id="title"
          className="w-full shadow-sm rounded bg-white/80 space-y-4 p-3"
        >
          {/* Render form input for list title */}
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="border hover:border focus:border transition rounded"
            placeholder="Enter list title..."
          />
          <input hidden defaultValue={params.boardId} name="boardId" />

          {/* Buttons for submitting and canceling list creation */}
          <div className="flex item-center justify-between">
            <FormSubmit>Add List</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <div>
      <li className="shrink-0 h-full w-[280px] select-none pt-4">
        <Button
          onClick={enableEditing}
          className="w-full rounded bg-white/50 hover:bg-white/80 transition font-medium"
          style={{ height: "56px" }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add List
        </Button>
      </li>
    </div>
  );
};
