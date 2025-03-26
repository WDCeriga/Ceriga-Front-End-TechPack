import React from "react";

interface ImageSizeDisplayProps {
  selectedSize: string;
}

const ImageSizeDisplay: React.FC<ImageSizeDisplayProps> = ({ selectedSize }) => {
  const defaultImage = "https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-1170x780.jpg";

  const [width, height] = selectedSize
    ? selectedSize.split("x").map(Number)
    : [300, 300];

  return (
    <div>
      <div className="selected-image-container">
        <img
          src={defaultImage}
          alt={`Image of size ${selectedSize || "default"}`}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default ImageSizeDisplay;
