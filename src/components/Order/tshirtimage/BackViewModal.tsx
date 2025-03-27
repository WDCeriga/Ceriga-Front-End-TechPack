import React, { useState } from "react";
import UploadFile from "../Design/UploadFile/UploadFile";
import ImageSizeModal from "./ImageSizeModal";

interface FrontViewModalProps {
  checkcolor?: string;
  onClose: () => void;
}

const BackViewModal: React.FC<FrontViewModalProps> = ({
  // checkcolor = "blue",
}) => {
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);
  const [isUploadModalOpenBack, setIsUploadModalOpenBack] =
    useState<boolean>(false);

  const handleCloseUploadModalBack = () => {
    setIsUploadModalOpenBack(false);
  };

  // const handleLogoChange = (logo: string) => {
  //   setSelectedLogo((prev) => (prev === logo ? null : logo));
  // };

  const handleSizeSelection = (size: string) => {
    if (selectedSize !== size) {
      setSelectedSize(size);
      setIsSizeSelected(true);
    }
  };

  const handleOpenUploadModalBack = () => {
    setIsUploadModalOpenBack(true);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {/* <div className="checkbox-option">
          <input
            type="checkbox"
            checked={selectedLogo === "logo1"}
            onChange={() => handleLogoChange("logo1")}
            className="custom-checkbox"
            id="logo1"
            style={{ accentColor: checkcolor }}
          />
          <label htmlFor="logo1">Logos Redondos</label>
        </div> */}
        {/* <div className="checkbox-option">
          <input
            type="checkbox"
            checked={selectedLogo === "logo2"}
            onChange={() => handleLogoChange("logo2")}
            className="custom-checkbox"
            id="logo2"
            style={{ accentColor: checkcolor }}
          />
          <label htmlFor="logo2">Opcao MaisCara</label>
        </div> */}

        <div>
          <ImageSizeModal
            // isOpen={activeModal === "size"}
            // onClose={() => setActiveModal(null)}
            setSelectedSize={handleSizeSelection}
            selectedSize={selectedSize}
          />
        </div>
      </div>
      <div className="uplodefilebtn">
        <div className="buttonforuplode" onClick={handleOpenUploadModalBack}>
          <p className="uplodebtntext">Upload Front View Design</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: "1rem" }}
          >
            <g clip-path="url(#clip0_1125_851)">
              <path
                d="M8 17L12 21L16 17"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M12 12V21"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M20.8802 18.0899C21.7496 17.4786 22.4015 16.6061 22.7415 15.5991C23.0814 14.5921 23.0916 13.503 22.7706 12.4898C22.4496 11.4766 21.814 10.592 20.9562 9.96449C20.0985 9.33697 19.063 8.9991 18.0002 8.99993H16.7402C16.4394 7.82781 15.8767 6.73918 15.0943 5.81601C14.3119 4.89285 13.3303 4.15919 12.2234 3.67029C11.1164 3.18138 9.91302 2.94996 8.7037 2.99345C7.49439 3.03694 6.31069 3.3542 5.24173 3.92136C4.17277 4.48851 3.2464 5.29078 2.53236 6.26776C1.81833 7.24474 1.33523 8.37098 1.11944 9.56168C0.903647 10.7524 0.960787 11.9765 1.28656 13.142C1.61233 14.3074 2.19824 15.3837 3.00018 16.2899"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_1125_851">
                <rect width="24" height="24" fill="#fff"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      {isUploadModalOpenBack && (
        <UploadFile
          handleClose={handleCloseUploadModalBack}
          type="uploadDesign"
        />
      )}
    </div>
  );
};

export default BackViewModal;
