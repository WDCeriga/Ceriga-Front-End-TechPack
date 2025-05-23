import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@redux/store";
import { getAllOrders, getOrderListInAdmin } from "@redux/slices/adminOrders";

import PaginationComponent from "@common/Pagination/Pagination";
import Title from "@common/Title/Title";

import AdminOrderFilter from "./Filter/Filter";
import AdminTableOrders from "./Table/Table";

import s from "./orders.module.scss";

const AdminOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, sortType } = useSelector(
    (state: RootState) => state.adminOrders
  );
  const { manufacturer, role } = useSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"orders" | "techPack">("orders");

  const itemsPerPage = 10;

  useEffect(() => {
    if (list === null && role !== null) {
      if (role === "admin") {
        dispatch(getOrderListInAdmin(manufacturer || ""));
      } else {
        dispatch(getAllOrders());
      }
    }
  }, [list, role, manufacturer, dispatch]);

  const filteredList =
    list?.filter((order) =>
      activeTab === "orders"
        ? order?.orderType == "Custom clothing"
        : order?.orderType !== "Custom clothing"
    ) || [];

  const sortedOrders = filteredList
    .slice()
    .sort((a, b) =>
      sortType === "Oldest First"
        ? new Date(b.orderData).getTime() - new Date(a.orderData).getTime()
        : new Date(a.orderData).getTime() - new Date(b.orderData).getTime()
    );

  const paginatedList = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className={s.container}>
      {/* Tab Titles as Buttons */}
      <div className={s.tabHeader}>
        <div
          className={`${s.tabTitle} ${activeTab === "orders" ? s.active : ""}`}
          onClick={() => {
            setActiveTab("orders");
            setCurrentPage(1);
          }}
        >
          <h2 className={s.container_text} style={{ color: "#333" }}>
            Custom clothing Orders
          </h2>
        </div>
        <div
          className={`${s.tabTitle} ${
            activeTab === "techPack" ? s.active : ""
          }`}
          onClick={() => {
            setActiveTab("techPack");
            setCurrentPage(1);
          }}
        >
          <h2 className={s.container_text} style={{ color: "#333" }}>
            Tech Pack Orders
          </h2>
        </div>
      </div>

      <div className={s.content}>
        <AdminOrderFilter />
        <AdminTableOrders
          list={paginatedList}
          isTechPack={activeTab === "techPack"}
        />
      </div>

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

export default AdminOrders;
