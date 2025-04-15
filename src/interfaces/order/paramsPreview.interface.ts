import { materialValue } from "./material.interface";

export type titleType =
  | "Fabrics"
  | "Colour"
  | "Neck label"
  | "Care label"
  | "Design"
  | "Packaging"
  | "Quantity"
  | "Total Price"
  | "Size"

export interface ISubparametersPreviewTable {
  title: string;
  value: string;
}
export interface ILinkPreviewTable {
  url: string;
}

export interface ISubparametersPreviewOrder {
  title: string;
  isLink?: boolean;
  titleStyle?: "default" | "bold";
  value?: string | materialValue;
  link?: string;
  text?: string;
  issize?:boolean
}

export interface IParamPreviewOrder {
  title: titleType;
  paramsType: "list" | "table" | "link" | "text" | "cost" | "listsize";
  subparameters:
    | ISubparametersPreviewOrder[]
    | ISubparametersPreviewTable[]
    | ILinkPreviewTable
    | string;
}
