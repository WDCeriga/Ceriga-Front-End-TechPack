import { FC } from "react";

import s from "./files.module.scss";
import { CloseIcon } from "@common/Icons/CommonIcon";

interface IFilesList {
  files: string[];
  removeFile: (fileUrl: string) => void;
}

const FilesList: FC<IFilesList> = ({ files, removeFile }) => {
  return (
    <div className={s.container}>
      <h3 className={s.container_title}>Uploaded</h3>
      <ul
        className={s.container_list}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "8px",
          padding: 0,
          margin: 0,
          listStyleType: "none",
          maxHeight: "380px",
          overflowY: "auto",
          marginTop: 15,
        }}
      >
        {files.map((file, index) => (
          <li
            className={s.container_list_item}
            key={index}
            style={{
              width: "100%",
            }}
          >
            <button
              onClick={() => {
                removeFile(file);
              }}
              style={{
                all: "unset",
                cursor: "pointer",
                marginTop: 5,
                marginLeft: "87%",
              }}
            >
              <CloseIcon width="22" height="22" color="red" />
            </button>
            <img
              src={file}
              alt="onlywatch"
              style={{
                width: "95%",
                height: "auto",
                marginTop: -5,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilesList;
