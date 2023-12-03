import React from "react";
import { FaTrash } from "react-icons/fa";

function DeleteButton({
  handleDeleteSupplier,
  id,
}: {
  handleDeleteSupplier: (id: number) => void;
  id: number;
}) {
  return (
    <span
      onClick={() => {
        handleDeleteSupplier(id);
      }}
    >
      <FaTrash className="text-error" />
    </span>
  );
}

export default DeleteButton;
