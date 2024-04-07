"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";

import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  // Fetch card data using React Query
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  console.log("cardData:", cardData);

  // Render modal dialog with card data if available
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>{cardData?.title}</DialogContent>
    </Dialog>
  );
};
