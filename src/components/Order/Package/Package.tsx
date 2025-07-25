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
  const {
    moq,
    quantity,
    packageUploads,
    subtotal,
    minimumQuantity,
    totalcost,
    orderType,
  } = useSelector((state: RootState) => state.order);
  const packageInfo = useSelector((state: RootState) => state.order.package);

  const totalqty = quantity.list.reduce((sum, item) => sum + item.value, 0);
  const [menuOpen, setMenuOpen] = useState({
    packageConfiguration: false,
    quantity: false,
  });
  const dispatch = useDispatch<AppDispatch>();

  const handlePrevStep = () => {
    dispatch(changeOrderStep("tshirt"));
  };

  const handleNextStep = () => {
    const totalQuantity = quantity.list.reduce(
      (sum, item) => sum + item.value,
      0
    );

    if (totalQuantity === 0) {
      notification.error("Please select at least one quantity.");
      return;
    }

    if (
      (orderType === "Custom clothing" || quantity.type === "Bulk") &&
      totalQuantity < minimumQuantity
    ) {
      notification.error(
        `Please select a quantity that meets the minimum order quantity of ${minimumQuantity}.`
      );
      return;
    }

    dispatch(changeOrderStep("preview"));
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
        <Progress value={70} />
      </div>
      {subtotal !== undefined && subtotal !== null ? (
        <p
          style={{
            position: "absolute",
            top: "50px",
            right: "49%",
            fontSize: "20px",
            border: "1px solid black",
            padding: "15px",
            borderEndStartRadius: "10px",
            borderEndEndRadius: "10px",
          }}
        >
          €{orderType === "Custom clothing"
            ? totalqty > 1
              ? (parseFloat(subtotal.toString()) * totalqty).toFixed(2)
              : parseFloat(subtotal.toString()).toFixed(2)
            : parseFloat(subtotal.toString()).toFixed(2)}
        </p>
      ) : (
        <></>
      )}
      <div className={`${sOrder.center} ${s.packageWrap}`}>
        <img src="/img/package.png" alt="package" className={s.packageImg} />
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
