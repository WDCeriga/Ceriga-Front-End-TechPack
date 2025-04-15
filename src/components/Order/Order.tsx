import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@redux/store";
import {
  createNewDraft,
  setSubtotal,
  updateColor,
  setMinimumQuantity,
  setTotalcost,
} from "@redux/slices/order";
import { updateDraftApi } from "@api/requests/protected";
import { getColorsForProduct } from "@redux/slices/colors";

import OrderColor from "./Color/Color";
import OrderDelivery from "./Delivery/Delivery";
import OrderDesign from "./Design/Design";
import OrderLayout from "./Layout/Layout";
import OrderPackage from "./Package/Package";
import OrderPreview from "./Preview/Preview";
import OrderSize from "./Size/Size";
import s from "./order.module.scss";
import { getProductInfobyName } from "@redux/slices/products";
// import { continueOrder } from "@redux/slices/order";
// import { initialState as firstState } from "@constants/order/initialState";
import { IOrderState } from "../../interfaces/bll/order.interface";
import { continueOrderApi } from "@api/requests/protected";
import TshirtImage from "./tshirtimage/TshirtImage";
// const initialState: IOrderState = firstState;
const Order: FC = () => {
  const hasCreatedDraft = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const { order } = useSelector((state: RootState) => state);
  const { product, list } = useSelector((state: RootState) => state.colors);
  const { orderStep, draftId } = order;
  // const packageInfo = useSelector((state: RootState) => state.order.package);

  
  useEffect(() => {
    if (order.productType) {
      dispatch(getProductInfobyName(order.productType || ""));
    }
  }, [order.productType, dispatch]);

  useEffect(() => {
    if (orderStep === null) {
      window.location.href = "/";
    }
  }, [orderStep]);

  useEffect(() => {
    console.log("product==>", product);
    const handleUpdateOrder = async () => {
      const subtotal = await updateDraftApi(order);
      if (subtotal) {
        getorderqty(draftId?.toString());
        dispatch(setSubtotal(subtotal));
      }
    };

    if (draftId === null && !hasCreatedDraft.current) {
      dispatch(createNewDraft({ draft: order }));
      hasCreatedDraft.current = true;
    } else if (draftId) {
      handleUpdateOrder();
    }
  }, [dispatch, order, draftId]);

  const getorderqty = async (id: any) => {
    console.log(id);
    if (id != null && id !== "" && id !== null) {
      const data: IOrderState = await continueOrderApi(id);
      dispatch(
        setMinimumQuantity(data?.minimumQuantity ? data?.minimumQuantity : 1)
      );
      dispatch(setTotalcost(data?.totalcost ? data?.totalcost : 0));
    }
  };

  useEffect(() => {
    if (product === null && order.productType) {
      dispatch(getColorsForProduct(order.productType));
    }
  }, [dispatch, order.productType, product]);

  useEffect(() => {
    if (list.length > 0 && !order.color.hex) {
      const correctColor = list.find((item) => item.color === "white");
      const correctVariant = correctColor?.types.find(
        (item) => item.name === "Off"
      );

      if (correctVariant) {
        dispatch(
          updateColor({
            colorHex: correctVariant.hexValue,
            path: correctVariant.path,
            name: correctVariant.name,
            cost: correctVariant.cost,
            colortype: correctColor ? correctColor?.color : "",
          })
        );
      }
    }
  }, [dispatch, list, order.color.hex]);

  const renderOrderStep = () => {
    console.log(
      "Current orderStep =======================================> ",
      orderStep
    );
    switch (orderStep) {
      case "size":
        return <OrderSize />;
      case "color":
        return <OrderColor />;
      case "tshirt":
        return <TshirtImage />;
      case "design":
        return <OrderDesign />;
      case "package":
        return <OrderPackage />;
      case "preview":
        return <OrderPreview />;
      case "delivery":
        return <OrderDelivery />;
      default:
        return null;
    }
  };

  return (
    <section className={s.content}>
      <OrderLayout>{renderOrderStep()}</OrderLayout>
    </section>
  );
};

export default Order;
