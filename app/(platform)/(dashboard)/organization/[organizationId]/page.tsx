import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Form } from "./form";

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany();
  return (
    <div className="">
      <Form />
      <div>
        {boards.map((board) => (
          <div key={board.id}>{board.title}</div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
