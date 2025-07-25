import { FC, MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CloseIcon, ErrorIcon } from "@common/Icons/CommonIcon";
import { AppDispatch, RootState } from "@redux/store";
import { closeModal, openModal, openOrderTypeModal } from "@redux/slices/ui";
import { clearOpenProduct, getProductInfo } from "@redux/slices/products";
import { createNewOrder } from "@redux/slices/order";
import { resetColors } from "@redux/slices/colors";
import routes from "@routes/index";
import { isMobile as isMobileDevice } from "react-device-detect";
import notification from "../../../services/notification";

import s from "./modalProduct.module.scss";

const ModalProduct: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { productId } = useSelector((state: RootState) => state.ui.modal);
  const { productOpen: product } = useSelector(
    (state: RootState) => state.products
  );
  useEffect(() => {
    // dispatch(getProductInfo(productId || ""));
    dispatch(getProductInfo(productId || ""));
  }, [productId, dispatch]);

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleCloseModal = () => {
    dispatch(clearOpenProduct());
    dispatch(resetColors());
    dispatch(closeModal());
  };

  const isSmallScreen = window.innerWidth <= 980;

  const isMobile = isMobileDevice || isSmallScreen;

  // const handleCreateNewOrder = () => {
  //   dispatch(resetColors());
  //   product &&
  //     productId &&
  //     dispatch(
  //       createNewOrder({
  //         productType: product.categories[0],
  //         orderType: "Custom clothing",
  //       })
  //     );
  //   navigate(routes.order);
  // };
  const handleCreateNewOrder = () => {
    if (!isMobile) {
      product &&
        productId &&
        dispatch(
          openOrderTypeModal({
            productId: productId,
            category: product?.categories[0],
          })
        );
    } else {
      navigate("/mobile-redirect"); // Redirect to mobile warning page
    }
  };
  if (!product) {
    return null;
  }
  const imgSrc = `${routes.server.base}${
    product.images && product.images[0]
      ? product.images[0]
      : routes.server.products.defaultImg
  }`;

  return (
    <div onClick={handleModalClick} className={s.modal}>
      <div className={s.modal_left}>
        <ErrorIcon width="20px" height="20px" color="#C80F0F" />
        {product && (
          <img
            crossOrigin="anonymous"
            className={s.modal_left_img}
            src={imgSrc}
            alt={product.name}
          />
        )}
      </div>
      <div className={s.modal_right}>
        {product && (
          <>
            <div className={s.modal_right_top}>
              <h2 className={s.modal_right_top_title}>{product.name}</h2>
              <button
                onClick={handleCloseModal}
                className={s.modal_right_top_btn}
              >
                <CloseIcon width="22" height="22" color="#111" />
              </button>
            </div>
            <button
              onClick={handleCreateNewOrder}
              className={s.modal_right_btn}
            >
              Start Designing
            </button>
            <div style={{ fontSize: 25 }}>{window.innerWidth}</div>
            <ul className={s.modal_right_list}>
              <li className={s.item}>
                <p className={s.item_left}>MOQ</p>
                <p className={s.item_right}>{product.moq}</p>
              </li>
              <li className={s.item}>
                <p className={s.item_left}>Starting price</p>
                <p className={s.item_right}>${product.startingPrice}</p>
              </li>
              <li className={s.item}>
                <p className={s.item_left}>Fabric</p>
                <p className={s.item_right}>
                  {product.fabric.map((fabric) => `${fabric.type} `).join(", ")}
                </p>
              </li>
              <li className={s.item}>
                <p className={s.item_left}>Color options</p>
                <p className={s.item_right}>
                  {`Up to ${product.colorOptions} colors`}
                </p>
              </li>
              <li className={s.item}>
                <p className={s.item_left}>Lead time</p>
                <p className={s.item_right}>{product.leadTime}</p>
              </li>
              <li className={s.item}>
                <p className={s.item_left}>Origin</p>
                <p className={s.item_right}>
                  {product?.origin}
                  {/* {"Our production line is in Lisbon, Portugal"} */}
                </p>
              </li>
              <li className={s.item}>
                <p className={s.item_left}>Label option</p>
                <p className={s.item_right}>
                  {/* {"We provide custom labelling"} */}
                  {product?.labelOptions
                    ?.map((lable) => `${lable.type} `)
                    .join(", ")}
                </p>
              </li>
              <li className={s.item}>
                <p className={s.item_left}>Packaging</p>
                <p className={s.item_right}>
                  {/* {product?.pac} */}
                  {"Custom packaging is available  "}
                </p>
              </li>
              <li className={s.item}>
                <p className={s.item_left}>Fading</p>
                <p className={s.item_right}>
                  {product?.fadingOptions
                    ?.map((fading) => `${fading.type} `)
                    .join(", ")}
                  {/* {
                    "We produce Shoulder Sun fading, Shoulder & Bottom Sun fading, Circular Sun fading and All-over Sun fading"
                  } */}
                </p>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalProduct;
