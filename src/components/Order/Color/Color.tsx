import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { orderDescription } from "@constants/order/text";
import { AppDispatch, RootState } from "@redux/store";
import { changeOrderStep } from "@redux/slices/order";
import ButtonSelect from "@common/ButtonSelect/ButtonSelect";
import Progress from "@common/Progress/Progress";
import TitleWithDescription from "@common/Title/Description/Description";
import ButtonsOrder from "../Buttons/Buttons";
import DefaultImg from "../DefaultImg/DefaultImg";
import ChooseColor from "./ChooseColor/ChooseColor";
import ChooseMaterial from "./ChooseMaterial/ChooseMaterial";
import ChoosePrinting from "./ChoosePrinting/ChoosePrinting";
import FinalColor from "./FinalColor/FinalColor";
import FinalMaterial from "./FinalMaterial/FinalMaterial";
import FinalPrinting from "./FinalPrinting/FinalPrinting";
import sOrder from "../order.module.scss";
import s from "./color.module.scss";

const OrderColor: FC = () => {
  const { color, material, dyeStyle, printing, subtotal } = useSelector(
    (state: RootState) => state.order
  );
  const dispatch = useDispatch<AppDispatch>();
  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen
  );

  const [menuState, setMenuState] = useState({
    materialIsOpen: false,
    colorIsOpen: false,
    printingIsOpen: false,
  });

  const handleToggleMenu = (name: keyof typeof menuState) => {
    setMenuState((prev) => ({
      materialIsOpen: false,
      colorIsOpen: false,
      printingIsOpen: false,
      [name]: !prev[name],
    }));
  };

  const handlePrevStep = () => {
    dispatch(changeOrderStep("size"));
  };

  const handleNextStep = () => {
    dispatch(changeOrderStep("design"));
  };

  const isMinimumRequired = productinfo?.printing?.find(
    (x) => x.type == printing
  )?.isMinimumRequired;
  return (
    <>
      <div className={sOrder.left}>
        <TitleWithDescription
          title={orderDescription.colorAndFabric.title}
          text={orderDescription.colorAndFabric.text}
        />
        <Progress value={20} />
      </div>
      <div>
        {isMinimumRequired ? (
          <p
            style={{
              position: "absolute",
              top: "10%",
              right: "25%",
              color: "red",
            }}
          >
            {/* The minimum order quantity is {minimumQuantity} */}
          </p>
        ) : (
          <></>
        )}
      </div>
      {subtotal ? (
          <p
            style={{
              position: "absolute",
              top: "5.5%",
              right: "47.5%",
              fontSize: "20px",
              border: "1px solid black",
              padding: "15px",
              borderEndStartRadius: "10px",
              borderEndEndRadius: "10px"
            }}
          >
            € {subtotal}
          </p>
        ) : (
          <></>
        )}
      <div className={sOrder.center}>
        {/* {isMinimumRequired ? (
          <p
            style={{
              color: "red",
              position: "absolute",
              right: 0,
              top: "-5vw",
              height: "auto",
            }}
          >
            The minimum order quantity is {minimumQuantity}
          </p>
        ) : (
          <></>
        )} */}
        <DefaultImg />
      </div>
      <div className={sOrder.right}>
        <div className={s.params}>
          {/* <RenderMaterial />
          <RenderColor />
          <RenderPrinting /> */}
          {!menuState.materialIsOpen &&
            (material.name === null || material.value === null ? (
              <ButtonSelect
                onEvent={() => handleToggleMenu("materialIsOpen")}
                text="Choose a fabric"
              />
            ) : (
              <FinalMaterial
                title="Selected fabric"
                materialName={material.name}
                materialValue={material.value}
                onEvent={() => handleToggleMenu("materialIsOpen")}
              />
            ))}

          {menuState.materialIsOpen && (
            <ChooseMaterial
              closeEvent={() => handleToggleMenu("materialIsOpen")}
            />
          )}

          {!menuState.colorIsOpen &&
            (color.hex === null && dyeStyle === null ? (
              <ButtonSelect
                onEvent={() => handleToggleMenu("colorIsOpen")}
                text="Choose a color"
              />
            ) : (
              <FinalColor
                title="Selected color"
                color={color.hex || ""}
                dyeStyle={dyeStyle || ""}
                onEvent={() => handleToggleMenu("colorIsOpen")}
              />
            ))}

          {menuState.colorIsOpen && (
            <ChooseColor closeEvent={() => handleToggleMenu("colorIsOpen")} />
          )}

          {!menuState.printingIsOpen &&
            (printing === null ? (
              <ButtonSelect
                onEvent={() => handleToggleMenu("printingIsOpen")}
                text="Choose printing"
              />
            ) : (
              <FinalPrinting
                title="Selected Printing"
                printingValue={printing}
                onEvent={() => handleToggleMenu("printingIsOpen")}
              />
            ))}

          {menuState.printingIsOpen && (
            <ChoosePrinting
              onClose={() => handleToggleMenu("printingIsOpen")}
            />
          )}
        </div>
        <ButtonsOrder
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          onlyNext={false}
          isHaveNext={material.name !== null}
        />
      </div>
    </>
  );
};

export default OrderColor;
