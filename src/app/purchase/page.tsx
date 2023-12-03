import React from "react";
import SubcategoryItem from "../components/SubcategoryItem";
import { Categories } from "@/lib/Categories";

function Purchase() {
  const purchaseCategory = Categories.filter((value) => value.id === 1);

  return (
    <div className=" grid grid-cols-2 sm:grid-cols-3">
      {purchaseCategory.map((value) =>
        value.subcategory?.map((value) => (
          <SubcategoryItem
            key={"purchaseCategory-" + value.id + value.title}
            title={value.title}
            url={value.url}
          />
        ))
      )}
    </div>
  );
}

export default Purchase;
