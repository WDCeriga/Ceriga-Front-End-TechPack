import { FC, useState } from "react";

import Title from "@common/Title/Title";

import Filter from "./Filter/Filter";
import TableOrders from "./Table/Table";
import s from "./orders.module.scss";

import "./common.scss";

const Orders: FC = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "techPack">("orders");

  return (
    <section className={s.container}>
      {/* Tab Titles */}
      <div className={s.tabHeader}>
        <div
          className={`${s.tabTitle} ${activeTab === "orders" ? s.active : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <h2 className={s.container_text} style={{ color: "#333" }}>
            Custom clothing Orders
          </h2>
        </div>
        <div
          className={`${s.tabTitle} ${
            activeTab === "techPack" ? s.active : ""
          }`}
          onClick={() => setActiveTab("techPack")}
        >
          <h2 className={s.container_text} style={{ color: "#333" }}>
            Tech Pack Orders
          </h2>
        </div>
      </div>

      {/* Tab Content */}
      <div className={s.wrapper}>
        <Filter />
        {activeTab === "orders" && <TableOrders isTechPack={false} />}
        {activeTab === "techPack" && <TableOrders isTechPack={true} />}
      </div>
    </section>
  );
};

export default Orders;
