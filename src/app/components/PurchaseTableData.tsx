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
  disabled,
}: {
  id: number;
  data?: string;
  fieldToUpdate?: TraderEnum;
  inputType: string;
  isInputRequired: boolean;
  isEditable: boolean;
  handleUpdateSupplier: (
    id: number,
    field: TraderEnum,
    data: string
  ) => Promise<boolean>;
  disabled: boolean;
}): React.JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(data);
  const [_data, setData] = useState(data);

  return (
    <td className="w-fit">
      <fieldset disabled={disabled}>
        {isEdit ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateSupplier(id, fieldToUpdate!, formData!).then(
                (value) => (value ? setData(formData) : setData(data))
              );
              setIsEdit(!isEdit);
            }}
          >
            <input
              className="input w-full text-xs"
              type={inputType}
              value={formData}
              onChange={(e) => {
                if (inputType === "tel") {
                  const value = e.target.value;
                  if (!Number.isNaN(Number(value)) || value === "+")
                    setFormData(value.toString());
                } else {
                  setFormData(e.target.value);
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
      </fieldset>
    </td>
  );
}

export default SupplierTableData;
