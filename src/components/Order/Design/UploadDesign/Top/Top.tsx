import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "@common/Icons/CommonIcon";
import { AppDispatch, RootState } from "@redux/store";
import { changeStitchingType } from "@redux/slices/order";

import CheckboxUploadDesign from "./Checkbox/Checkbox";
import s from "./top.module.scss";

interface IUploadDesignTop {
  handleClose: () => void;
}

const UploadDesignTop: FC<IUploadDesignTop> = ({ handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { type } = useSelector((state: RootState) => state.order.stitching);
  const handleChangeActiveType = (newParam: string) => {
    dispatch(changeStitchingType(newParam));
  };

  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen
  );

  // Fetch the minimum quantity requirement for the stitching options
  const stitchingOption = productinfo?.stitchingOptions?.find(
    (item) => item.type === type
  );
  const stitchingMinimumQuantity = stitchingOption?.minimumQuantity;
  const stitchingIsMinimumRequired = stitchingOption?.isMinimumRequired;

  return (
    <div className={s.top}>
      <ul className={s.top_list}>
        {stitchingIsMinimumRequired && stitchingMinimumQuantity && (
          <div
            style={{
              marginBottom: "1rem",
              color: "red",
              textAlign: "center",
            }}
          >
            The minimum order quantity is {stitchingMinimumQuantity}
          </div>
        )}
        {productinfo?.stitchingOptions?.map((item) => (
          <CheckboxUploadDesign
            handleChange={handleChangeActiveType}
            isActive={item.type === type}
            key={item.type}
            name={item.type}
            id={item.type}
          />
        ))}
      </ul>

      {/* Render the message if the minimum quantity is required */}

      <button onClick={handleClose} className={s.top_closeButton}>
        <CloseIcon width="22" height="22" color="#111" />
      </button>
    </div>
  );
};

export default UploadDesignTop;
