import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "@redux/store";
import { mapOrderStateToParams } from "@services/mapOrderStateToParams ";
import { changeOrderStep } from "@redux/slices/order";
import {
  getOrderItemApi,
  generatePdfApi,
  paymentGenerateApi,
  createOrderTechPackApi,
} from "@api/requests/protected";
import { IParamPreviewOrder } from "@interfaces/order/paramsPreview.interface";
import ButtonSelect from "@common/ButtonSelect/ButtonSelect";
// import formatCost from "@services/ formatCost";
// import notification from "@services/notification";
import routes from "@routes/index";
import TitleWithDescription from "@common/Title/Description/Description";

import ButtonsOrder from "../Buttons/Buttons";
import ProductWithColor from "../ProductWithColor/ProductWithColor";
import ParamMainPreview from "./ParamMain/ParamMain";
// import ParamPreviewSmall from "./ParamSmall/ParamSmall";
import TitlePreview from "./Title/Title";
import s from "./preview.module.scss";
import sOrder from "../order.module.scss";
import Progress from "@common/Progress/Progress";
import notification from "@services/notification";
import SizeTable from "../Size/Sizes/Table/Table";
import { Loading } from "notiflix";

interface IOrderPreview {
  isOrder?: boolean;
  id?: string;
}

const OrderPreview: FC<IOrderPreview> = ({ isOrder, id }) => {
  const [photo, setPhoto] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [previewData, setPreviewData] = useState<IParamPreviewOrder[] | null>(
    null
  );
  const [orderId, setOrderId] = useState<number>();
  const { orderType } = useSelector((state: RootState) => state.order);
  const { order } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        if (isOrder && id) {
          Loading.standard();
          const data = await getOrderItemApi(id);
          console.log("data===Orderre===>", data);
          setPhoto(data.productType || "");
          setColor(data.color.hex);
          const mappedData = await mapOrderStateToParams(data);
          setPreviewData(mappedData);
          Loading.remove();
        } else if (previewData === null) {
          setPhoto(order.productType || "");
          setColor(order.color.hex || "#333");
          console.log("data===previewData===>", order);
          const mappedData = await mapOrderStateToParams(order);
          setPreviewData(mappedData);
          Loading.remove();
        } else {
          console.log("data===previewData=dsf==>", previewData);
          Loading.remove();
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
        Loading.remove();
      }
    };

    if (!previewData) {
      fetchOrderData();
    }
  }, [isOrder, id, order]);

  const handlePrevStep = () => {
    if (!isOrder) {
      dispatch(changeOrderStep("package"));
    }
  };

  const handleRedirectProducts = () => {
    navigate(routes.catalog);
  };

  const handleNextStep = async () => {
    dispatch(changeOrderStep("delivery"));
  };

  const handleFinishOrder = async () => {
    console.log("orderId=====>", orderId);
    if (orderId) {
      handlePay(orderId);
    } else {
      if (order.draftId) {
        Loading.standard();
        try {
          const response = await createOrderTechPackApi(order.draftId);
          if (response.status === 200) {
            setOrderId(response.data.orderId);
            handlePay(response.data.orderId);
          } else {
            notification.error("Error creating order");
            console.error("Error creating order", response);
            Loading.remove();
          }
        } catch (error) {
          notification.error("Failed to create order");
          console.error("Order creation failed", error);
          Loading.remove();
        }
      } else {
        notification.error("Order draft ID is missing.");
      }
    }
  };

  const handlePay = async (id: number) => {
    const data = await paymentGenerateApi(id, true);
    window.location.href = data.url;
    Loading.remove();
  };

  if (previewData === null) {
    return null; // Prevent rendering if previewData is not yet fetched
  }

  const handleDownloadPDF = async () => {
    let idToUse = isOrder && id ? id : order?.draftId;
    let isOrderFlag = !!(isOrder && id);
    if (!idToUse) return;
    try {
      Loading.standard();
      const response = await generatePdfApi(idToUse, isOrderFlag);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${isOrderFlag ? "order" : "draft"}-${idToUse}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      Loading.remove();
    } catch (error) {
      console.error("PDF download error:", error);
      Loading.remove();
    }
  };

  return (
    <>
      <div className={sOrder.left}>
        <div style={{ position: "fixed", left: "2%", bottom: "7%" }}>
          <Progress value={90} />
        </div>
      </div>
      <div className={s.container}>
        <div className={s.top}>
          <TitleWithDescription title="Order Preview" text="" />
          <ButtonSelect
            onEvent={handleRedirectProducts}
            text="Configure another product"
          />
        </div>
        <section className={s.preview}>
          <div
            className={s.preview_left}
            style={{
              paddingTop: "100px", // Add padding
            }}
          >
            {/* {orderType !== "Custom clothing" ? (
              <section className={s.preview_gifContainer}>
                <img
                  src="/img/static-product.gif" // <-- Place your GIF in the public/img folder
                  alt="Static Product"
                  width={500}
                  height={500}
                  style={{ objectFit: "contain" }}
                />
              </section>
            ) : ( */}
              <ProductWithColor
                color={color}
                product={photo}
                path={order.color.path}
                showStaticGif={orderType !== "Custom clothing"}
              />
            {/* )} */}
            {/* {orderType !== "Custom clothing" && (
              <div
                className={s.uplodefilebtn}
                style={{
                  alignSelf: "center",
                  justifySelf: "flex-start",
                  marginBottom: 100,
                }}
              >
                <div className="buttonforuplode" onClick={handleDownloadPDF}>
                  <p className="uplodebtntext">Download pdf</p>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "1rem" }}
                  >
                    <g clipPath="url(#clip0_1125_851)">
                      <path
                        d="M8 17L12 21L16 17"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12 12V21"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M20.8802 18.0899C21.7496 17.4786 22.4015 16.6061 22.7415 15.5991C23.0814 14.5921 23.0916 13.503 22.7706 12.4898C22.4496 11.4766 21.814 10.592 20.9562 9.96449C20.0985 9.33697 19.063 8.9991 18.0002 8.99993H16.7402C16.4394 7.82781 15.8767 6.73918 15.0943 5.81601C14.3119 4.89285 13.3303 4.15919 12.2234 3.67029C11.1164 3.18138 9.91302 2.94996 8.7037 2.99345C7.49439 3.03694 6.31069 3.3542 5.24173 3.92136C4.17277 4.48851 3.2464 5.29078 2.53236 6.26776C1.81833 7.24474 1.33523 8.37098 1.11944 9.56168C0.903647 10.7524 0.960787 11.9765 1.28656 13.142C1.61233 14.3074 2.19824 15.3837 3.00018 16.2899"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_1125_851">
                        <rect width="24" height="24" fill="#fff"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            )} */}
          </div>
          <div className={s.preview_right}>
            <TitlePreview product={order.productType || ""} />
            <h4 className={s.preview_right_fitSize}>Fit Size</h4>
            <SizeTable isPreview={true} sizes={order.tableSize} />
            <ul className={s.preview_right_list}>
              {previewData.map((item) => (
                <ParamMainPreview key={item.title} {...item} />
              ))}
            </ul>
          </div>
        </section>
        <div style={{ paddingBottom: 20 }}>
          {!isOrder && (
            <ButtonsOrder
              onlyNext={false}
              handlePrevStep={handlePrevStep}
              handleNextStep={() => {
                orderType === "Custom clothing"
                  ? handleNextStep()
                  : handleFinishOrder();
              }}
              isHaveNext={true}
              isPay={orderType === "Custom clothing" ? false : true}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPreview;
