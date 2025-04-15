import { FC, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { orderDescription } from "@constants/order/text";
import routes from "@routes/index";
import { AppDispatch, RootState } from "@redux/store";
import { changeOrderStep } from "@redux/slices/order";
import Progress from "@common/Progress/Progress";
import TitleWithDescription from "@common/Title/Description/Description";
import validationSchemaDelivery from "@validation/delivery";
import { createOrderApi } from "@api/requests/protected";
import notification from "@services/notification";
import { useNavigate } from "react-router-dom";

import ButtonsOrder from "../Buttons/Buttons";
import DeliveryForm from "./Form/Form";
import sOrder from "../order.module.scss";
import s from "./delivery.module.scss";

const OrderDelivery: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { delivery } = useSelector((state: RootState) => state.order);

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isTryContinue, setIsTryContinue] = useState<boolean>(false);

  const { order } = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  const handlePrevStep = () => {
    dispatch(changeOrderStep("preview"));
  };

  const validateDeliveryData = useCallback(
    async (deliveryData: typeof delivery) => {
      try {
        await validationSchemaDelivery.validate(deliveryData, {
          abortEarly: false,
        });
        setValidationErrors({});
        return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const errors: Record<string, string> = {};
        if (err.inner) {
          err.inner.forEach((error: Yup.ValidationError) => {
            if (error.path) {
              errors[error.path] = error.message;
            }
          });
        }
        setValidationErrors(errors);
        return false;
      }
    },
    []
  );
  useEffect(() => {
    const checkValidation = async () => {
      await validateDeliveryData(delivery);
    };
    if (isTryContinue) {
      checkValidation();
    }
  }, [delivery, validateDeliveryData, isTryContinue]);

  const handleFinishOrder = async () => {
    setIsTryContinue(true);
    const isValid = await validateDeliveryData(delivery);
  
    if (!isValid) {
      notification.error("Please fix the validation errors before proceeding.");
      return;
    }
  
    if (order.draftId) {
      try {
        const response = await createOrderApi(order.draftId);
        if (response.status === 200) {
          navigate(routes.orders);
        } else {
          notification.error("Error creating order");
          console.error("Error creating order", response);
        }
      } catch (error) {
        notification.error("Failed to create order");
        console.error("Order creation failed", error);
      }
    } else {
      notification.error("Order draft ID is missing.");
    }
  };
  

  // const handleNextStep = async () => {
  //   setIsTryContinue(true);
  //   const isValid = await validateDeliveryData(delivery);
  //   if (isValid) {
  //     dispatch(changeOrderStep("preview"));
  //   } else {
  //   }
  // };

  return (
    <>
      <div className={sOrder.left}>
        <TitleWithDescription
          title={orderDescription.delivery.title}
          text={orderDescription.delivery.text}
        />
      </div>
      <div className={s.form}>
        <DeliveryForm delivery={delivery} validationErrors={validationErrors} />
      </div>
      <div className={sOrder.right}>
        <div></div>
        <ButtonsOrder
          isHaveNext={true}
          onlyNext={false}
          isFinish={true}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleFinishOrder}
        />
      </div>
    </>
  );
};

export default OrderDelivery;
