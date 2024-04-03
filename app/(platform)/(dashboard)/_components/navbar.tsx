import { FormPopover } from "@/components/forms/form-popover";
import { Logo } from "@/components/logo";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="px-4 p-1 fixed z-50 top-0 w-full shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <div>
          <Logo />
        </div>
        {/* Allows creation of boards through NavBar */}
        <FormPopover>
          <button className="rounded-full bg-slate-900 text-white p-2.5 px-4 h-auto">
            Create
          </button>
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
