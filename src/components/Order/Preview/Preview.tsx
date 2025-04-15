import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "@redux/store";
import { mapOrderStateToParams } from "@services/mapOrderStateToParams ";
import { changeOrderStep } from "@redux/slices/order";
import { getOrderItemApi } from "@api/requests/protected";
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
  const { order } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        console.log("isOrder==>", isOrder);
        console.log("id==>", id);
        if (isOrder && id) {
          const data = await getOrderItemApi(id);
          setPhoto(data.productType || "");
          setColor(data.color.hex);
          const mappedData = await mapOrderStateToParams(data);
          console.log("mappedData==>", mappedData);
          setPreviewData(mappedData);
        } else if (previewData === null) {
          setPhoto(order.productType || "");
          setColor(order.color.hex || "#333");
          const mappedData = await mapOrderStateToParams(order);
          console.log("mappedData52==>", mappedData);
          setPreviewData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    if (!previewData) {
      // Prevent unnecessary API calls if previewData is already set
      fetchOrderData();
    }
  }, [isOrder, id, order]); // Only re-run when isOrder, id, or order changes

  const handlePrevStep = () => {
    if (!isOrder) {
      dispatch(changeOrderStep("package"));
    }
  };

  const handleRedirectProducts = () => {
    navigate(routes.catalog);
  };

  // const handleFinishOrder = async () => {
  //   if (order.draftId) {
  //     try {
  //       const response = await createOrderApi(order.draftId);
  //       if (response.status === 200) {
  //         navigate(routes.orders);
  //       } else {
  //         notification.error("Error creating order");
  //         console.error("Error creating order", response);
  //       }
  //     } catch (error) {
  //       notification.error("Failed to create order");
  //       console.error("Order creation failed", error);
  //     }
  //   }
  // };

  const handleNextStep = async () => {
    dispatch(changeOrderStep("delivery"));
  };

  if (previewData === null) {
    return null; // Prevent rendering if previewData is not yet fetched
  }

  return (
    <>
      <div className={sOrder.left}>
        <div style={{position: "fixed", left: '2%', bottom: '7%'}}>
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
            <ProductWithColor
              color={color}
              product={photo}
              path={order.color.path}
            />
            {/* <ul className={s.preview_left_list}>
            <ParamPreviewSmall
              name="Subtotal"
              value={`${formatCost(order.subtotal)} $`}
            />
            <ParamPreviewSmall name="Shipping" value="0 $" />
            <ParamPreviewSmall
              name="Total"
              value={`${formatCost(order.subtotal)} $`}
            />
            <ParamPreviewSmall name="Production time" value="6 business days" />
          </ul>*/}
          </div>
          <div className={s.preview_right}>
            <TitlePreview product={order.productType || ""} />
            <ul className={s.preview_right_list}>
              {previewData.map(
                (item) => (
                  console.log("item===>", item),
                  (<ParamMainPreview key={item.title} {...item} />)
                )
              )}
            </ul>
          </div>
        </section>
        <div>
          {!isOrder && (
            <ButtonsOrder
              onlyNext={false}
              handlePrevStep={handlePrevStep}
              handleNextStep={handleNextStep}
              isHaveNext={true}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPreview;
