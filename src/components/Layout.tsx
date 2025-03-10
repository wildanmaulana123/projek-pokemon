import React, { FC } from "react";

import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen overflow-auto flex flex-col bg-gradient-to-r from-[#83a4d4] to-[#b6fbff] dark:from-[#141E30] dark:to-[#243B55]">
      <Navbar />
      <div className=" transition-all  h-full w-full  flex-col">{children}</div>
    </div>
  );
};

export default Layout;
