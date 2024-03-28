import Link from "next/link";
import { Medal } from "lucide-react";

export default function Home() {
  return (
    <section className="flex items-center justify-center flex-col h-full">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No# 1 task managment
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Strive helps reach your goals and be
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          more consistent.
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        Maximize efficiency, project management, and productivity like never
        before. Whether in the offices, at home, or on the go, unlock projects
        true potential with Strive.
      </div>
      <button className="mt-6 rounded-full bg-slate-900 text-white p-6">
        <Link href="/sign-up">Try Strive Now!</Link>
      </button>
    </section>
  );
}
