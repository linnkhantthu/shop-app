import React from "react";

function Pagination({
  numberOfPages,
  setPage,
}: {
  numberOfPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const array = new Array(numberOfPages).fill(0);

  return (
    <div className="bottom-0 p-2 sticky bg-base-100">
      {array.map((v, i) => {
        return (
          <span
            key={`pagination-${i + 1}`}
            className=" rounded-sm p-2 mx-1 bg-info text-info-content cursor-pointer"
            onClick={() => {
              setPage(i + 1);
            }}
          >
            {i + 1}
          </span>
        );
      })}
    </div>
  );
}

export default Pagination;
