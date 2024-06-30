"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import styles from "./userdetails.module.scss";
import Link from "next/link";
import { LuUser2 } from "react-icons/lu";

interface User {
  personalInfo: {
    "FULL NAME": string;
    "PHONE NUMBER": string;
    "EMAIL ADDRESS": string;
    BVN: string;
    GENDER: string;
    "MARITAL STATUS": string;
    CHILDREN: string;
    "TYPE OF RESIDENCE": string;
  };
  educationEmployment: {
    "LEVEL OF EDUCATION": string;
    "EMPLOYMENT STATUS": string;
    "SECTOR OF EMPLOYMENT": string;
    "DURATION OF EMPLOYMENT": string;
    "OFFICE EMAIL": string;
    "MONTHLY INCOME": string;
    "LOAN REPAYMENT": string;
  };
  socials: {
    TWITTER: string;
    FACEBOOK: string;
    INSTAGRAM: string;
  };
  guarantor: {
    "FULL NAME": string;
    "PHONE NUMBER": string;
    "EMAIL ADDRESS": string;
    RELATIONSHIP: string;
  };
  organization: string;
  username: string;
  dateJoined: string;
  status: string;
}

const UserDetails = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const params = useParams();
  const encodedUserID = params.userID as string;
  const userID = decodeURIComponent(encodedUserID);

  const renderSection = (title: string, data: { [key: string]: string }) => (
    <div className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.grid}>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className={styles.field}>
            <label>{key}</label>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // get the storedUsers and check if user exist
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers) as User[];
      const userDetail = users.find((user: User) => {
        const isMatch = `${user.username}-${user.dateJoined}` === userID;
        return isMatch;
      });
      setUserData(userDetail || null);
    }
  }, [userID]);

  if (!userData)
    return (
      <div className={styles.loader}>
        <Oval
          visible={true}
          height="130"
          width="130"
          color="#666"
          ariaLabel="oval-loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          wrapperClass=""
        />
      </div>
    );
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHead}>
        <div className={styles.backHome}>
          <Link href={"/dashboard"}>← Back to Users</Link>
        </div>
        <div className={styles.title}>
          <h3>User Details</h3>
          <div>
            <button className={styles.blacklist}>BLACKLIST USER</button>
            <button className={styles.activate}>ACTIVATE USER</button>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.avatar}><i><LuUser2/></i></div>
          <div className={styles.userInfo}>
            <h2>{userData.username}</h2>
            <p>{userData.personalInfo["PHONE NUMBER"]}ghdww</p>
          </div>
          <div className={styles.tierInfo}>
            <p>User's Tier</p>
            <div className={styles.stars}>⭐⭐☆</div>
          </div>
          <div className={styles.balance}>
            <h3>400,000</h3>
            <p>
              {userData.personalInfo["BVN"]}/{userData.organization} Bank
            </p>
          </div>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li className={styles.active}>General Details</li>
            <li>Documents</li>
            <li>Bank Details</li>
            <li>Loans</li>
            <li>Savings</li>
            <li>App and System</li>
          </ul>
        </nav>
      </div>
      <div className={styles.userProfile}>
        {renderSection("Personal Information", userData.personalInfo)}
        {renderSection(
          "Education and Employment",
          userData.educationEmployment
        )}
        {renderSection("Socials", userData.socials)}
        {renderSection("Guarantor", userData.guarantor)}
      </div>
    </div>
  );
};

export default UserDetails;
