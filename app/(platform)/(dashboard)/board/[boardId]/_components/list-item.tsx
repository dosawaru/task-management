"use client";

import { ListWithCards } from "@/types";
import { ListOptions } from "./list-options";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";
import { useCardModal } from "@/hooks/use-card-modal";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = useCardModal();

  //disables editing
  const disableEditing = () => {
    setIsEditing(false);
  };

  //enables editing
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  return (
    // List item container
    <li className="shrink-0 h-full w-[280px] select-none pt-4">
      {/* Outer wrapper for the list item */}
      <div className="w-full rounded shadow-md">
        {/* Inner wrapper for the list item content */}
        <div className="w-full rounded bg-white/80  transition font-medium py-2 px-4">
          {/* Render the list title */}
          <div>
            <div className="flex items-center justify-between">
              {data.title}
              <ListOptions onAddCard={enableEditing} data={data} />
            </div>
            {/* Render the individual card items */}
            <ol className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2")}>
              {data.cards.map((card, index) => (
                <div
                  key={card.id}
                  role="button"
                  className="border border-transparent hover:border-slate-700 py-2 px-3 bg-white rounded shadow"
                  onClick={() => onOpen(card.id)}
                >
                  {card.title}
                </div>
              ))}
            </ol>
            {/* Render the textarea to input a new card */}
            <CardForm
              listId={data.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
