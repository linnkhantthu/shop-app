import Link from "next/link";
import React from "react";

function SubcategoryItem({ title, url }: { title: string; url: string }) {
  return (
    <Link href={url}>
      <div className="p-3 bg-base-300 hover:bg-base-200 cursor-pointer">
        {title}
      </div>
    </Link>
  );
}

export default SubcategoryItem;
