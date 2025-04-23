import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@redux/store";
import { getUsersList } from "@redux/slices/dashboard";
import { filterUsersByRole, filterUsersBySearch } from "@services/filterUsers";
import PaginationComponent from "@common/Pagination/Pagination";

import FilterUsersDashboard from "./Filter/Filter";
import TableUsers from "./Table/Table";
import s from "./userList.module.scss";

const UsersList: FC = () => {
  const { search } = useSelector((state: RootState) => state.dashboard);
  const { filterByRole } = useSelector((state: RootState) => state.dashboard);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch<AppDispatch>();
  console.log("search===>", search);
  console.log("filterByRole===>", filterByRole);
  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);
  const { users } = useSelector((state: RootState) => state.dashboard);
  const filterUsersStoreByRole = filterUsersByRole(users, filterByRole);
  console.log("filterUsersStoreByRole===>", filterUsersStoreByRole);
  const filteredUsers =
    search.length > 0
      ? filterUsersBySearch(filterUsersStoreByRole, search)
      : filterUsersStoreByRole;
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedList =
    filteredUsers?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  console.log("paginatedList=====>", paginatedList);

  return (
    <section className={s.section}>
      <div>Filters</div>
      <FilterUsersDashboard />
      <TableUsers users={paginatedList} />
      <div className={s.pagination}>
        <PaginationComponent
          count={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default UsersList;
