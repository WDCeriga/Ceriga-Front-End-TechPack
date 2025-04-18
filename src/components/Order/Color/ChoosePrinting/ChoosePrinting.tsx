import { FC} from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "@common/Icons/CommonIcon";
import { AppDispatch, RootState } from "@redux/store";
import { updatePrinting } from "@redux/slices/order";

import PrintingItem from "./Item/Item";
import s from "./choosePrinting.module.scss";

interface IChoosePrinting {
  onClose: () => void;
}

const ChoosePrinting: FC<IChoosePrinting> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { printing ,orderType } = useSelector((state: RootState) => state.order);

  console.log("orderRP====>",useSelector((state: RootState) => state.order))
  const handleChoosePrinting = (value: string) => {
    dispatch(updatePrinting(value));
  };

  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen
  );

  const handleItemClick = (itemName: string) => {
    handleChoosePrinting(itemName);
  };

  const isMinimumRequired = productinfo?.printing?.find(
    (x) => x.type == printing
  )?.isMinimumRequired;

  const minimumquantity = productinfo?.printing?.find(
    (x) => x.type == printing
  )?.minimumQuantity;


  return (
    <section className={s.container}>
      <div className={s.container_group}>
        <h2 className={s.container_group_title}>Printing settings</h2>
        <button onClick={onClose} className={s.container_group_btn}>
          <CloseIcon width="22" height="22" color="#000" />
        </button>
      </div>

      {(orderType === "Custom clothing" && isMinimumRequired) && (
        <p style={{ marginTop: "1.5rem", color: "red", fontSize: "14px" }}>{`Minimum order quantity for ${printing} is ${minimumquantity}`}</p>)
      }

      <ul className={s.container_list} style={{ marginTop: '0.5rem' }}>
        {productinfo?.printing?.map((item) => (
          <PrintingItem
            key={item.type}
            name={item.type}
            imgPath={item.printingImgUrl}
            cost={item.cost}
            isActive={printing === item.type}
            handleClick={handleItemClick}
            isMinimumRequired={item.isMinimumRequired}
            minimumQuantity={item.minimumQuantity}
          />
        ))}
      </ul>
    </section>
  );
};

export default ChoosePrinting;
