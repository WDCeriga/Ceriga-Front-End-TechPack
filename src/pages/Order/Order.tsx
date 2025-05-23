import { FC } from "react";

//import Order from "@components/Order/Order";
import Order from "@components/Order/Order";
import WithoutSidebarLayout from "@common/Layouts/WithoutSidebar/Layout";

const OrderPage: FC = () => {
  console.log("PraveenUpadhyay");
  return (
    <WithoutSidebarLayout background="#FFF" isInfoLabel={true} title="Order">
      <Order />
    </WithoutSidebarLayout>
  );
};

export default OrderPage;
