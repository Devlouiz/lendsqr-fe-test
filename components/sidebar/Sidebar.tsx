"use client"

import styles from "./sidebar.module.scss"
import { FaHome, FaHandshake, FaPiggyBank, FaUserTimes, FaUserCog } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { FaUsers, FaSackDollar, FaBriefcase, FaHandHoldingDollar, FaUserCheck } from "react-icons/fa6";
import { RiArrowDropDownLine, RiDatabase2Fill, RiFilePaper2Fill } from "react-icons/ri";
import { AiTwotoneBank, AiOutlineAudit } from "react-icons/ai";
import { GrTransaction, GrServices } from "react-icons/gr";
import { ImStatsBars } from "react-icons/im";
import { MdTune } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { redirect } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

const Logout = () => {
  redirect("/")
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.organizationSwitcher}>
        <i className={styles.icon}><FaBriefcase/></i>
        <span>Switch Organization</span>
        <i className={styles.icon}><RiArrowDropDownLine/></i>
      </div>
      
      <div className={styles.menuItem}>
        <i className={styles.icon}><FaHome/></i>
        <span>Dashboard</span>
      </div>
      
      <div className={styles.menuSection}>
        <h3>CUSTOMERS</h3>
        <ul>
          <li className={styles.active}><i className={styles.icon}><HiUsers/></i><span>Users</span></li>
          <li><i className={styles.icon}><FaUsers/></i><span>Guarantors</span></li>
          <li><i className={styles.icon}><FaSackDollar/></i><span>Loans</span></li>
          <li><i className={styles.icon}><FaHandshake/></i><span>Decision Models</span></li>
          <li><i className={styles.icon}><FaPiggyBank/></i><span>Savings</span></li>
          <li><i className={styles.icon}><FaHandHoldingDollar/></i><span>Loan Requests</span></li>
          <li><i className={styles.icon}><FaUserCheck/></i><span>Whitelist</span></li>
          <li><i className={styles.icon}><FaUserTimes/></i><span>Karma</span></li>
        </ul>
      </div>
      
      <div className={styles.menuSection}>
        <h3>BUSINESSES</h3>
        <ul>
          <li><i className={styles.icon}><FaBriefcase/></i><span>Organization</span></li>
          <li><i className={styles.icon}><FaHandHoldingDollar/></i><span>Loan Products</span></li>
          <li><i className={styles.icon}><AiTwotoneBank/></i><span>Savings Products</span></li>
          <li><i className={styles.icon}><RiDatabase2Fill/></i><span>Fees and Charges</span></li>
          <li><i className={styles.icon}><GrTransaction/></i><span>Transactions</span></li>
          <li><i className={styles.icon}><GrServices/></i><span>Services</span></li>
          <li><i className={styles.icon}><FaUserCog/></i><span>Service Account</span></li>
          <li><i className={styles.icon}><RiFilePaper2Fill/></i><span>Settlements</span></li>
          <li><i className={styles.icon}><ImStatsBars/></i><span>Reports</span></li>
        </ul>
      </div>
      
      <div className={styles.menuSection}>
        <h3>SETTINGS</h3>
        <ul>
          <li><i className={styles.icon}><MdTune/></i><span>Preferences</span></li>
          <li><i className={styles.icon}><IoIosPricetags/></i><span>Fees and Pricing</span></li>
          <li><i className={styles.icon}><AiOutlineAudit/></i><span>Audit Logs</span></li>
        </ul>
      </div>
      <div className={`${styles.menuSection} ${styles.logoutSection}`}>
        <ul>
          <li className= {styles.logout}><i className={`${styles.icon} ${styles.logout}`}><FiLogOut/></i><span><Link href={'/'}>Logout</Link></span></li>
          <li  className={styles.version}><span>v1.2.0</span></li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
