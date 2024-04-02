import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";

const OrganizationIdPage = async () => {
  return (
    <div className="w-full mb-20">
      <div>
        <Info />
        <Separator className="my-4 bg-slate-300" />
      </div>
      <div>
        <BoardList />
      </div>
    </div>
  );
};

export default OrganizationIdPage;
