import { FormPopover } from "@/components/forms/form-popover";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="px-4 p-1 fixed z-50 top-0 w-full shadow-sm bg-white flex items-center">
      <div className="flex items-center sm:gap-x-4 px-0">
        <div>
          <Logo />
        </div>
        {/* Allows creation of boards through NavBar */}
        <FormPopover>
          <Button className="px-4 sm:m-0 ml-4 h-auto bg-[#473080]/80 rounded-xl text-white hover:bg-[#473080]/90">
            Create
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        {/* Organization switch to help the user navigate create and navigate to other orgs */}
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        {/* User button to access account setting and signout */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 35,
                width: 35,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
