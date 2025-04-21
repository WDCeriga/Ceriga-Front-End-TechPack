import classNames from "classnames";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "@redux/store";
import { openModal, openOrderTypeModal } from "@redux/slices/ui";
import { createNewOrder, resetOrderState } from "@redux/slices/order";
import { resetColors } from "@redux/slices/colors";
import routes from "@routes/index";
import notification from "../../../../services/notification";

import Button from "./Button/Button";
import s from "./buttons.module.scss";

interface IButtons {
  size: "small" | "default";
  idProduct: string;
  category: string;
  isMobile: boolean;
}

const Buttons: FC<IButtons> = ({ size, idProduct, category, isMobile }) => {
  const navigate = useNavigate();
  const [mobileMsgVisible, setMobileMsgVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleOpenInformation = () => {
    dispatch(openModal({ productId: idProduct }));
  };
  const handleCreateNewOrder = () => {
    // dispatch(resetOrderState());
    // dispatch(resetColors());
    // dispatch(createNewOrder({ productType: category, productId: idProduct , orderType:"Custom clothing"}));
    // navigate(routes.order);

    dispatch(openOrderTypeModal({ productId: idProduct, category: category }));
  };
  const groupClasses = classNames(
    s.group,
    size === "default" && s.group__default
  );
  let timeoutId: NodeJS.Timeout;
  // let timeoutId: any;
  const handleMobileMessage = () => {
    // clearTimeout(timeoutId);
    // setMobileMsgVisible(true);
    // timeoutId = setTimeout(() => setMobileMsgVisible(false), 4000);
    notification.error("Only available on laptop.");
  };
  return (
    <div className={groupClasses}>
      <Button
        handleClick={handleOpenInformation}
        size={size}
        text="Information"
      />
      {isMobile ? (
        <Button
          handleClick={() => {
            handleMobileMessage();
          }}
          size={size}
          text="Customize"
        />
      ) : (
        <Button
          handleClick={handleCreateNewOrder}
          size={size}
          text="Customize"
        />
      )}
      {/* {mobileMsgVisible && (
        <div className={s.mobileWarning}>
          Only available on laptop.
        </div>
      )} */}
    </div>
  );
};

export default Buttons;
