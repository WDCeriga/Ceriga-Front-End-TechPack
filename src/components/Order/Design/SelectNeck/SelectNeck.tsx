import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "@common/Icons/CommonIcon";
import { SettingsIcon } from "@common/Icons/SelectNeck";
import { AppDispatch, RootState } from "@redux/store";
import { setNoLabel } from "@redux/slices/order";

// import CommentSelectNeck from "./Comment/Comment";
import ConfigurationLabel from "./Configuration/Configuration";
import ListSelectNeck from "./List/List";
import s from "./selectNeck.module.scss";
import UploadFile from "../UploadFile/UploadFile";

interface ISelectNeck {
  handleClose: () => void;
}

const SelectNeck: FC<ISelectNeck> = ({ handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { noLabels, type } = useSelector(
    (state: RootState) => state.order.neck
  );
  const { orderType } = useSelector((state: RootState) => state.order);
  // const { neckDescription } = useSelector((state: RootState) => state.order);
  // const [description, setDescription] = useState<string>(neckDescription);
  const [configurationOpen, setConfigurationOpen] = useState<boolean>(false);
  const [isUploadModalOpenNeck, setIsUploadModalOpenNeck] =
    useState<boolean>(false);

  const handleCheckNoLabel = () => {
    dispatch(setNoLabel());
  };

  const handleToggleConfiguration = () => {
    setConfigurationOpen((prev) => !prev);
  };

  const handleOpenUploadModalNeck = () => {
    setIsUploadModalOpenNeck(true); // Open the UploadFile modal
  };

  const handleCloseUploadModalNeck = () => {
    setIsUploadModalOpenNeck(false); // Close the UploadFile modal
  };

  // const handleUpdateDescription = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setDescription(event.currentTarget.value);
  //   dispatch(updateNeckDescription(event.currentTarget.value));
  // };

  // Fetching the product info to check minimum quantity requirement for labels
  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen
  );

  let labelOptionsMinimumQuantity = 0;
  let labelOptionsIsMinimumRequired = false;
  if (noLabels === false && type && orderType == "Custom clothing") {
    let qty = productinfo?.labelOptions?.find(
      (x) => x.type == "Custom Label"
    )?.minimumQuantity;
    if (qty) {
      labelOptionsMinimumQuantity = parseInt(qty.toString());
    }
    let isRequired = productinfo?.labelOptions?.find(
      (x) => x.type == "Custom Label"
    )?.isMinimumRequired;
    if (isRequired) {
      labelOptionsIsMinimumRequired = isRequired;
    }
  } else {
    labelOptionsMinimumQuantity = 0;
    labelOptionsIsMinimumRequired = false;
  }

  if (configurationOpen) {
    return (
      <>
        <ConfigurationLabel handleClose={handleToggleConfiguration} />
      </>
    );
  }

  return (
    <section className={s.content}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {labelOptionsIsMinimumRequired && labelOptionsMinimumQuantity > 0 && (
          <div
            style={{
              marginBottom: "1rem",
              color: "red",
            }}
          >
            The minimum order quantity is {labelOptionsMinimumQuantity}
          </div>
        )}
        <button onClick={handleClose} className={s.content_buttonClose}>
          <CloseIcon width="22" height="22" color="#111" />
        </button>
      </div>

      <label className={s.content_label}>
        <input
          onClick={handleCheckNoLabel}
          className={s.content_label_checkbox}
          type="checkbox"
          checked={noLabels}
        />
        <p className={s.content_label_text}>No Labels</p>
      </label>
      <div className={s.content_top}>
        <h3 className={s.content_top_title}>Select Neck Label Design</h3>
        {/* <button
          onClick={handleToggleConfiguration}
          className={s.content_top_settings}
        >
          <SettingsIcon width="24" height="24" color="#c80f0f" />
        </button> */}
      </div>
      <ListSelectNeck />
      {/* <CommentSelectNeck
        value={description}
        onChange={handleUpdateDescription}
      /> */}

      <div className="uplodefilebtn">
        <div className="buttonforuplode" onClick={handleOpenUploadModalNeck}>
          <p className="uplodebtntext">Upload Neck Label Design</p>
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
      {isUploadModalOpenNeck && (
        <UploadFile
          handleClose={handleCloseUploadModalNeck}
          type="uploadNeck"
        />
      )}
    </section>
  );
};

export default SelectNeck;
