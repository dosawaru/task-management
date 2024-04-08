import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1 hidden>Sign Up Page</h1>
      <SignUp />
    </div>
  );
}
