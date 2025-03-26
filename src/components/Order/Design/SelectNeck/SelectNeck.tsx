import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "@common/Icons/CommonIcon";
import { SettingsIcon } from "@common/Icons/SelectNeck";
import { AppDispatch, RootState } from "@redux/store";
import { setNoLabel, updateNeckDescription } from "@redux/slices/order";

import CommentSelectNeck from "./Comment/Comment";
import ConfigurationLabel from "./Configuration/Configuration";
import ListSelectNeck from "./List/List";
import s from "./selectNeck.module.scss";

interface ISelectNeck {
  handleClose: () => void;
}

const SelectNeck: FC<ISelectNeck> = ({ handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { noLabels } = useSelector((state: RootState) => state.order.neck);
  const { neckDescription } = useSelector((state: RootState) => state.order);
  const [description, setDescription] = useState<string>(neckDescription);
  const [configurationOpen, setConfigurationOpen] = useState<boolean>(false);

  const handleCheckNoLabel = () => {
    dispatch(setNoLabel());
  };

  const handleToggleConfiguration = () => {
    setConfigurationOpen((prev) => !prev);
  };

  if (configurationOpen) {
    return (
      <>
        <ConfigurationLabel handleClose={handleToggleConfiguration} />
      </>
    );
  }

  const handleUpdateDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.currentTarget.value);
    dispatch(updateNeckDescription(event.currentTarget.value));
  };

  // Fetching the product info to check minimum quantity requirement for labels
  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen
  );
  const labelOptions = productinfo?.labelOptions?.find(
    (x) => x.type === "Custom Label"
  );
  const labelOptionsMinimumQuantity = labelOptions?.minimumQuantity;
  const labelOptionsIsMinimumRequired = labelOptions?.isMinimumRequired;

  return (
    <section className={s.content}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: '100%'
        }}
      >
        {labelOptionsIsMinimumRequired && labelOptionsMinimumQuantity && (
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
        <button
          onClick={handleToggleConfiguration}
          className={s.content_top_settings}
        >
          <SettingsIcon width="24" height="24" color="#c80f0f" />
        </button>
      </div>
      <ListSelectNeck />
      <CommentSelectNeck
        value={description}
        onChange={handleUpdateDescription}
      />
    </section>
  );
};

export default SelectNeck;
