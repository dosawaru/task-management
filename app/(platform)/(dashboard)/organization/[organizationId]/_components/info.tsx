"use client";

import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

export const Info = () => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-16 h-16 relative">
        <Image
          fill
          src={organization?.imageUrl!}
          alt="Organization"
          className="rounded object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{organization?.name}</p>
      </div>
    </div>
  );
};
