import { StitchingType } from "./design.interface";

export type uploadTypes = "standard" | "rawEdge" | "flatlock" | "insideOut";

// export interface IUploadType {
//   id: uploadTypes;
//   name: StitchingType;
// }

export interface IUploadType {
  id: string;
  name: string;
}

