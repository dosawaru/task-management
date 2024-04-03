import { auth } from "@clerk/nextjs";
import { OrgControl } from "./_components/org-control";
import { startCase } from "lodash";

//Updates the tabs name with the current selected organization name
export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization"),
  };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};
export default OrganizationIdLayout;
