import { FC, MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CloseIcon, ErrorIcon } from "@common/Icons/CommonIcon";
import { AppDispatch, RootState } from "@redux/store";
import { closeOrderTypeModal } from "@redux/slices/ui";
import { clearOpenProduct, getProductInfo } from "@redux/slices/products";

import { createNewOrder, resetOrderState } from "@redux/slices/order";
import { resetColors } from "@redux/slices/colors";
import routes from "@routes/index";

import s from "./csmodalProduct.module.scss";

const CustomiseModalProduct: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { productId, category } = useSelector(
    (state: RootState) => state.ui.ordermodal
  );
  const { productOpen: product } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getProductInfo(productId || ""));
  }, [productId, dispatch]);

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleCloseModal = () => {
    dispatch(clearOpenProduct());
    dispatch(closeOrderTypeModal());
    dispatch(resetOrderState());
    dispatch(resetColors());
  };

  const handleCreateclothingNewOrder = () => {
    handleCloseModal();
    product &&
      productId &&
      dispatch(
        createNewOrder({
          productType: category ? category : product.categories[0],
          orderType: "Custom clothing",
        })
      );
   
    navigate(routes.order);
  };
  const handleCreateTechpackNewOrder = () => {
    handleCloseModal();
    product &&
      productId &&
      dispatch(
        createNewOrder({
          productType: category ? category : product.categories[0],
          orderType: "Tech pack",
        })
      );
   
    navigate(routes.order);
  };

  return (
    <div onClick={handleModalClick} className={s.modal}>
      <div className={s.modal_left}></div>
      <div className={s.modal_right}>
        <div className={s.modal_right_top}>
          <h2 className={s.modal_right_top_title} style={{marginRight:"10px"}}>Choice order type</h2>
          <button onClick={handleCloseModal} className={s.modal_right_top_btn}>
            <CloseIcon width="22" height="22" color="#111" />
          </button>
        </div>
        <div className={s.item} style={{marginTop:"10px"}} >
          <button
            onClick={handleCreateclothingNewOrder}
            className={s.modal_right_btn}
            style={{
              backgroundColor: "peru",
              borderColor: "peru",
              marginRight: "2px",
            }}
          >
            Custom clothing
          </button>
          <button
            onClick={handleCreateTechpackNewOrder}
            className={s.modal_right_btn}
            style={{
              backgroundColor: "peru",
              borderColor: "peru",
              marginLeft: "2px",
            }}
          >
            Tech pack
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomiseModalProduct;
