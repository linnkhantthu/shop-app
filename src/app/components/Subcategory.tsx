import React, { ReactNode } from "react";

function Subcategory({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex flex-row justify-center divide-x divide-base-100">
        {children}
      </div>
    </div>
  );
}

export default Subcategory;
