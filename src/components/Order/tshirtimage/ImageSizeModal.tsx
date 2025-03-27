import React, { useEffect } from "react";
import "./imagesizemodal.scss";

interface ImageSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedSize: (size: string) => void;
  selectedSize: string | null;
}

const ImageSizeModal: React.FC<ImageSizeModalProps> = ({
  isOpen,
  onClose,
  setSelectedSize,
  selectedSize,
}) => {
  const sizes = [
    { label: "65x15 mm", value: "65x15" },
    { label: "45x45 mm", value: "45x45" },
    { label: "30x20 mm", value: "30x20" },
    { label: "30x30 mm", value: "30x30" },
    { label: "30x40 mm", value: "30x40" },
    { label: "40x50 mm", value: "40x50" },
    { label: "200x200 mm", value: "200x200" },
  ];

  useEffect(() => {
    if (!selectedSize) {
      setSelectedSize("65x15");
    }
  }, [selectedSize, setSelectedSize]);

  const handleSizeClick = (size: string): void => {
    setSelectedSize(size);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="size-grid">
          {sizes.map((size) => {
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
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageSizeModal;
