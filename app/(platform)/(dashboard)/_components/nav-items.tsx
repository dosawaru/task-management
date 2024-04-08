"use client";

import Image from "next/image";
import { Layout, Settings } from "lucide-react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

// Define type for organization object
export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

// Define props interface for NavItem component
interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: any;
  onExpand: (id: string) => void;
}
// Define NavItem component
export const NavItem = ({
  isExpanded,
  isActive,
  organization,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // Define navigation routes
  const routes = [
    {
      label: "Boards",
      icons: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Settings",
      icons: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
  ];

  //handles navigation click
  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex itmes-center gap-x-2">
          <div className="relative">
            <Image
              src={organization.imageUrl}
              alt=""
              className="rounded object-cover"
              style={{ width: "28px", height: "28px" }}
              width={28}
              height={28}
            />
          </div>
          <span className="text-small">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            onClick={() => onClick(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname === route.href && "bg-sky-500/10 text-sky-700"
            )}
            variant="ghost"
          >
            {route.icons}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
