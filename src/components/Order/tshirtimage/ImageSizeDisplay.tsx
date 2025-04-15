import React from "react";

interface ImageSizeDisplayProps {
  selectedSize: string;
}

const ImageSizeDisplay: React.FC<ImageSizeDisplayProps> = ({ selectedSize }) => {
  const defaultImage = "https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-2939.jpg?t=st=1742987257~exp=1742990857~hmac=ca7c44769af3e538edcb58942179018ede841b9b93a3f3626b255f14b4247570&w=996";

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
