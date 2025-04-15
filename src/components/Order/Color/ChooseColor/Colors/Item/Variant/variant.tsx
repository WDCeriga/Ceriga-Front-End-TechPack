import classNames from "classnames";
import { FC } from "react";
import { useDispatch } from "react-redux";

import { IColorType } from "@interfaces/bll/colors.interface";
import { AppDispatch } from "@redux/store";
import { updateColor } from "@redux/slices/order";

import s from "./variant.module.scss";

interface IColorVariant extends IColorType {
  isActiveColor: boolean;
  colortype: string;
}

const ColorVariant: FC<IColorVariant> = ({
  hexValue,
  path,
  name,
  cost,
  isActiveColor,
  colortype,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(
      updateColor({
        colorHex: hexValue,
        path: path,
        name: name,
        cost: cost,
        colortype: colortype,
      })
    );
  };
  const buttonClassNames = classNames(
    s.container_block,
    isActiveColor && s.container_block__active
  );
  return (
    <li className={s.container}>
      <button
        onClick={handleClick}
        className={buttonClassNames}
        style={{ background: hexValue }}
      ></button>
      {/* <p>(€{cost ? cost : 0})</p> */}
    </li>
  );
};

export default ColorVariant;
