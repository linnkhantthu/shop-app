import { FlashMessage } from "@/lib/models";
import React from "react";

function Legend({
  title,
  flashMessage,
}: {
  title: string;
  flashMessage: FlashMessage | undefined;
}) {
  return (
    <legend className="flex flex-col w-full">
      {flashMessage ? (
        <span
          className={"mb-2 rounded p-1 pl-2 w-full " + flashMessage.category}
        >
          {flashMessage.message}
        </span>
      ) : (
        ""
      )}
      <h1>{title}</h1>
    </legend>
  );
}

export default Legend;
