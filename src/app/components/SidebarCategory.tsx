"use client";
import { Category } from "@/lib/models";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

/**
 * Sidebar Category
 * @param {number} index Index to decide which tab we are on.
 * @param {Category} category Category Object in sidebar.
 * @param {string[]} pathname Splited pathname in format "/purchase/suppliers/something" -> ["purchase", "suppliers", something].
 * @param {void} closeSidebar Function to close the sidebar.
 * @returns
 */
function SidebarCategory({
  index,
  category,
  pathname,
  closeSidebar,
}: {
  index: number;
  category: Category;
  pathname: string[];
  closeSidebar: () => void;
}) {
  // Destructring the Category
  const {
    title,
    Icon,
    textColor,
    backgroundColor,
    url,
    iconColor,
    subcategory,
  } = category;

  // iconColors
  const iconColors: any = {
    warning: "text-warning",
    info: "text-info",
    error: "text-error",
    success: "text-success",
    primary: "text-primary",
    secondary: "text-secondary",
  };

  // States
  const [isHideSubcategory, setIsHideSubcategory] = useState(true);

  // Get current Pathname
  let actualPath = "";
  for (let i = 0; i < index + 1; i++) {
    actualPath += "/" + pathname[i];
  }

  // Creating Style
  let defaultStyle = "flex flex-row card w-full";
  defaultStyle = textColor ? defaultStyle + " " + textColor : defaultStyle;
  let customStyle = backgroundColor
    ? defaultStyle + " " + backgroundColor
    : defaultStyle;
  customStyle =
    actualPath === category.url
      ? defaultStyle + " " + "bg-base-100"
      : customStyle;

  // Router
  const router = useRouter();

  // Handle onClick
  function handleOnClick() {
    closeSidebar();
    router.push(url);
  }

  // Handle Subcategory
  function handleExpandSubcategory() {
    setIsHideSubcategory(!isHideSubcategory);
  }

  return (
    <>
      <div className={customStyle}>
        <div className="flex flex-row w-full" onClick={handleOnClick}>
          <span className="p-1 ">
            <Icon className={`${iconColors[iconColor]}`} />
          </span>
          <span className="p-1">{title}</span>
        </div>
        <div className="" onClick={handleExpandSubcategory}>
          {subcategory ? (
            isHideSubcategory ? (
              <FaAngleDown className="float-right" />
            ) : (
              <FaAngleUp className="float-right" />
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <ul>
        {subcategory?.map((value) => {
          return (
            <li
              key={"sub-" + value.title}
              className={isHideSubcategory ? "hidden" : "pt-1"}
            >
              <SidebarCategory
                category={value}
                pathname={pathname}
                closeSidebar={closeSidebar}
                index={index + 1}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default SidebarCategory;
