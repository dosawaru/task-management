"use client";

import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "@/components/forms/form-input";
import { updateCard } from "@/actions/update-card";
import { useAction } from "@/hooks/use-actions";
import { toast } from "sonner";

interface HeaderProps {
  data: CardWithList;
}

export const ModalHeader = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === data.title) {
      return;
    }
    execute({ title, boardId, id: data.id });

    console.log({ title });
  };

  return (
    <div className="flex items-start gap=x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1" />
      <div className="w-9/12 px-2">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            defualtValue={title}
            id="title"
            className="text-xl px-1 rounded truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline"> {data.list.title}</span>
        </p>
      </div>
    </div>
  );
};
