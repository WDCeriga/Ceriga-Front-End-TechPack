import { useEffect, useState } from "react";
import TitleWithDescription from "@common/Title/Description/Description";
import sOrder from "../order.module.scss";
import { orderDescription } from "@constants/order/text";
import Progress from "@common/Progress/Progress";
import ButtonsOrder from "../Buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderStep } from "@redux/slices/order";
import { AppDispatch, RootState } from "@redux/store";
import b from "../Size/Sizes/sizes.module.scss";
import DefaultImg from "../DefaultImg/DefaultImg";
import "./TshirtImage.scss";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FrontViewModal from "./FrontViewModal";
import BackViewModal from "./BackViewModal";
import ExtraComments from "./ExtraComments";
import ItemFinalDesign from "../Common/Item/Item";
import routes from "@routes/index";
import { Stage, Layer, Rect, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

const TshirtImage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { order } = useSelector((state: RootState) => state);
  const { subtotal } = useSelector((state: RootState) => state.order);
  const [imagefrontSize, setImagefrontSize] = useState({
    width: 500,
    height: 500,
  });
  const [imagebackSize, setImagebackSize] = useState({
    width: 500,
    height: 500,
  });

  const frontsize = order?.logodetails?.frontlogo ?? "";
  const backsize = order?.logodetails?.backlogo ?? "";
  const extradescription = order?.logodetails?.description ?? "";

  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen
  );

  const frontimageurl = frontsize
    ? productinfo?.frontlogo.find((x) => x.type == frontsize)?.frontlogoImgUrl
    : "";

  const frontstickers = frontsize
    ? productinfo?.frontlogo.find((x) => x.type == frontsize)
    : "";

  const backstickers = backsize
    ? productinfo?.backlogo.find((x) => x.type == backsize)
    : "";

  const backimageurl = backsize
    ? productinfo?.backlogo.find((x) => x.type == backsize)?.backlogoImgUrl
    : "";

  const handlePrevStep = () => {
    dispatch(changeOrderStep("design"));
  };

  const handleNextStep = () => {
    dispatch(changeOrderStep("package"));
  };

  const toggleExtraCommentsModal = () => {
    setActiveModal(activeModal === "extraComments" ? null : "extraComments");
  };

  const toggleFrontModal = () => {
    if (activeModal == "front") {
      setActiveModal(null);
    } else {
      setActiveModal("front");
    }
  };

  const toggleBackModal = () => {
    if (activeModal == "back") {
      setActiveModal(null);
    } else {
      setActiveModal("back");
    }
  };

  const [frontImage] = useImage(
    `${routes.server.base}${frontimageurl}`,
    "anonymous"
  );
  const [backImage] = useImage(
    `${routes.server.base}${backimageurl}`,
    "anonymous"
  );

  useEffect(() => {
    if (backImage) {
      // Calculate aspect ratio
      const maxWidth = 500;
      const maxHeight = 500;
      let width = backImage.width;
      let height = backImage.height;
      if (width > maxWidth || height > maxHeight) {
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width *= scale;
        height *= scale;
      }

      setImagebackSize({ width, height });
    }
  }, [backImage]);

  useEffect(() => {
    if (frontImage) {
      // Calculate aspect ratio
      const maxWidth = 500;
      const maxHeight = 500;
      let width = frontImage.width;
      let height = frontImage.height;
      frontImage;
      if (width > maxWidth || height > maxHeight) {
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width *= scale;
        height *= scale;
      }

      setImagefrontSize({ width, height });
    }
  }, [frontImage]);

  // const [stickers, setStickers] = useState({ frontX: 135, frontY: 112, frontWidth: 75, frontHeight: 240, frontRotation: -5 });

  return (
    <>
      <div className={sOrder.left}>
        <TitleWithDescription
          title={orderDescription.timage.title}
          text={orderDescription.timage.text}
        />
        <Progress value={55} />
      </div>
      <div
        style={{
          height: 0,
          border: "1px solid black",
          padding: "20px",
          borderEndStartRadius: "10px",
          borderEndEndRadius: "10px",
          marginTop: -16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "20px", marginTop: -12 }}>€ {subtotal}</p>
      </div>

      {/* {activeModal === "front" ? (
        <div className={sOrder.center}>
          {frontimageurl ? (
            <img
              style={{
                marginTop: "-5vw",
                maxWidth: "60%",
                height: "auto",
                marginLeft: "25%",
              }}
              crossOrigin="anonymous"
              src={`${routes.server.base}${frontimageurl}`}
            />
          ) : (
            <DefaultImg />
          )}
        </div>
      ) : activeModal === "back" ? (
        <div className={sOrder.center}>
          {backimageurl ? (
            <img
              style={{
                marginTop: "-5vw",
                maxWidth: "60%",
                height: "auto",
                marginLeft: "25%",
              }}
              crossOrigin="anonymous"
              src={`${routes.server.base}${backimageurl}`}
            />
          ) : (
            <DefaultImg />
          )}
        </div>
      ) : (
        <div className={sOrder.center}>
          <div>
            <DefaultImg />
          </div>
        </div>
      )} */}

      {activeModal === "front" ? (
        <div className={sOrder.center}>
          {frontimageurl && frontImage ? (
            <div className="flex flex-col items-center">
              <Stage
                width={imagefrontSize.width}
                height={imagefrontSize.height}
                className="border p-2"
                style={{ marginTop: "-5vw" }}
              >
                <Layer>
                  <KonvaImage
                    image={frontImage}
                    x={0}
                    y={0}
                    width={imagefrontSize.width}
                    height={imagefrontSize.height}
                  />
                  <Rect
                    x={frontstickers ? frontstickers?.frontX : 0}
                    y={frontstickers ? frontstickers?.frontY : 0}
                    width={frontstickers ? frontstickers?.frontWidth : 0}
                    height={frontstickers ? frontstickers?.frontHeight : 0}
                    fill="red"
                    rotation={
                      frontstickers
                        ? frontstickers?.frontRotation
                          ? frontstickers?.frontRotation
                          : 0
                        : 0
                    }
                    draggable={false}
                    onDragEnd={(e) => {
                      const newX = e.target.x();
                      const newY = e.target.y();
                      // Update state with new position if needed
                    }}
                  />
                </Layer>
              </Stage>
            </div>
          ) : (
            <DefaultImg />
          )}
        </div>
      ) : activeModal === "back" ? (
        <div className={sOrder.center}>
          {backimageurl && backImage ? (
            <div className="flex flex-col items-center">
              <Stage
                width={imagebackSize.width}
                height={imagebackSize.height}
                className="border p-2"
                style={{ marginTop: "-5vw" }}
              >
                <Layer>
                  <KonvaImage
                    image={backImage}
                    x={0}
                    y={0}
                    width={imagebackSize.width}
                    height={imagebackSize.height}
                  />
                  <Rect
                    x={backstickers ? backstickers?.backX : 0}
                    y={backstickers ? backstickers?.backY : 0}
                    width={backstickers ? backstickers?.backWidth : 0}
                    height={backstickers ? backstickers?.backHeight : 0}
                    fill="red"
                    rotation={
                      backstickers
                        ? backstickers?.backRotation
                          ? backstickers?.backRotation
                          : 0
                        : 0
                    }
                    draggable={false}
                    onDragEnd={(e) => {
                      const newX = e.target.x();
                      const newY = e.target.y();
                      // Update state with new position if needed
                    }}
                  />
                </Layer>
              </Stage>
            </div>
          ) : (
            <DefaultImg />
          )}
        </div>
      ) : (
        <div className={sOrder.center}>
          <div>
            <DefaultImg />
          </div>
        </div>
      )}

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
                  {activeModal === "front"
                    ? "Front View size selection"
                    : "Front View Sizes"}
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
              {activeModal !== "front" && (
                <ItemFinalDesign title="Front Size" value={frontsize} />
              )}
              {/* {activeModal !== "front" && (
                <ItemFinalDesign title="Uploaded Design" value={frontsize} />
              )} */}
            </div>

            <div className="tshirt-modal" style={{ marginTop: "3rem" }}>
              <div
                className={`modal-header ${
                  activeModal === "back" ? "no-border" : "with-border"
                }`}
              >
                <h3>
                  {activeModal === "back"
                    ? "Back View size selection"
                    : "Back View sizes"}
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
              {activeModal !== "back" && (
                <ItemFinalDesign title="Back Size" value={backsize} />
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
                />
              )}
              {activeModal !== "extraComments" && extradescription && (
                <ItemFinalDesign
                  title="Extra Comments"
                  value={extradescription ? extradescription.toString() : ""}
                />
              )}
            </div>
          </div>
        </div>

        <ButtonsOrder
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          onlyNext={false}
          isHaveNext={frontsize.length !== 0 && backsize.length !== 0}
        />
      </div>
    </>
  );
};

export default TshirtImage;
