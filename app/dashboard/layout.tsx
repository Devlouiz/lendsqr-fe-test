"use client"
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "../page.module.scss";
import { useState } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <div className={styles.dashboard}>
      <header>
        <Navbar toggleSidebar={toggleSidebar}/>
      </header>
      <div className={styles.sidebarMain}>
        <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar}/>
        <div className={styles.userDashboard}>{children}</div>
      </div>
    </div>
  );
};

export default layout;
