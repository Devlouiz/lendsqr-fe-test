"use client"
import React, { useState } from 'react';
import styles from './filter.module.scss'

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void
    onFilter: (filters: { organization: string; username: string; email: string; date: string; phoneNumber: string; status: string }) => void;
}
const FilterModal = ({ isOpen, onClose, onFilter } : FilterModalProps) => {
  const [organization, setOrganization] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleFilter = () => {
    onFilter({ organization, username, email, date, phoneNumber, status });
    onClose();
  };

  const handleReset = () => {
    setOrganization('');
    setUsername('');
    setEmail('');
    setDate('');
    setPhoneNumber('');
    setStatus('');
  };

  if (!isOpen) return null;

  return (
    
      <div className={styles.filterModal}>
        <h2>Filter</h2>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="organization">Organization</label>
            <select 
              id="organization" 
              value={organization} 
              onChange={(e) => setOrganization(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Lendsqr">Lendsqr</option>
              <option value="Lendstar">Lendstar</option>
              <option value="Irorun">Irorun</option>
              <option value="CreditPlus">CreditPlus</option>
              <option value="PayLater">PayLater</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="User"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input 
              type="date" 
              id="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input 
              type="tel" 
              id="phoneNumber" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              placeholder="Phone Number"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select 
              id="status" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="blacklisted">Blacklisted</option>
            </select>
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>Reset</button>
            <button type="button" className={styles.filterBtn} onClick={handleFilter}>Filter</button>
          </div>
        </form>
      </div>
    
  );
};

export default FilterModal;