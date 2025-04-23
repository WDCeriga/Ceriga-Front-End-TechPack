import { FC, useState, useCallback } from "react";
import {
  formatDateToDDMMYY,
  formatDateToNMDDYY,
} from "@services/dataConverter";
import ChangeManufacturer from "./ChangeManufacturer/ChangeManufacturer";
import s from "./body.module.scss";

interface IBodyUserTable {
  handleToggleModal: (arg0: string) => void;
  _id: string;
  amountOfOrders: number;
  company: string;
  email: string;
  lastActive: string;
  manufacturer: string;
  name: string;
  role: string;
}

const BodyUsersTable: FC<IBodyUserTable> = ({
  handleToggleModal,
  _id,
  amountOfOrders,
  company,
  email,
  lastActive,
  manufacturer,
  name,
  role,
}) => {
  const [isOpenRoleChanger, setIsOpenRoleChanger] = useState<string>("");

  const handleToggleRoleChanger = useCallback(
    (idChanger: string) =>
      setIsOpenRoleChanger((prev) => (prev === idChanger ? "" : idChanger)),
    []
  );

  return (
    <tr className={s.row}>
      <td className={`${s.row_item} ${s.typeProd}`}>
        <div className={s.typeWrap}>
          <div className={s.typeName}>{name}</div>
        </div>
      </td>
      <td className={s.row_item}>
        <div className={s.row_item_container}>
          <span className={s.row_item__green}>{email}</span>
        </div>
      </td>

      <td className={s.row_item}>
        <div className={s.row_item_container}>
          {(role === "superAdmin" && "Super admin") || (
            <span className={s.row_item__gray}>{role}</span>
          )}
        </div>
      </td>
      <td className={s.row_item}>{formatDateToNMDDYY(lastActive)}</td>
      {/* <td className={`${s.row_item} ${s.row_item_status}`}>
        {role === "admin" ? (
          <ChangeManufacturer
            id={_id}
            manufacturer={manufacturer || "None"}
            isOpen={isOpenRoleChanger}
            handleChangeOpen={handleToggleRoleChanger}
            handleToggleModal={() => handleToggleModal(_id)}
          />
        ) : null}
      </td> */}
      <td className={`${s.row_item} ${s.row_item_status}`}>
        {role === "admin" ? (
          <ChangeManufacturer
            id={_id}
            manufacturer={manufacturer || "None"}
            isOpen={isOpenRoleChanger}
            handleChangeOpen={handleToggleRoleChanger}
            handleToggleModal={() => handleToggleModal(_id)}
          />
        ) : null}
      </td>

      <td className={s.row_item}>
        <span className={s.row_item__gray}>{amountOfOrders}$</span>
      </td>
    </tr>
  );
};

export default BodyUsersTable;
