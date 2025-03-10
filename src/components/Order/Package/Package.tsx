import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { orderDescription } from "@constants/order/text";
import { AppDispatch, RootState } from "@redux/store";
import { changeOrderStep } from "@redux/slices/order";
import ButtonSelect from "@common/ButtonSelect/ButtonSelect";
import notification from "@services/notification";
import Progress from "@common/Progress/Progress";
import TitleWithDescription from "@common/Title/Description/Description";

import ButtonsOrder from "../Buttons/Buttons";
import FinalPackage from "./FinalPackage/FinalPackage";
import FinalQuantity from "./FinalQuantity/FinalQuantity";
import PackageDetailsForm from "./Form/Form";
import QuantityOrder from "./Quantity/Quantity";
import sOrder from "../order.module.scss";
import s from "./package.module.scss";

const OrderPackage: FC = () => {
  const { moq, quantity, packageUploads, subtotal, minimumQuantity } =
    useSelector((state: RootState) => state.order);
  const packageInfo = useSelector((state: RootState) => state.order.package);
  const [menuOpen, setMenuOpen] = useState({
    packageConfiguration: false,
    quantity: false,
  });
  const dispatch = useDispatch<AppDispatch>();

  const handlePrevStep = () => {
    dispatch(changeOrderStep("design"));
  };
  console.log("minimumQuantity===>", useSelector((state: RootState) => state.order))
  const handleNextStep = () => {
    // if (
    //   quantity.type === "Bulk" &&
    //   quantity.list.reduce((sum, item) => sum + item.value, 0) < moq
    // ) {
    //   notification.error(
    //     "Please select a quantity that meets the minimum order quantity"
    //   );
    // } else {
    //   dispatch(changeOrderStep("delivery"));
    // }


    if (
      quantity.type === "Bulk" &&
      quantity.list.reduce((sum, item) => sum + item.value, 0) < minimumQuantity
    ) {
      notification.error(
        "Please select a quantity that meets the minimum order quantity"
      );
    } else {
      if (quantity.list.reduce((sum, item) => sum + item.value, 0) < minimumQuantity) {
        notification.error(
          "Please select a quantity that meets the minimum order quantity"
        );
      } else {
        dispatch(changeOrderStep("delivery"));
      }
    }
  };
  const handleToggleMenu = (name: keyof typeof menuOpen) => {
    setMenuOpen((prev) => ({
      packageConfiguration: false,
      quantity: false,
      [name]: !prev[name],
    }));
  };

  

  return (
    <>
      <div className={sOrder.left}>
        <TitleWithDescription
          title={orderDescription.package.title}
          text={orderDescription.package.text}
        />
        <Progress value={75} />
      </div>
      <div className={`${sOrder.center} ${s.packageWrap}`}>
        <img src="/img/package.png" alt="package" className={s.packageImg} />
        {subtotal ? (
          <p
            style={{
              position: "absolute",
              left: "45%",
              bottom: 0,
              height: "auto",
            }}
          >
            € {subtotal}
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className={sOrder.right}>
        <div className={s.params}>
          {!menuOpen.packageConfiguration &&
            (packageInfo.isPackage === null ? (
              <ButtonSelect
                onEvent={() => handleToggleMenu("packageConfiguration")}
                text="What Package Would You Want"
              />
            ) : (
              <FinalPackage
                onEvent={() => handleToggleMenu("packageConfiguration")}
                title="Package"
                packageType={packageInfo.isPackage}
                description={packageInfo.description}
                packageItems={packageUploads}
              />
            ))}

          {menuOpen.packageConfiguration && (
            <PackageDetailsForm
              handleClose={() => handleToggleMenu("packageConfiguration")}
            />
          )}

          {!menuOpen.quantity &&
            (quantity.type === null ? (
              <ButtonSelect
                onEvent={() => handleToggleMenu("quantity")}
                text="Quantity"
              />
            ) : (
              <FinalQuantity
                title="Quantity in order"
                onEvent={() => handleToggleMenu("quantity")}
                quantityType={quantity.type}
                quantityList={quantity.list}
              />
            ))}

          {menuOpen.quantity && (
            <QuantityOrder handleClose={() => handleToggleMenu("quantity")} />
          )}
        </div>

        <ButtonsOrder
          isHaveNext={quantity.type !== null && packageInfo.isPackage !== null}
          onlyNext={false}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      </div>
    </>
  );
};

export default OrderPackage;
