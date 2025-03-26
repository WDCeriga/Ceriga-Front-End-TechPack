import { useState } from "react";
import TitleWithDescription from "@common/Title/Description/Description";
import sOrder from "../order.module.scss";
import { orderDescription } from "@constants/order/text";
import Progress from "@common/Progress/Progress";
import ButtonsOrder from "../Buttons/Buttons";
import { useDispatch } from "react-redux";
import { changeOrderStep } from "@redux/slices/order";
import { AppDispatch } from "@redux/store";
import b from "../Size/Sizes/sizes.module.scss";
import DefaultImg from "../DefaultImg/DefaultImg";
import ImageSizeModal from "./ImageSizeModal";
import ImageSizeDisplay from "./ImageSizeDisplay";
import "./TshirtImage.scss";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FrontViewModal from "./FrontViewModal";
import BackViewModal from "./BackViewModal";
import ExtraComments from "./ExtraComments";
import backImage from "./backimage.png";

const TshirtImage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);
  const [userComment, setUserComment] = useState<string>("");

  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false); // Track if Back modal is open
  const [isFrontModalOpen, setIsFrontModalOpen] = useState<boolean>(false); // Track if Front modal is open

  const dispatch = useDispatch<AppDispatch>();

  const handlePrevStep = () => {
    dispatch(changeOrderStep("color"));
  };

  const handleNextStep = () => {
    dispatch(changeOrderStep("tshirt"));
  };

  const toggleExtraCommentsModal = () => {
    setActiveModal(activeModal === "extraComments" ? null : "extraComments");
  };

  const handleSaveComment = (comment: string) => {
    setUserComment(comment);
  };

  const toggleSizeModal = () => {
    setActiveModal(activeModal === "size" ? null : "size");
  };

  const toggleFrontModal = () => {
    if (isSizeSelected) {
      setIsBackModalOpen(false);
      setIsFrontModalOpen(true);
      setActiveModal("front");
    }
  };

  const toggleBackModal = () => {
    if (isSizeSelected) {
      setIsFrontModalOpen(false);
      setIsBackModalOpen(true);
      setActiveModal("back");
    }
  };

  const handleSizeSelection = (size: string) => {
    if (selectedSize !== size) {
      setSelectedSize(size);
      setIsSizeSelected(true);
      setActiveModal("front");
    }
  };

  const getImageForDisplay = () => {
    if (isBackModalOpen) {
      return <img src={backImage} alt="Back View" style={{ height: "30vw" }} />;
    } else if (isFrontModalOpen) {

      return <DefaultImg />;
    } else {
      return <DefaultImg />;
    }
  };

  return (
    <>
      <div className={sOrder.left}>
        <TitleWithDescription
          title={orderDescription.timage.title}
          text={orderDescription.timage.text}
        />
        <Progress value={10} />
      </div>

      <div className={sOrder.center}>
        <div className="movelogoaway">
          <ImageSizeDisplay selectedSize={selectedSize || "300x300"} />
        </div>

        {/* Conditionally render the image based on the modal state */}
        <div>{getImageForDisplay()}</div>
      </div>

      <div className={sOrder.right}>
        <div className={b.params}>
          <div className="tshirt-modal">
            <div className="modal-header">
              <h3>
                {activeModal === "size" ? "Select Image Size" : "Image Size"}
              </h3>
              <div onClick={toggleSizeModal}>
                <IconButton>
                  {activeModal === "size" ? <CloseIcon /> : <AddIcon />}
                </IconButton>
              </div>
            </div>

            <ImageSizeModal
              isOpen={activeModal === "size"}
              onClose={() => setActiveModal(null)}
              setSelectedSize={handleSizeSelection}
              selectedSize={selectedSize}
            />
          </div>

          {isSizeSelected && (
            <div className="tshirt-modal" style={{ marginTop: "3rem" }}>
              <div className="modal-header">
                <h3>
                  {activeModal === "front" ? "Logos" : "Choose Front Logos"}
                </h3>
                <div onClick={toggleFrontModal}>
                  <IconButton>
                    {activeModal === "front" ? <CloseIcon /> : <AddIcon />}
                  </IconButton>
                </div>
              </div>

              {activeModal === "front" && (
                <FrontViewModal
                  checkcolor="#b80e0e"
                  onClose={() => setActiveModal(null)}
                />
              )}
            </div>
          )}

          {isSizeSelected && (
            <div className="tshirt-modal" style={{ marginTop: "3rem" }}>
              <div className="modal-header">
                <h3>
                  {activeModal === "back" ? "Logos" : "Choose Back Logos"}
                </h3>
                <div onClick={toggleBackModal}>
                  <IconButton>
                    {activeModal === "back" ? <CloseIcon /> : <AddIcon />}
                  </IconButton>
                </div>
              </div>

              {activeModal === "back" && (
                <BackViewModal
                  checkcolor="#b80e0e"
                  onClose={() => setActiveModal(null)}
                />
              )}
            </div>
          )}

          <div className="tshirt-modal" style={{ marginTop: "3rem" }}>
            <div className="modal-header">
              <h3>
                {activeModal === "extraComments"
                  ? "Extra Comments"
                  : "Add Extra Comments"}
              </h3>
              <div onClick={toggleExtraCommentsModal}>
                <IconButton>
                  {activeModal === "extraComments" ? (
                    <CloseIcon />
                  ) : (
                    <AddIcon />
                  )}
                </IconButton>
              </div>
            </div>

            {activeModal === "extraComments" && (
              <ExtraComments
                isOpen={activeModal === "extraComments"}
                onClose={() => setActiveModal(null)}
                onSaveComment={handleSaveComment}
              />
            )}
          </div>
        </div>

        <ButtonsOrder
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          onlyNext={false}
          isHaveNext={true}
        />
      </div>
    </>
  );
};

export default TshirtImage;
