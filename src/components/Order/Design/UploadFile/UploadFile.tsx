import {
  uploadDesign,
  uploadLabel,
  uploadNeck,
  uploadPackage,
  uploadbacklogo,
  uploadfrontlogo,
} from "@redux/slices/order";
import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "@common/Icons/CommonIcon";
import { uploadFileType } from "@interfaces/UploadFile.interface";
import { AppDispatch, RootState } from "@redux/store";
import ModalLayout from "@common/Layouts/Modal/Layout";

import ButtonUploadFile from "./Button/Button";
import Dropzone from "./Dropzone/Dropzone";
import FilesList from "./Files/Files";
import s from "./uploadFile.module.scss";
import { removeFile } from "@redux/slices/order";

interface IUploadFile {
  type: uploadFileType;
  handleClose: () => void;
}

const UploadFile: FC<IUploadFile> = ({ handleClose, type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { draftId } = useSelector((state: RootState) => state.order);

  const files = useSelector((state: RootState) => {
    if (type === "uploadDesign") {
      return state.order.designUploads;
    }
    if (type === "uploadLabel") {
      return state.order.labelUploads;
    }
    if (type === "uploadNeck") {
      return state.order.neckUploads;
    }
    if (type === "uploadPackageDesign") {
      return state.order.packageUploads;
    }
    if (type === "frontlogoUploads") {
      return state.order.frontlogoUploads;
    }
    if (type === "backlogoUploads") {
      return state.order.backlogoUploads;
    }
  });

  const handleDropFile = useCallback(
    async (acceptedFiles: File[]) => {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append("image", file);
      });
      if (type === "uploadDesign" && draftId) {
        await dispatch(uploadDesign({ formData, draftId }));
      }

      if (type === "uploadLabel" && draftId) {
        await dispatch(uploadLabel({ formData, draftId }));
      }

      if (type === "uploadNeck" && draftId) {
        await dispatch(uploadNeck({ formData, draftId }));
      }

      if (type === "uploadPackageDesign" && draftId) {
        await dispatch(uploadPackage({ formData, draftId }));
      }

      if (type === "frontlogoUploads" && draftId) {
        await dispatch(uploadfrontlogo({ formData, draftId }));
      }
      if (type === "backlogoUploads" && draftId) {
        await dispatch(uploadbacklogo({ formData, draftId }));
      }
    },
    [dispatch, draftId, type]
  );

  const handelRemoveFile = async (file: string) => {
    console.log("filemhdfs===>", file);
    if (type === "uploadDesign" && draftId) {
      await dispatch(
        removeFile({
          draftId: draftId,
          field: "designUploads",
          fileUrl: file,
          type: type,
        })
      );
    }

    if (type === "uploadLabel" && draftId) {
      await dispatch(
        removeFile({
          draftId: draftId,
          field: "labelUploads",
          fileUrl: file,
          type: type,
        })
      );
    }

    if (type === "uploadNeck" && draftId) {
      await dispatch(
        removeFile({
          draftId: draftId,
          field: "neckUploads",
          fileUrl: file,
          type: type,
        })
      );
    }

    if (type === "uploadPackageDesign" && draftId) {
      await dispatch(
        removeFile({
          draftId: draftId,
          field: "packageUploads",
          fileUrl: file,
          type: type,
        })
      );
    }

    if (type === "frontlogoUploads" && draftId) {
      await dispatch(
        removeFile({
          draftId: draftId,
          field: "frontlogoUploads",
          fileUrl: file,
          type: type,
        })
      );
    }
    if (type === "backlogoUploads" && draftId) {
      await dispatch(
        removeFile({
          draftId: draftId,
          field: "backlogoUploads",
          fileUrl: file,
          type: type,
        })
      );
    }
  };

  return (
    <ModalLayout handleClose={handleClose}>
      <div className={s.content}>
        <button onClick={handleClose} className={s.content_buttonClose}>
          <CloseIcon width="22" height="22" color="#111" />
        </button>
        <h2 className={s.content_title}>Upload</h2>
        <Dropzone onDrop={handleDropFile} />
        {files && files.length !== 0 && (
          <FilesList
            files={files}
            removeFile={(file) => {
              console.log("file====>dsfg", file);
              handelRemoveFile(file);
            }}
          />
        )}
        <ButtonUploadFile handleClose={handleClose} />
      </div>
    </ModalLayout>
  );
};

export default UploadFile;
