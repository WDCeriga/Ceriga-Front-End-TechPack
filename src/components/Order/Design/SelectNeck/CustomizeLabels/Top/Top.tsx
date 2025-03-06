import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { customizeLabelStore } from "@constants/order/customizeLabel";
import { CloseIcon } from "@common/Icons/CommonIcon";
import { AppDispatch, RootState } from "@redux/store";
import { changeFadingType } from "@redux/slices/order";
import { FadingType } from "@interfaces/order/design.interface";

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
    (state: RootState) => state.products.productOpen,
  );
  return (
    <div className={s.top}>
      <ul className={s.top_list}>
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
