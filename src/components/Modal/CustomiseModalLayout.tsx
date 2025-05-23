import { FC } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@redux/store";
import { closeOrderTypeModal } from "@redux/slices/ui";
import CustomiseModalProduct from "./CustomiseProduct/CustomiseModalProduct";
import s from "./csmodalLayout.module.scss";

const CustomiseModalLayout: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleCloseModal = () => {
    dispatch(closeOrderTypeModal());
  };
  return (
    <section onClick={handleCloseModal} className={s.container}>
      <CustomiseModalProduct />
    </section>
  );
};

export default CustomiseModalLayout;
