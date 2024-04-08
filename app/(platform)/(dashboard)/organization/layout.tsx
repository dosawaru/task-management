import { Sidebar } from "../_components/sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className=" flex gap-x-7 flex-col sm:flex-row">
        <div className="sm:w-64 shrink-0 block pb-10 w-full ">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};
export default OrganizationLayout;
