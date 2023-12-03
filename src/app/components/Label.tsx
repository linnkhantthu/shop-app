import React from "react";

function Label({ text, htmlFor }: { text: any; htmlFor: string }) {
  return (
    <label className="label label-text text-xs sm:text-sm" htmlFor={htmlFor}>
      {text}
    </label>
  );
}

export default Label;
