interface FabricOption {
  type: string;
  cost: number;
  availableColors?: string[];
  imgurl: string;
  fabricValue: number[];
}

interface DyeStyle {
  type: string;
  cost: number;
}

interface LabelOption {
  type: string;
  cost?: number;
  minimumQuantity: number,
  isMinimumRequired: boolean;
}

interface LabelMaterial {
  type: string;
  cost: number;
}

interface StitchingOption {
  type: string;
  cost: number;
  stitchingImgUrl: string;
  minimumQuantity: number,
  isMinimumRequired: boolean;

}

interface FadingOption {
  type: string;
  cost: number;
  fadingImgUrl: string;
  minimumQuantity: number,
  isMinimumRequired: boolean;
}

interface Printing {
  type: string;
  cost: number;
  isMinimumRequired: boolean;
  minimumQuantity: number;
  printingImgUrl: string;
}


export interface IProduct {
  _id: string;
  name: string;
  images: string[];
  categories: string[];
  fits: string[];
  startingPrice: string[];
}


interface IFrontlogo {
  type: string;
  cost: number;
  frontlogoImgUrl: string;
  frontX: number
  frontY: number
  frontWidth: number
  frontHeight: number
}
interface IBacklogo {
  type: string;
  cost: number;
  backlogoImgUrl: string;
  backX: number
  backY: number
  backWidth: number
  backHeight: number
}

export interface IProductFull {
  name: string;
  description?: string;
  categories: string[];
  moq: number;
  startingPrice: number;
  fabric: FabricOption[];
  colorOptions?: number;
  additionalColorCost?: number;
  dyeStyles: DyeStyle[];
  fits?: string[];
  origin?: string;
  leadTime: string;
  labelOptions?: LabelOption[];
  labelMaterials: LabelMaterial[];
  stitchingOptions: StitchingOption[];
  fadingOptions: FadingOption[];
  images?: string[];
  createdAt?: Date;
  stitchingPdfUrl: string;
  printing: Printing[],
  frontlogo: IFrontlogo[],
  backlogo: IBacklogo[]
}

export interface IProductsState {
  productOpen: IProductFull | null;
  list: IProduct[] | [];
}
