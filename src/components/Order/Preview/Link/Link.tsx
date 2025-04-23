import { FC } from "react";
import { Link } from "react-router-dom";

import { LinkIcon } from "@common/Icons/CommonIcon";

import s from "./link.module.scss";

interface ILink {
  link?: string;
}

const LinkPreview: FC<ILink> = ({ link }) => {
  console.log("link=====>sdfs", link);
  return (
    // <Link className={s.link} to={link || "#"}>
    //   <p className={s.link_text}>Open link</p>
    //   <LinkIcon/>
    // </Link>
    // <a href={link} className={s.link} target="_blank" rel="noopener noreferrer">
    //   <p className={s.link_text}>Open link</p>
    //   <LinkIcon />
    // </a>
    <img
      src={link}
      style={{
        borderRadius: 10,
        objectFit: "contain",
        maxHeight: 100,
        maxWidth: 100,
      }}
    />
  );
};

export default LinkPreview;
