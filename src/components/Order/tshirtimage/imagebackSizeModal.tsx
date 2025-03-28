import React, { useEffect } from "react";
import "./imagesizemodal.scss";
import { useSelector} from "react-redux";
import { RootState } from "@redux/store";

interface ImageSizeModalProps {
  // isOpen: boolean;
  // onClose: () => void;
  setSelectedSize: (size: string) => void;
  selectedSize: string | null;
}

const imagebackSizeModal: React.FC<ImageSizeModalProps> = ({
  // isOpen,
  // onClose,
  setSelectedSize,
  selectedSize,
}) => {
  
  const productinfo = useSelector((state: RootState) => state.products.productOpen );
  const handleSizeClick = (size: string): void => {
    setSelectedSize(size);
  };

 

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="size-grid">

        {productinfo?.backlogo.map((size) => {
            const [width, height] = size.type.split("x").map(Number);
            return (
              <div
                key={size.type}
                className={`size-option ${selectedSize === size.type ? "selected" : ""}`}
                onClick={() => handleSizeClick(size.type)}
              >
                <div
                  className="size-preview"
                  style={{
                    width: `${width / 2.5}px`,
                    height: `${height / 2.5}px`,
                  }}
                ></div>
                <span className="size-label">{size.type +" mm"}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default imagebackSizeModal;
