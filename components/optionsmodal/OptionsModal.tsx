import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './optionsmodal.module.scss';
import { FaEye, FaUserTimes, FaUserCheck } from "react-icons/fa";


type OptionsModal = {
  userID: string;
  isOpen: boolean;
  onToggle: () => void;
};
const OptionsModal = ({ userID, isOpen, onToggle }: OptionsModal) => {
  
  const router = useRouter();


  const handleViewDetails = () => {
    router.push(`dashboard/userdetails/${userID}`);
  };

  const handleBlacklistUser = () => {
    // Implement blacklist functionality 
    console.log('Blacklist user');
  };

  const handleActivateUser = () => {
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