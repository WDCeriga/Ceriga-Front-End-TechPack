
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@redux/store";
import { updateCommentStitching } from "@redux/slices/order";

import UploadFile from "../UploadFile/UploadFile";
import ButtonUploadDesign from "./Button/Button";
import TextareaUploadDesign from "./Textarea/Textarea";
import UploadDesignTop from "./Top/Top";
import s from "./uploadDesign.module.scss";
import routes from "@routes/index";

interface IUploadDesign {
  handleClose: () => void;
}
const UploadDesign: FC<IUploadDesign> = ({ handleClose }) => {
  const orderState = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();
  const { description ,type } = useSelector(
    (state: RootState) => state.order.stitching
  );

  const [descriptionValue, setDescriptionValue] = useState<string>(description);
  const [modalOpen, setModalOpen] = useState<boolean>(false);



 
  const handleToggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const handleUpdateDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionValue(event.currentTarget.value);
    dispatch(updateCommentStitching(descriptionValue));
  };
  const productinfo = useSelector(
    (state: RootState) => state.products.productOpen,
  );

  // const handleDownload = () => {
  //  const doc = new jsPDF();
  //  doc.text("Example file", 10, 10);
  //  doc.save("example.pdf");
  //};



  const handleDownload = async (filePath: string) => {
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <>
      <section className={s.container}>
        <UploadDesignTop handleClose={handleClose} />
        <TextareaUploadDesign
          value={descriptionValue}
          onChange={handleUpdateDescription}
        />
        {/* <ButtonUploadDesign onEvent={() => {
          const filePath = `${routes.server.base}${productinfo?.stitchingPdfUrl}`; // Ensure `routes.server.base` is correct
          handleDownload(filePath);
        }} text="Download PDF" /> */}
        {/* <ButtonUploadDesign onEvent={handleToggleModal} /> */}
      </section>
      {modalOpen && (
        <UploadFile type="uploadDesign" handleClose={handleToggleModal} />
      )}
    </>
  );
};

export default UploadDesign;
