import {
  IParamPreviewOrder,
  ISubparametersPreviewTable,
} from "@interfaces/order/paramsPreview.interface";
import { FC } from "react";

import TablePreviewOrder from "../Table/Table";
import SubParamItemOrderPreview from "./SubParamItem/SubParamItem";
import s from "./paramMain.module.scss";

const ParamMainPreview: FC<IParamPreviewOrder> = ({
  title,
  paramsType,
  subparameters,
}) => {
  console.log("title===>", title);
  if (paramsType === "listsize" && Array.isArray(subparameters)) {
    console.log("listsize==>", subparameters);
  }

  return (
    <li className={s.item}>
      <h3 className={s.item_title}>{title}</h3>
      {paramsType === "list" && Array.isArray(subparameters) && (
        <ul className={s.item_subparamets}>
          {subparameters.map((item) => (
            <SubParamItemOrderPreview
              key={item.title}
              {...item}
              issize={false}
            />
          ))}
        </ul>
      )}
      {paramsType === "text" && typeof subparameters === "string" && (
        <p className={s.item_text}>{subparameters}</p>
      )}

      {paramsType === "cost" && typeof subparameters === "string" && (
        <p className={s.item_text}>€ {subparameters}</p>
      )}

      {paramsType === "listsize" && Array.isArray(subparameters) && (
        <ul className={s.item_subparamets}>
          {subparameters.map((item) => (
            <SubParamItemOrderPreview key={item.title} {...item} />
          ))}
        </ul>
      )}
      {paramsType === "table" && Array.isArray(subparameters) && (
        <TablePreviewOrder
          data={subparameters as ISubparametersPreviewTable[]}
        />
      )}
    </li>
  );
};

export default ParamMainPreview;
