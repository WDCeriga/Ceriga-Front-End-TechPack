import { FC, useState } from "react";
import { ArrowVerticalIcon } from "@common/Icons/NavIcons";
import s from "./selectMaterial.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

interface ISelectMaterial {
  typeActive: string;
  handleUpdateItem: (item: string) => void;
}

const SelectMaterial: FC<ISelectMaterial> = ({ typeActive, handleUpdateItem }) => {
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  const handleToggleSelect = () => setSelectOpen((prev) => !prev);
  const handleSelectItem = (item: string) => {
    handleToggleSelect();
    handleUpdateItem(item);
  };
  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen,
  );

  return (
    <div className={s.container}>
      <button onClick={handleToggleSelect} className={s.selected}>
        <p className={s.selected_text}>{typeActive}</p>
        <ArrowVerticalIcon
          type={selectOpen ? "top" : "bottom"}
          width="10"
          height="6"
          color="#111"
        />
      </button>
      {selectOpen && (
        <ul className={s.list}>
          {productinfo?.fabric?.map(item => (
            <li key={item?.type} className={s.list_item}>
              <button
                onClick={() => handleSelectItem(item?.type)}
                className={s.list_item_button}
              >
                {item?.type}
              </button>
            </li>
          ))}

        </ul>
      )}
    </div>
  );
};

export default SelectMaterial;
