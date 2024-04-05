"use client";

import { ListWithCards } from "@/types";
import { ListOptions } from "./list-options";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    // List item container
    <li className="shrink-0 h-full w-[280px] select-none pt-4">
      {/* Outer wrapper for the list item */}
      <div className="w-full rounded shadow-md">
        {/* Inner wrapper for the list item content */}
        <div
          className="w-full rounded bg-white transition font-medium py-2 px-4 inline-flex items-center justify-between"
          style={{ height: "56px" }}
        >
          {/* Render the list title */}
          <div className="flex items-center">
            {data.title}
            <ListOptions onAddCard={() => {}} data={data} />
          </div>
        </div>
      </div>
    </li>
  );
};
