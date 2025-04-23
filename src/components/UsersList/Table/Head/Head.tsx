import { FC } from "react";

import s from "./head.module.scss";

const HeadUserTable: FC = () => {
  return (
    <thead className={s.header}>
      <tr className={s.header_row}>
        <th className={s.header_row_item}>Name</th>
        <th className={`${s.header_row_item} ${s.email}`}>Email</th>
        <th className={`${s.header_row_item}`}>Role</th>
        <th className={`${s.header_row_item}`}>Last Dates</th>
        <th className={`${s.header_row_item} ${s.price}`}>Manufactures</th>
        <th className={`${s.header_row_item} ${s.status}`}>Amount of orders</th>
      </tr>
    </thead>
  );
};

export default HeadUserTable;
