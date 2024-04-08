"use client";
import Image from "next/image";
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
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { defaultImages } from "@/public/images/images";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({ children, align }: FormPopoverProps) => {
  const router = useRouter();

  const [images, setImages] = useState<Array<Record<string, any>>>([
    defaultImages,
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageID, setSelectedImageID] = useState(null);

  const { pending } = useFormStatus();
  const [defaultValue, setDefaultValue] = useState("");

  //fetching saved images *try using unsplash api instead
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setImages(defaultImages);
      } catch (errors) {
        console.log(errors);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
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
    const image = defaultValue;

    execute({ title, image });
  };

  return (
    // Popover container to allow user to select image, title name, and submit
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3 bg-white"
        side={"bottom"}
        sideOffset={5}
      >
        <div className="text-sm text-center">Create Board</div>
        <form action={onSubmit}>
          <div className="space-y-4">
            {/* display image */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-2 mb-2">
                {/* reads defaultImages array */}
                {images.map((defaultImages) => (
                  <div
                    key={defaultImages.id}
                    className={cn(
                      " cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                      pending && "opacity-50 hover:opacity-50 cursor-auto"
                    )}
                    onClick={() => {
                      if (pending) return;
                      setSelectedImageID(defaultImages.id);
                      setDefaultValue(
                        `${defaultImages.id}|${defaultImages.urls.thumb}|${defaultImages.urls.full}`
                      );
                    }}
                  >
                    {/* retrieve the id and url of the image that is selected */}
                    <input
                      type="radio"
                      className="hidden"
                      defaultChecked={selectedImageID === defaultImages.id}
                      disabled={pending}
                    />
                    {/* display image */}
                    <Image
                      src={defaultImages?.urls?.thumb}
                      alt="unsplash image"
                      className="object-cover rounded"
                      fill
                      sizes="(max-width: 90px) 90px, 50px"
                    />
                    {/* added a check mark on the selected image */}
                    {selectedImageID == defaultImages.id && (
                      <div className="absolute h-full w-full bg-black opacity-50 rounded flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* display text field */}
            <FormInput
              id="title"
              label="Board Title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          {/* submit button */}
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
