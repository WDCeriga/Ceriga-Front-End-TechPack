import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@redux/store";

import ColorItem from "./Item/Item";
import s from "./colors.module.scss";

const Colors: FC = () => {
  const { list } = useSelector((state: RootState) => state.colors);
  const { material, color } = useSelector((state: RootState) => state.order);


  const getFilteredColors = () => {
    const gsm = material.value || 0;

    const allColors = list;

    if (gsm >= 250) {
      return allColors;
      // return allColors.filter((item) => colors5.includes(item.color));
    } else if (gsm >= 200) {
      return allColors;
      //  return allColors.filter((item) => colors7.includes(item.color));
    } else {
      return allColors;
    }
  };

  const filteredColors = getFilteredColors();

  return (
    <ul className={s.list}>
      {filteredColors.map((colorItem) => (
        <ColorItem
          activeColor={color.hex}
          key={colorItem.color}
          {...colorItem}
        />
      ))}
    </ul>
  );
};

export default Colors;
