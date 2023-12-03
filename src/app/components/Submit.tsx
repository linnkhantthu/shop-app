import React from "react";
import Loading from "./Loading";

function Submit({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button type="submit" className="my-2 btn btn-info w-28">
      {isSubmitting ? <Loading /> : "Submit"}
    </button>
  );
}

export default Submit;
