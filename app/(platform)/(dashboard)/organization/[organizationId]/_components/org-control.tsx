"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const OrgControl = () => {
  // Retrieve route parameters
  const params = useParams();

  // Retrieve the setActive function from the useOrganizationList hook
  const { setActive } = useOrganizationList();

  // useEffect hook to execute code after component mount or parameter change
  useEffect(() => {
    // Check if setActive function exists
    if (!setActive) return;

    // Set the active organization using the setActive function
    setActive({
      organization: params.organizationId as string, // Use organizationId from route parameters
    });
  }, [setActive, params.organizationId]);

  return null;
};
