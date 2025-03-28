import { useState } from "react";
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
import ImageSizeDisplay from "./ImageSizeDisplay";
import ItemFinalDesign from "../Common/Item/Item";
import routes from "@routes/index";

const TshirtImage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { order } = useSelector((state: RootState) => state);
  const { subtotal } = useSelector((state: RootState) => state.order);

  const frontsize = order?.logodetails?.frontlogo ?? "";
  const backsize = order?.logodetails?.backlogo ?? "";
  const extradescription = order?.logodetails?.description ?? "";

  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen
  );

  const frontimageurl = frontsize
    ? productinfo?.frontlogo.find((x) => x.type == frontsize)?.frontlogoImgUrl
    : "";
  const backimageurl = backsize
    ? productinfo?.backlogo.find((x) => x.type == frontsize)?.backlogoImgUrl
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

  return (
    <>
      <div className={sOrder.left}>
        <TitleWithDescription
          title={orderDescription.timage.title}
          text={orderDescription.timage.text}
        />
        <Progress value={55} />
      </div>
      {/* {subtotal ? (
        <p
          style={{
            position: "absolute",
            top: "-14.8vw",
            right: "47.5%",
            fontSize: "20px",
            border: "1px solid black",
            padding: "15px",
            borderEndStartRadius: "10px",
            borderEndEndRadius: "10px",
          }}
        >
          € {subtotal}
        </p>
      ) : (
        <></>
      )} */}
      <p> € {subtotal}</p>
      {activeModal === "front" ? (
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
          isHaveNext={true}
        />
      </div>
    </>
  );
};

export default TshirtImage;
