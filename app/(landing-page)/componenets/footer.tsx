import React from "react";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full h-14 px-4 border-b bg-slate-200 flex item-center">
      <div className=" mx-auto flex items-center w-full justify-between">
        <div className="flex items-center justify-between w-auto space-x-4">
          <div className="text-xl">
            <span>&copy;2024</span>
            <span> Daniel Osawaru</span>
          </div>
        </div>
      </div>
    </div>
  );
};
