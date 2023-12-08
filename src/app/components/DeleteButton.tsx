import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Loading from "./Loading";

function DeleteButton({
  handleDeleteSupplier,
  id,
}: {
  handleDeleteSupplier: (id: number) => Promise<void>;
  id: number;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <>
      {isDeleting ? (
        <Loading />
      ) : (
        <span
          onClick={() => {
            setIsDeleting(true);
            handleDeleteSupplier(id);
            setIsDeleting(false);
          }}
        >
          <FaTrash className="text-error" />
        </span>
      )}
    </>
  );
}

export default DeleteButton;
