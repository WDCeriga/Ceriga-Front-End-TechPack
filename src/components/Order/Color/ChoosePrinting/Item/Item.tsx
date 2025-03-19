import { IPrintingItem as IPrinting } from "@interfaces/order/printing.interface";
import classNames from "classnames";
import { FC } from "react";
import s from "./item.module.scss";
import routes from "@routes/index";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

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

  const tooltipContent = "Minimum order quantity is 50";

  return (
    <li className={s.item} style={{ position: "relative" }}>
      <button onClick={() => handleClick(name)} className={buttonClassnames}>
        <img
          className={s.item_button_img}
          src={routes.server.base + imgPath}
          alt={name}
          crossOrigin="anonymous"
        />
        <p className={s.item_button_text}>{name}</p>
      </button>

      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip
            id={`tooltip-${name}`}
            style={{
              fontSize: "10px",
              color: "#fff",
              backgroundColor: "#e33c12",
              padding: "8px 12px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              maxWidth: "200px",
              textAlign: "center",
              position: "relative",
            }}
          >
            {tooltipContent}
            <div
              style={{
                content: "''",
                position: "absolute",
                top: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: "8px solid #e33c12",
              }}
            />
          </Tooltip>
        }
      >
        <div
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            cursor: "pointer",
          }}
        >
          <InfoIcon style={{ fontSize: "14px", color: "#444" }} />
        </div>
      </OverlayTrigger>
    </li>
  );
};

export default PrintingItem;
