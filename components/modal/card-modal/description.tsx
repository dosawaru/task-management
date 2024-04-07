"use client";

import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/forms/form-submit";
import { FormTextarea } from "@/components/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-actions";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
  data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const params = useParams();

  // Initialize state for edit mode and textarea and form reference
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  // Function to enable editing mode
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  // Function to disable editing mode
  const disableEditing = () => {
    setIsEditing(false);
  };

  // hooks to handle successful and failed submissions
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Description for "${data.title}" updated!`);
      disableEditing();
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
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;
    execute({
      id: data.id,
      description,
      boardId,
    });
  };

  // Add event listener for Escape key and click outside the form to disable editing mode
  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5" />
      <div className="w-full">
        <p className="font-semibold mb-2">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextarea
              ref={textareaRef}
              id="description"
              className="w-full bg-neutral-300 rounded"
              placeholder="Add a more detailed description..."
              errors={fieldErrors}
              defaultValue={data.description || undefined}
            />
            <div className="flex items-center justify-between">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-20 text-sm p-2 rounded bg-neutral-300"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};
