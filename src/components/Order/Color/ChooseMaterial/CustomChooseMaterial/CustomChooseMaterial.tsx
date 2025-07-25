import { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@redux/store";
import { updateMaterial } from "@redux/slices/order";
import { materialTitle } from "@interfaces/order/material.interface";
import notification from "@services/notification";

import SelectMaterial from "../SelectMaterial/SelectMaterial";
import s from "./customChooseMaterial.module.scss";

interface ICustomChooseMaterial {
  closeEvent: () => void;
}

const CustomChooseMaterial: FC<ICustomChooseMaterial> = ({ closeEvent }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [typeActive, setTypeActive] = useState<string>("Choose material");
  const [customValue, setCustomValue] = useState<string>("");
  const handleTypeActive = (active: string) => {
    setTypeActive(active);
  };
  const handleCustomValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomValue(e.target.value);
  };
  const handleSaveNewValue = () => {
    const parsedValue = Number(customValue);
    if (
      typeActive !== "Choose material" &&
      customValue.length !== 0 &&
      !isNaN(parsedValue)
    ) {
      dispatch(
        updateMaterial({
          name: typeActive as materialTitle,
          value: parsedValue,
          cost: 1
        })
      );
      closeEvent();
    } else {
      notification.error(
        'choose a material and enter custom gsm value'
      );
    }
  };
  return (
    <div className={s.container}>
      <SelectMaterial
        typeActive={typeActive}
        handleUpdateItem={handleTypeActive}
      />
      <input
        value={customValue}
        onChange={handleCustomValueChange}
        className={s.container_input}
        placeholder="Write custom gsm value"
      />
      <button onClick={handleSaveNewValue} className={s.container_btn}>
        Save
      </button>
    </div>
  );
};

export default CustomChooseMaterial;
