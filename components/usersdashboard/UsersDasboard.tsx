"use client"
import React, {useState} from 'react';
import styles from "./usersdashboard.module.scss"
import Table from '../table/Table';
import { HiOutlineUsers } from "react-icons/hi";
import { PiUsersThree } from "react-icons/pi";
import { RiFileCloudFill } from "react-icons/ri";
import { BsDatabaseFillCheck } from "react-icons/bs";


type User = {
  organization: string;
  username: string;
  dateJoined: string;
  status: string;
  personalInfo: {
    "FULL NAME": string;
    "PHONE NUMBER": string;
    "EMAIL ADDRESS": string;
  }
};



const UsersDashboard = () => {
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const userStats = [
    { title: 'USERS', count: '2,453', icon: <HiOutlineUsers/>, color: '#FF18DF', bgColor:'#FCE8FF' },
    { title: 'ACTIVE USERS', count: '2,453', icon: <PiUsersThree/>, color: '#5718FF', bgColor: '#EEE8FF' },
    { title: 'USERS WITH LOANS', count: '12,453', icon: <RiFileCloudFill/>, color: '#F55F44', bgColor:'#FEEFEC' },
    { title: 'USERS WITH SAVINGS', count: '102,453', icon: <BsDatabaseFillCheck/>, color: '#FF3366', bgColor:'#FFEBF0' },
  ];


  return (
    <div className={styles.userDashboard}>
      <h3>Users</h3>
      
      <div className={styles.statCards}>
        {userStats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={`${styles.icon} ${stat.icon}`} style={{color: stat.color, background: stat.bgColor}}>{stat.icon}</div>
            <h3>{stat.title}</h3>
            <p>{stat.count}</p>
          </div>
        ))}
      </div>
      
      <div className={styles.userTableContainer}>
        <Table onUserSelect={(user: User) => setSelectedUser(user)}/>
      </div>
            
    </div>
  );
};

export default UsersDashboard;