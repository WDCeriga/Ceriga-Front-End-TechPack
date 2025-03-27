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
import "./TshirtImage.scss";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FrontViewModal from "./FrontViewModal";
import BackViewModal from "./BackViewModal";
import ExtraComments from "./ExtraComments";
import ImageSizeDisplay from "./ImageSizeDisplay";

const TshirtImage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  // const [selectedSize, setSelectedSize] = useState<string | null>(null);
  // const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);
  const [userComment, setUserComment] = useState<string>("");

  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false);
  const [isFrontModalOpen, setIsFrontModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handlePrevStep = () => {
    dispatch(changeOrderStep("color"));
  };

  const handleNextStep = () => {
    dispatch(changeOrderStep("design"));
  };

  const toggleExtraCommentsModal = () => {
    setActiveModal(activeModal === "extraComments" ? null : "extraComments");
  };

  const handleSaveComment = (comment: string) => {
    setUserComment(comment);
  };

  // const toggleSizeModal = () => {
  //   setActiveModal(activeModal === "size" ? null : "size");
  // };

  const toggleFrontModal = () => {
    setIsBackModalOpen(false);
    setIsFrontModalOpen(true);
    setActiveModal("front");
  };

  const toggleBackModal = () => {
    setIsFrontModalOpen(false);
    setIsBackModalOpen(true);
    setActiveModal("back");
  };

  // const handleSizeSelection = (size: string) => {
  //   if (selectedSize !== size) {
  //     setSelectedSize(size);
  //     setIsSizeSelected(true);
  //     setActiveModal("front");
  //   }
  // };

  // const getImageForDisplay = () => {
  //   if (isBackModalOpen) {
  //     return <img src={backImage} alt="Back View" style={{ height: "30vw" }} />;
  //   } else if (isFrontModalOpen) {
  //     return <DefaultImg />;
  //   } else {
  //     return <DefaultImg />;
  //   }
  // };

  return (
    <>
      <div className={sOrder.left}>
        <TitleWithDescription
          title={orderDescription.timage.title}
          text={orderDescription.timage.text}
        />
        <Progress value={40} />
      </div>

      <div className={sOrder.center}>
        <div className="movelogoaway">
          {/* <ImageSizeDisplay selectedSize={selectedSize || "300x300"} /> */}
        </div>
        <div>
          <DefaultImg />
        </div>
      </div>

      <div className={sOrder.right}>
        <div className={b.params}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "end",
            }}
          >
            <div className="tshirt-modal" style={{ marginTop: "3rem" }}>
              <div
                className={`modal-header ${
                  activeModal === "front" ? "no-border" : "with-border"
                }`}
              >
                <h3>
                  {activeModal === "front" ? "Logos" : "Choose Front Logos"}
                </h3>
                <div onClick={toggleFrontModal}>
                  <IconButton>
                    {activeModal === "front" ? (
                      <HighlightOffIcon className="highlighticon" />
                    ) : (
                      <AddIcon className="highlighticon" />
                    )}
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

            <div className="tshirt-modal" style={{ marginTop: "3rem" }}>
              <div
                className={`modal-header ${
                  activeModal === "back" ? "no-border" : "with-border"
                }`}
              >
                <h3>
                  {activeModal === "back" ? "Logos" : "Choose Back Logos"}
                </h3>
                <div onClick={toggleBackModal}>
                  <IconButton>
                    {activeModal === "back" ? (
                      <HighlightOffIcon className="highlighticon" />
                    ) : (
                      <AddIcon className="highlighticon" />
                    )}
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

            <div className="tshirt-modal" style={{ marginTop: "3rem" }}>
              <div
                className={`modal-header ${
                  activeModal === "extraComments" ? "no-border" : "with-border"
                }`}
              >
                <h3>
                  {activeModal === "extraComments"
                    ? "Extra Comments"
                    : "Add Extra Comments"}
                </h3>
                <div onClick={toggleExtraCommentsModal}>
                  <IconButton>
                    {activeModal === "extraComments" ? (
                      <HighlightOffIcon className="highlighticon" />
                    ) : (
                      <AddIcon className="highlighticon" />
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
