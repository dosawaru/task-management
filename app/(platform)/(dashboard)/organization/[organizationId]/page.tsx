import { auth, OrganizationSwitcher } from "@clerk/nextjs";

const OrganizationIdPage = () => {
  const { userId, orgId } = auth();
  console.log(orgId);

  return (
    <div className="">
      {/* <OrganizationSwitcher /> */}
      Org: {orgId} <div></div>
    </div>
  );
};

export default OrganizationIdPage;
