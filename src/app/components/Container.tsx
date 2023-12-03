import React, { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row justify-center w-screen">
      <div className="flex flex-col justify-start text-xs sm:text-sm mx-1 w-full">
        {children}
      </div>
    </div>
  );
}

export default Container;
