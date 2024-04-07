"use client";

import { useEffect, useState } from "react";

import { CardModal } from "@/components/modal/card-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render nothing if the component is not mounted yet
  if (!isMounted) {
    return null;
  }

  // Render the CardModal component if the component is mounted
  return (
    <>
      <CardModal />
    </>
  );
};
