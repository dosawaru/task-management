"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderData, setOrderData] = useState(data);

  // useEffect hook to update orderData when data prop changes
  useEffect(() => {
    setOrderData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderData.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list} />;
      })}
      {/* Render the ListForm component for adding new lists */}
      <ListForm />

      {/* Empty element for spacing */}
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
