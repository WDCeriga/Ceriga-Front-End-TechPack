export interface IColorType {
  name: string;
  path: string;
  hexValue: string;
  cost: number;
}

export interface IColorList {
  color: string;
  types: IColorType[];
}
export interface IColorState {
  product: string | null;
  list: IColorList[];
}
