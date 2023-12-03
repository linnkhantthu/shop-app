import { Trader } from "@prisma/client";
import React from "react";

/**
 * Select Component
 * @param {Trader[]} traders Trader List
 * @param {void} handleOnSelect Function to handle onChange select tag
 * @returns
 */
function Select({
  traders,
  handleOnSelect,
}: {
  traders: Trader[] | undefined;
  handleOnSelect: (e: React.SyntheticEvent<HTMLSelectElement, Event>) => void;
}) {
  return (
    <select
      className="select select-xs sm:select-sm bg-base-200"
      onChange={(e) => {
        handleOnSelect(e);
      }}
    >
      {/* <option disabled selected>
        {title}
      </option> */}
      {traders?.map((value) => (
        <option key={"option-" + value.id} value={value.id}>
          {value.fullName}
        </option>
      ))}
    </select>
  );
}

export default Select;
