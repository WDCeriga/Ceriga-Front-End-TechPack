import {
  IPrintingItem as IPrinting,
} from "@interfaces/order/printing.interface";
import classNames from "classnames";
import { FC } from "react";

import s from "./item.module.scss";
import routes from "@routes/index";

interface IPrintingItem extends IPrinting {
  isActive: boolean;
  handleClick: (value: string) => void;
}

const PrintingItem: FC<IPrintingItem> = ({
  name,
  imgPath,
  isActive,
  handleClick,
}) => {
  const buttonClassnames = classNames(
    s.item_button,
    isActive && s.item_button__active
  );
  return (
    <li className={s.item}>
      <button onClick={() => handleClick(name)} className={buttonClassnames}>
        <img className={s.item_button_img} src={routes.server.base + imgPath} alt={name} crossOrigin="anonymous" />
        <p className={s.item_button_text}>{name}</p>
      </button>
    </li>
  );
};

export default PrintingItem;
