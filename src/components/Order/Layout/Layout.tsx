import { FC, ReactNode } from "react";

import s from "./layout.module.scss";

interface IOrderLayout {
  children: ReactNode;
}

const OrderLayout: FC<IOrderLayout> = ({ children }) => {
  console.log("PraveenUpadhyay1");
  return <section className={s.layout}>{children}</section>;
};

export default OrderLayout;
