import { FC, useState } from "react";

import { IUserDashboard } from "@interfaces/bll/dashboard.interface";
import ModalLayout from "@common/Layouts/Modal/Layout";

import BodyUsersTable from "./Body/Body";
import HeadUserTable from "./Head/Head";
import ChangeManufacturerModal from "./ModalContent/ModalContent";
import s from "./table.module.scss";

interface TableUsersProps {
  users: IUserDashboard[];
}

const TableUsers: FC<TableUsersProps> = ({ users }) => {
  const [modalOpen, setModalOpen] = useState<string>("");

  const handleToggleModal = (id: string) => {
    setModalOpen(id);
  };

  return (
    <>
      <table className={s.table}>
        <HeadUserTable />
        <tbody className={s.table_body}>
          {users.map(
            (user) => (
              (
                <BodyUsersTable
                  key={user?._id}
                  // {...user}
                  _id={user?._id}
                  amountOfOrders={user?.amountOfOrders}
                  company={user?.company}
                  email={user?.email}
                  lastActive={
                    user?.lastActive ? user?.lastActive?.toString() : ""
                  }
                  manufacturer={user?.manufacturer ? user?.manufacturer : ""}
                  name={user?.name}
                  role={user?.role}
                  handleToggleModal={handleToggleModal}
                />
              )
            )
          )}
        </tbody>
        {/* <BodyUsersTable
          handleToggleModal={handleToggleModal}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          users={users}
        /> */}
      </table>
      {modalOpen !== "" && (
        <ModalLayout handleClose={() => handleToggleModal("")}>
          <ChangeManufacturerModal
            handleClose={() => handleToggleModal("")}
            id={modalOpen}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default TableUsers;
