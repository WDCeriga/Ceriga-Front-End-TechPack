import React, { useEffect } from "react";
import "./imagesizemodal.scss";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

interface ImageSizeModalProps {
  // isOpen: boolean;
  // onClose: () => void;
  setSelectedSize: (size: string) => void;
  selectedSize: string | null;
}

const ImageSizeModal: React.FC<ImageSizeModalProps> = ({
  // isOpen,
  // onClose,
  setSelectedSize,
  selectedSize,
}) => {
  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen
  );

  // useEffect(() => {
  //   if (!selectedSize) {
  //     setSelectedSize("65x15");
  //   }
  // }, [selectedSize, setSelectedSize]);

  const handleSizeClick = (size: string): void => {
    setSelectedSize(size);
  };

  // if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="size-grid">
          {productinfo?.frontlogo.map((size) => {
            const [width, height] = size.type.split("x").map(Number);
            return (
              <div
                key={size.type}
                className={`size-option ${
                  selectedSize === size.type ? "selected" : ""
                }`}
                onClick={() => handleSizeClick(size.type)}
              >
                <div
                  className="size-preview"
                  style={{
                    width: `${width / 2.5}px`,
                    height: `${height / 2.5}px`,
                  }}
                ></div>
                {size?.type === "No Design" ? (
                  <span className="size-label">{size?.type}</span>
                ) : (
                  <span className="size-label">{size?.type + " mm"}</span>
                )}
              </div>
            );
          })}
          {/* {sizes.map((size) => {
            const [width, height] = size.value.split("x").map(Number);
            return (
              <div
                key={size.value}
                className={`size-option ${selectedSize === size.value ? "selected" : ""}`}
                onClick={() => handleSizeClick(size.value)}
              >
                <div
                  className="size-preview"
                  style={{
                    width: `${width / 2.5}px`,
                    height: `${height / 2.5}px`,
                  }}
                ></div>
                <span className="size-label">{size.label}</span>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default ImageSizeModal;
