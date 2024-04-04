"use client";

import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-actions";

import { FormInput } from "@/components/forms/form-input";
import { FormSubmit } from "@/components/forms/form-submit";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCSESS");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({
      title,
      image: "",
    });
  };

  return (
    <form action={onSubmit}>
      <div>
        <FormInput id="title" errors={fieldErrors} />
      </div>
      <FormSubmit>Save</FormSubmit>
    </form>
  );
};
