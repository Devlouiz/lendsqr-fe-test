"use client";
import styles from "./table.module.scss";
import { IoFilter } from "react-icons/io5";
import { useState, useEffect } from "react";
import FilterModal from "../filterModal/FilterModal";
import Pagination from "../pagination/Pagination";
import OptionsModal from "../optionsmodal/OptionsModal";
import { Oval } from "react-loader-spinner";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

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


//Fetch usersdata from mock api
const fetchUsers = async () => {
  const response = await fetch("https://run.mocky.io/v3/6ae8b4a3-3c8f-4d3e-801b-9e0327c87576");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  localStorage.setItem("users", JSON.stringify(data));
  return data;
};


const Table = ({ onUserSelect }: { onUserSelect: (user: User) => void }) => {

  const queryClient = useQueryClient();

  const { data: Users = [], isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState(Users);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const totalItems = Users.length;

  const [optionsModalUser, setOptionsModalUser] = useState<string | null>(null);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page: number, newItemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(newItemsPerPage);
  };

  //Toggle filtermodal function

  const toggleFilterModal = (filterType: string) => {
    if (activeFilter === filterType && isFilterModalOpen) {
      // Close the modal if it's already open for the same filter type
      setIsFilterModalOpen(false);
      setActiveFilter("");
    } else {
      // Open the modal with the new filter type
      setActiveFilter(filterType);
      setIsFilterModalOpen(true);
    }
  };

  //Handle filter function

  const handleFilter = (filterData: {
    organization: string;
    username: string;
    email: string;
    date: string;
    phoneNumber: string;
    status: string;
  }) => {
    // Implemented filter logic here
    const filtered = Users.filter((user) => {
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
    console.log("Filter applied:", filterData);
  };

  //Toogle the OptionsModal for each user

  const toggleOptionsModal = (userID: string) => {
    if (optionsModalUser === userID) {
      // Close the modal if it's already open for this user
      setOptionsModalUser(null);
    } else {
      // Open the modal for the selected user
      setOptionsModalUser(userID);
    }
  };



  // This mutation function updates the status of a user. It maps through the Users array,
  // checks if the user ID matches, and updates the status if it does. The result is a promise
  // that resolves to the updated users array. On success, it updates the 'users' query data
  // in the query client and sets the filtered users state to reflect these changes.

  const updateUserStatusMutation = useMutation({
    mutationFn: (variables: { userID: string; newStatus: string }) => {
      // This would typically be an API call. For now, we'll just update locally.
      const updatedUsers = Users.map(user => {
        if (`${user.username}-${user.dateJoined}` === variables.userID) {
          return { ...user, status: variables.newStatus };
        }
        return user;
      });
      return Promise.resolve(updatedUsers);
    },
    onSuccess: (updatedUsers) => {
      queryClient.setQueryData(['users'], updatedUsers);
      setFilteredUsers(updatedUsers);
    },
  });

  const updateUserStatus = (userID: string, newStatus: string) => {
    updateUserStatusMutation.mutate({ userID, newStatus });
  };

  useEffect(() => {
    setFilteredUsers(Users);
  }, [Users]);

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
  if (error) return <div className={styles.error}>Error: {(error as Error).message}</div>;
  
  return (
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
      <div className={styles.pagination}>
        <Pagination
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Table;
