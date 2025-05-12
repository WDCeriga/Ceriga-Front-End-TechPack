import { FC, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@redux/store";
import { getOrdersList } from "@redux/slices/orders";

import HeadTableOrders from "./Head/Head";
import OrderItem from "./Item/Item";
import s from "./table.module.scss";

interface TableOrdersProps {
  isTechPack: boolean;
}

const TableOrders: FC<TableOrdersProps> = ({ isTechPack }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { ordersList, isFilter, search, sortType } = useSelector(
    (state: RootState) => state.orders
  );
  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  const finalOrderList = useMemo(() => {
    return isTechPack
      ? ordersList.filter((item) => item?.orderType !== "Custom clothing")
      : ordersList.filter((item) => item?.orderType === "Custom clothing");
  }, [ordersList, isTechPack]);

  const currentOrdersList = useMemo(() => {
    let list = finalOrderList;
    if (isFilter) {
      const searchLower = search.toLowerCase();
      list = list.filter((item) => {
        const idString = `${item.id}`.toLowerCase();
        const productTypeString =
          item.productType?.toString().toLowerCase() || "";
        return (
          idString.startsWith(searchLower) ||
          productTypeString.startsWith(searchLower)
        );
      });
    }
    return list
      .slice()
      .sort((a, b) =>
        sortType === "Oldest First"
          ? new Date(b.orderData).getTime() - new Date(a.orderData).getTime()
          : new Date(a.orderData).getTime() - new Date(b.orderData).getTime()
      );
  }, [finalOrderList, isFilter, search, sortType]);

  return (
    <table className={s.table}>
      <HeadTableOrders />
      <tbody className={s.table_body}>
        {currentOrdersList.map((order) => (
          <OrderItem key={order.id} {...order} isTechPack={isTechPack} />
        ))}
      </tbody>
    </table>
  );
};

export default TableOrders;
