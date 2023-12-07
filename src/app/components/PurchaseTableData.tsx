import { TraderEnum } from "@/lib/models";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

/**
 * Table Data React Component
 * @param {number} id ID for Delete and Update functions
 * @param {string} data Data to show in table cell
 * @param {string} fieldToUpdate Field from DefinedEnum to decide which field to update
 * @returns {React.JSX.Element}
 */
function SupplierTableData({
  id,
  data,
  fieldToUpdate,
  inputType,
  handleUpdateSupplier,
  isInputRequired = true,
  isEditable = true,
}: {
  id: number;
  data?: string;
  fieldToUpdate?: TraderEnum;
  inputType: string;
  isInputRequired: boolean;
  isEditable: boolean;
  handleUpdateSupplier: (id: number, field: TraderEnum, data: string) => void;
}): React.JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const [_data, setData] = useState(data);

  return (
    <td className="w-fit">
      {isEdit ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateSupplier(id, fieldToUpdate!, data!);
            setIsEdit(!isEdit);
          }}
        >
          <input
            className="input w-full text-xs"
            type={inputType}
            value={_data}
            onChange={(e) => {
              if (inputType === "tel") {
                const value = e.target.value;
                if (!Number.isNaN(Number(value)) || value === "+")
                  setData(value.toString());
              } else {
                setData(e.target.value);
              }
            }}
            autoFocus
            required={isInputRequired}
            autoComplete="tel"
            step={inputType === "number" ? "0.01" : undefined}
          />
        </form>
      ) : (
        <div className="flex flex-row">
          {fieldToUpdate === TraderEnum.phoneNo ? (
            <a href={`tel:${_data}`} className="link link-primary">
              {_data}
            </a>
          ) : (
            <p>{_data}</p>
          )}
          {!isEditable ? (
            ""
          ) : (
            <span className="pl-1">
              <FaEdit
                onClick={() => setIsEdit(!isEdit)}
                className="hover:text-warning"
              />
            </span>
          )}
        </div>
      )}
    </td>
  );
}

export default SupplierTableData;
