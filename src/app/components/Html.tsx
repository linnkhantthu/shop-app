"use client";
import React, { ReactNode, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Inter } from "next/font/google";
import ThemeChanger from "./ThemeChanger";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Link from "next/link";
import Sidebar from "./Sidebar";
import useUser from "@/lib/useUser";
import Loading from "./Loading";
import ConnectionError from "./ConnectionError";

const inter = Inter({ subsets: ["latin"] });

function Html({ children }: { children: ReactNode }) {
  // States
  const [theme, setTheme] = useState(true); // True means dark mode
  const { data, isError, isLoading } = useUser();

  // Vars
  const fullPathName = usePathname(); // Get current pathname
  const splitedPathName = fullPathName.split("/"); // Split the pathname
  splitedPathName.shift(); // Removed the first Element
  const pathname = "/" + splitedPathName[0]; // For the sidebar category background color
  let tempDir = "";

  // Handle Theme
  function handleTheme() {
    setTheme(!theme);
  }

  // Close sidebar on Click
  function closeSidebar() {
    const input = document.getElementById("my-drawer-3");
    input?.click();
  }
  return (
    <html lang="en" data-theme={theme ? "dark" : "light"}>
      <body
        suppressHydrationWarning={true}
        className={inter.className + " overflow-x-auto flex-wrap h-screen"}
      >
        {isLoading ? (
          <div className="flex flex-col justify-center h-full">
            <Loading />
          </div>
        ) : isError ? (
          <ConnectionError />
        ) : (
          <main className="flex flex-row h-full">
            <div className="drawer">
              <input
                id="my-drawer-3"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar p-2 mt-0 fixed w-full z-10 top-0 bg-base-300">
                  <div className="flex-none">
                    {/*lg:hidden*/}
                    <label
                      htmlFor="my-drawer-3"
                      aria-label="open sidebar"
                      className={
                        isLoading
                          ? "hidden"
                          : data.isLoggedIn
                          ? "btn btn-square btn-ghost"
                          : "hidden"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-6 h-6 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    </label>
                  </div>
                  <div className="flex-1 px-2 mx-2">Shop</div>
                  <div className="flex-none hidden lg:block">
                    <ul className="menu menu-horizontal">
                      {/* Navbar menu content here */}
                      <li>
                        <ThemeChanger theme={theme} handleTheme={handleTheme} />
                      </li>
                      <li>
                        {!data.isLoggedIn ? (
                          ""
                        ) : (
                          <a>
                            <FaRegUserCircle />
                          </a>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className=" h-full mt-20">
                  <Container>
                    <span className="text w-full text-info mb-3">
                      {fullPathName === "/"
                        ? ""
                        : splitedPathName.map((value) => {
                            tempDir += "/" + value;
                            return (
                              <Link key={value} href={tempDir}>
                                {" > " + value}
                              </Link>
                            );
                          })}
                    </span>
                    {children}
                  </Container>
                </div>
              </div>
              {/* Sidebar */}
              {isLoading ? (
                ""
              ) : (
                <Sidebar
                  isLoggedIn={data.isLoggedIn}
                  theme={theme}
                  handleTheme={handleTheme}
                  pathname={splitedPathName}
                  closeSidebar={closeSidebar}
                />
              )}
            </div>
          </main>
        )}
      </body>
    </html>
  );
}

export default Html;
