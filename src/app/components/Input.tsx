import React from "react";

function Input({
  id,
  name,
  type,
  value,
  required,
  setState,
}: {
  id: string;
  name: string;
  type: string;
  value: any;
  required: true;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <input
      id={id}
      className="input input-bordered input-xs sm:input-sm"
      type={type}
      name={name}
      value={value}
      onChange={(e) => {
        setState(e.target.value);
      }}
      required={required}
    />
  );
}

export default Input;
