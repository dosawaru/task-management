"use client";

import { FormSubmit } from "@/components/forms/form-submit";
import { FormTextarea } from "@/components/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useAction } from "@/hooks/use-actions";
import { createCard } from "@/actions/create-card";
import { useRef, forwardRef, ElementRef } from "react";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "sonner";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}
export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const formRef = useRef<ElementRef<"form">>(null);

    //hook to handle creat card actions
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created!`);
        formRef.current?.click();
        disableEditing();
      },
      onError: (error: string) => {
        toast.error(error);
      },
    });

    //disables editing on escape key
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    //disables editing when clicked outside of form reference
    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    //handles on submit form
    const onSubmit = (FormData: FormData) => {
      const title = FormData.get("title") as string;
      const listId = FormData.get("listId") as string;
      const boardId = FormData.get("boardId") as string;

      execute({ title, listId, boardId });
    };

    // Render textarea when in editing mode
    if (isEditing) {
      return (
        <form action={onSubmit} className="space-x-4">
          <FormTextarea
            id="title"
            errors={fieldErrors}
            ref={ref}
            placeholder="Enter a title for this card..."
            className="bg-white/80 rounded"
          />
          <input hidden id="listId" name="listId" defaultValue={listId} />
          <input hidden id="boardId" name="boardId" />

          <div className="flex items-center justify-between bg-inherit !ml-0">
            {/* Buttons to add card and exit out*/}
            <FormSubmit className="bg-white/50">Add Card</FormSubmit>
            <Button onClick={disableEditing} size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2 block">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 w-full justify-start hover:text-black/60"
          size="sm"
          variant="default"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
