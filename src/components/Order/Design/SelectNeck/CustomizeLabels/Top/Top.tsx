import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "@common/Icons/CommonIcon";
import { AppDispatch, RootState } from "@redux/store";
import { changeFadingType } from "@redux/slices/order";

import CheckBoxCustomizeLabel from "../Checkbox/Checkbox";
import s from "./top.module.scss";

interface ICustomizeLabelsTop {
  handleClose: () => void;
}

const CustomizeLabelsTop: FC<ICustomizeLabelsTop> = ({ handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { type } = useSelector((state: RootState) => state.order.fading);

  const handleChangeItem = (newType: string) => {
    dispatch(changeFadingType(newType));
  };

  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen
  );
  const { orderType } = useSelector((state: RootState) => state.order);
  // Fetch the minimum quantity and check if it's required
  const fadingOption = productinfo?.fadingOptions?.find(
    (item) => item.type === type
  );
  const fadingMinimumQuantity = fadingOption?.minimumQuantity;
  const fadingIsMinimumRequired =
    orderType == "Custom clothing" ? fadingOption?.isMinimumRequired : false;

  return (
    <div className={s.top}>
      <ul className={s.top_list}>
        {fadingIsMinimumRequired && fadingMinimumQuantity && (
          <div
            style={{
              marginBottom: "1rem",
              color: "red",
            }}
          >
            The minimum order quantity is {fadingMinimumQuantity}
          </div>
        )}
        {productinfo?.fadingOptions?.map((item) => (
          <CheckBoxCustomizeLabel
            key={item.type}
            name={item.type}
            id={item.type}
            isActive={item.type === type}
            handleChange={handleChangeItem}
          />
        ))}
      </ul>

      <button onClick={handleClose} className={s.top_buttonClose}>
        <CloseIcon width="22" height="22" color="#111" />
      </button>
    </div>
  );
};

export default CustomizeLabelsTop;
