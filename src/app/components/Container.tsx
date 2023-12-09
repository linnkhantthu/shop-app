import React, { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row justify-center w-screen h-full">
      <div className="flex flex-col justify-start text-xs sm:text-sm mx-1 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default Container;
