"use client";

import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";

import { toast } from "sonner";

import { useAction } from "@/hooks/use-actions";
import { createBoard } from "@/actions/create-board";
import { FormImageSelect } from "./form-image-select";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side,
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const router = useRouter();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Board created!");
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };

  return (
    // Popover container to allow user to select image, title name, and submit
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3 bg-white"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm text-center">Create Board</div>
        <form action={onSubmit}>
          <div className="space-y-4">
            {/* display image */}
            <FormImageSelect id="image" errors={fieldErrors} />
            {/* display text field */}
            <FormInput
              id="title"
              label="Board Title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          {/* submit button */}
          <FormSubmit>Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
