"use client";

import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";

import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { ModalHeader } from "./header";
import { Description } from "./description";
import { Copy, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-actions";
import { useParams } from "next/navigation";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const params = useParams();
  const cardModal = useCardModal();

  // Fetch card data using React Query
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  // hooks to handle successful and failed copy
  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title} copied"`);
        cardModal.onClose();
      },
      onError: (error: string) => {
        toast.error(error);
      },
    }
  );
  // hooks to handle successful and failed delete
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title} deleted"`);
        cardModal.onClose();
      },
      onError: (error: string) => {
        toast.error(error);
      },
    }
  );

  //handles on copy submit
  const onCopy = () => {
    const boardId = params.boardId as string;
    const id = cardData?.id as string;
    if (id) {
      executeCopyCard({ boardId, id });
    } else {
      console.error("Card data is undefined.");
    }
  };

  //handles on delete submit
  const onDelete = () => {
    const boardId = params.boardId as string;
    const id = cardData?.id as string;
    if (id) {
      executeDeleteCard({ boardId, id });
    } else {
      console.error("Card data is undefined.");
    }
  };

  // Render modal dialog with card data if available
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <div /> : <ModalHeader data={cardData} />}
        <div className="flex justify-between items-center">
          {!cardData ? <div /> : <Description data={cardData} />}

          {/* Render Action Buttons to copy and delete */}
          <div className="pl-1">
            <p className="font-semibold pl-4">Actions</p>
            <Button onClick={onCopy} disabled={isLoadingCopy}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button onClick={onDelete} disabled={isLoadingDelete}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
