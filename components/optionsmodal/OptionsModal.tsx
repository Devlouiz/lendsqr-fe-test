import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './optionsmodal.module.scss';
import { FaEye, FaUserTimes, FaUserCheck } from "react-icons/fa";


type OptionsModal = {
  userID: string;
  isOpen: boolean;
  onToggle: () => void;
  onStatusUpdate: (userID: string, newStatus: string) => void;
};
const OptionsModal = ({ userID, isOpen, onToggle, onStatusUpdate }: OptionsModal) => {
  
  const router = useRouter();


  const handleViewDetails = () => {
    router.push(`dashboard/userdetails/${encodeURIComponent(userID)}`);
  };

  const updateUserStatus = (newStatus: string) => {
    onStatusUpdate(userID, newStatus);
    onToggle();
    /*const usersRaw = localStorage.getItem('users');
    if (!usersRaw) {
      console.error('No users data found in localStorage.');
      alert('No user data available. Please check the system.');
      return;
    }
    
    const users = JSON.parse(usersRaw);
    const userIndex = users.findIndex((user: any) => `${user.username}-${user.dateJoined}` === userID);
    console.log(users)
    if (userIndex === -1) {
      console.error('User not found:', userID);
      alert(`User with ID ${userID} not found.`);
      return;
    }
  
    users[userIndex].status = newStatus;
    localStorage.setItem('users', JSON.stringify(users));
    console.log(`User ${userID} status updated to ${newStatus}`);
    onToggle(); // Close the modal after operation*/
  };

  const handleBlacklistUser = () => {
    updateUserStatus('Blacklisted');
    // Implement blacklist functionality 
    console.log('Blacklist user');
  };

  const handleActivateUser = () => {
    updateUserStatus('Active');
    // Implement activate functionality
    console.log('Activate user');
  };

  return (
    <div className={styles.popupMenuContainer}>
      <button onClick={onToggle} className={styles.menuToggle}>
        ⋮
      </button>
      {isOpen && (
        <div className={styles.popupMenu}>
          <button onClick={handleViewDetails}><i><FaEye/></i> View Details</button>
          <button onClick={handleBlacklistUser}><i><FaUserTimes/></i> Blacklist User</button>
          <button onClick={handleActivateUser}><i><FaUserCheck/></i> Activate User</button>
        </div>
      )}
    </div>
  );
};

export default OptionsModal;