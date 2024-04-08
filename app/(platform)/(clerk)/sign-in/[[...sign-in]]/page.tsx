import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1 hidden>Sign In Page</h1>
      <SignIn />
    </div>
  );
}
