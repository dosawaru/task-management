import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrg() {
  return (
    <OrganizationList
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
      hidePersonal
    />
  );
}
