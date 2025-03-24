import { useState } from "react";
import TitleWithDescription from "@common/Title/Description/Description";
import sOrder from "../order.module.scss";
import { orderDescription } from "@constants/order/text";
import Progress from "@common/Progress/Progress";
// import s from "./TshirtImage.scss";
import ButtonSelect from "@common/ButtonSelect/ButtonSelect";
import SizesSettings from "../Size/Sizes/Sizes";
import ButtonsOrder from "../Buttons/Buttons";
import { useDispatch } from "react-redux";
import { changeOrderStep } from "@redux/slices/order";
import { AppDispatch } from "@redux/store";
import b from "../Size/Sizes/sizes.module.scss";
import DefaultImg from "../DefaultImg/DefaultImg";

const TshirtImage = () => {
  const [sizeOpen, setSizeOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleToggleSize = () => {
    setSizeOpen((prev) => !prev);
  };

  const handlePrevStep = () => {
    dispatch(changeOrderStep("color"));
  };

  const handleNextStep = () => {
    dispatch(changeOrderStep("tshirt"));
  };

  return (
    <>
      <div className={sOrder.left}>
        <TitleWithDescription
          title={orderDescription.timage.title}
          text={orderDescription.timage.text}
        />
        <Progress value={10} />
      </div>

      <div className={sOrder.center}>
        <div>
            {/* <img src="" alt="" /> */}
        </div>
        <div>
          <DefaultImg />
        </div>
      </div>

      <div className={sOrder.right}>
        <div className={b.params}>
          {!sizeOpen && (
            <ButtonSelect onEvent={handleToggleSize} text="images sizes" />
          )}
          {sizeOpen && <SizesSettings handleClose={handleToggleSize} />}
        </div>

        <ButtonsOrder
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          onlyNext={false}
          isHaveNext={true}
        />
      </div>
    </>
  );
};

export default TshirtImage;
