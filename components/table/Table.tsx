"use client";
import styles from "./table.module.scss";
import { IoFilter } from "react-icons/io5";
import { useState, useEffect } from "react";
import FilterModal from "../filterModal/FilterModal";
import Pagination from "../pagination/Pagination";
import OptionsModal from "../optionsmodal/OptionsModal";
import { Oval } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Define a type for a single user
type User = {
  organization: string;
  username: string;
  dateJoined: string;
  status: string;
  personalInfo: {
    "FULL NAME": string;
    "PHONE NUMBER": string;
    "EMAIL ADDRESS": string;
  };
};

const Table = ({ onUserSelect }: { onUserSelect: (user: User) => void }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  const [optionsModalUser, setOptionsModalUser] = useState<string | null>(null);

  //Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/6ae8b4a3-3c8f-4d3e-801b-9e0327c87576"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        localStorage.setItem("users", JSON.stringify(data));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page: number, newItemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(newItemsPerPage);
  };

  //Toggle visibility and update state of active filter
  const toggleFilterModal = (filterType: string) => {
    if (activeFilter === filterType && isFilterModalOpen) {
      setIsFilterModalOpen(false);
      setActiveFilter("");
    } else {
      setActiveFilter(filterType);
      setIsFilterModalOpen(true);
    }
  };

  // Filters users based on various criteria and updates the filtered users list
  const handleFilter = (filterData: {
    organization: string;
    username: string;
    email: string;
    date: string;
    phoneNumber: string;
    status: string;
  }) => {
    const filtered = users.filter((user) => {
      return (
        (!filterData.organization ||
          user.organization.includes(filterData.organization)) &&
        (!filterData.username || user.username.includes(filterData.username)) &&
        (!filterData.email ||
          user.personalInfo["EMAIL ADDRESS"].includes(filterData.email)) &&
        (!filterData.date || user.dateJoined === filterData.date) &&
        (!filterData.phoneNumber ||
          user.personalInfo["PHONE NUMBER"].includes(filterData.phoneNumber)) &&
        (!filterData.status ||
          user.status.toLowerCase() === filterData.status.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
    setIsFilterModalOpen(false);
    setActiveFilter("");
  };

  // Toggles the visibility of the options modal based on the user ID
  const toggleOptionsModal = (userID: string) => {
    setOptionsModalUser(optionsModalUser === userID ? null : userID);
  };

  // Updates the status of a user and refreshes the user list
  const updateUserStatus = (userID: string, newStatus: string) => {
    const updatedUsers = users.map((user) => {
      if (`${user.username}-${user.dateJoined}` === userID) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    // Update the main users array
    setUsers(updatedUsers);

    //Toast notification
    toast.success('User status updated!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

    // Update the filtered users array while maintaining the current filter
    setFilteredUsers((prevFilteredUsers) =>
      prevFilteredUsers.map((user) => {
        if (`${user.username}-${user.dateJoined}` === userID) {
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  if (isLoading)
    return (
      <div>
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
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <>
    <div className={styles.table}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>
              <div className={styles.headerWithIcon}>
                Organization{" "}
                <i onClick={() => toggleFilterModal("organization")}>
                  <IoFilter />
                </i>
              </div>
              {/* When the active filter is 'organization', display the FilterModal component */}
              {activeFilter === "organization" && (
                <FilterModal
                  isOpen={isFilterModalOpen}
                  onClose={() => toggleFilterModal("")}
                  onFilter={handleFilter}
                />
              )}
            </th>
            <th>
              <div className={styles.headerWithIcon}>
                Username{" "}
                <i onClick={() => toggleFilterModal("username")}>
                  <IoFilter />
                </i>
              </div>
              {activeFilter === "username" && (
                <FilterModal
                  isOpen={isFilterModalOpen}
                  onClose={() => toggleFilterModal("")}
                  onFilter={handleFilter}
                />
              )}
            </th>
            <th>
              <div className={styles.headerWithIcon}>
                Email{" "}
                <i onClick={() => toggleFilterModal("email")}>
                  <IoFilter />
                </i>
              </div>
              {activeFilter === "email" && (
                <FilterModal
                  isOpen={isFilterModalOpen}
                  onClose={() => toggleFilterModal("")}
                  onFilter={handleFilter}
                />
              )}
            </th>
            <th>
              <div className={styles.headerWithIcon}>
                Phone Number{" "}
                <i onClick={() => toggleFilterModal("phoneNumber")}>
                  <IoFilter />
                </i>
              </div>
              {activeFilter === "phoneNumber" && (
                <FilterModal
                  isOpen={isFilterModalOpen}
                  onClose={() => toggleFilterModal("")}
                  onFilter={handleFilter}
                />
              )}
            </th>
            <th>
              <div className={styles.headerWithIcon}>
                Date Joined{" "}
                <i onClick={() => toggleFilterModal("dateJoined")}>
                  <IoFilter />
                </i>
              </div>
              {activeFilter === "dateJoined" && (
                <FilterModal
                  isOpen={isFilterModalOpen}
                  onClose={() => toggleFilterModal("")}
                  onFilter={handleFilter}
                />
              )}
            </th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr id={`${index}`} key={index}>
              <td>{user.organization}</td>
              <td>{user.username}</td>
              <td>{user.personalInfo["EMAIL ADDRESS"]}</td>
              <td>{user.personalInfo["PHONE NUMBER"]}</td>
              <td>{user.dateJoined}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    styles[user.status.toLowerCase()]
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>
                <OptionsModal
                  userID={`${user.username}-${user.dateJoined}`}
                  isOpen={
                    optionsModalUser === `${user.username}-${user.dateJoined}`
                  }
                  onToggle={() =>
                    toggleOptionsModal(`${user.username}-${user.dateJoined}`)
                  }
                  onStatusUpdate={updateUserStatus}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <div className={styles.pagination}>
        <Pagination
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Table;
