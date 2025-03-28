import { FC } from "react";

import s from "./files.module.scss";

interface IFilesList {
  files: string[];
}

const FilesList: FC<IFilesList> = ({ files }) => {
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
          maxHeight: '380px',
           overflowY: 'auto'
        }}
      >
        {files.map((file, index) => (
          <li
            key={index}
            style={{
              width: "100%",
            }}
          >
            <img
              src={file}
              alt="onlywatch"
              style={{
                width: "95%",
                height: "auto",
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilesList;
