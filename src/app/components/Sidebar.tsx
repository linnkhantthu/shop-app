import { Categories } from "@/lib/Categories";
import React from "react";
import SidebarCategory from "./SidebarCategory";
import ThemeChanger from "./ThemeChanger";

function Sidebar({
  isLoggedIn,
  theme,
  handleTheme,
  pathname,
  closeSidebar,
}: {
  isLoggedIn: boolean;
  theme: boolean;
  handleTheme: () => void;
  pathname: string[];
  closeSidebar: () => void;
}) {
  return (
    <div className="drawer-side z-20">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 min-h-full bg-base-200 w-fit">
        {/* Sidebar content here */}
        {isLoggedIn ? (
          <>
            <li>
              <ThemeChanger theme={theme} handleTheme={handleTheme} />
            </li>
            <li className="text-lg pl-3">Shop</li>
            {Categories.map((value) => (
              <li key={"li-" + value.title}>
                <SidebarCategory
                  category={value}
                  pathname={pathname}
                  closeSidebar={closeSidebar}
                  index={0}
                />
              </li>
            ))}
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
