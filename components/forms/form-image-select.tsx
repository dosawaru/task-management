"use client";

import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { defaultImages } from "@/public/images/images";

interface FormImageSelectProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormImageSelect = ({ id, errors }: FormImageSelectProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([
    defaultImages,
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageID, setSelectedImageID] = useState(null);
  const { pending } = useFormStatus();

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
  });

  if (isLoading) {
    return <div></div>;
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {/* reads defaultImages array */}
        {images.map((defaultImages) => (
          <div
            key={defaultImages.id}
            onClick={() => {
              if (pending) return;
              setSelectedImageID(defaultImages.id);
              console.log(defaultImages.id);
            }}
            className={cn(
              " cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
          >
            {/* retrieve the id and url of the image that is selected */}
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              defaultChecked={selectedImageID === defaultImages.id}
              disabled={pending}
              value={`${defaultImages.id}|${defaultImages.urls.thumb}|${defaultImages.urls.full}`}
            />
            {/* display image */}
            <Image
              src={defaultImages.urls.thumb}
              alt="unsplash image"
              className="object-cover rounded"
              fill
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
  );
};
