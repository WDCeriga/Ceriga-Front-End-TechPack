import { IOrderState } from "@interfaces/bll/order.interface";

export const initialState: IOrderState = {
  draftId: null,
  name: null,
  orderStep: null,
  productType: null,
  dyeStyle: null,
  printing: "No Printing",
  color: {
    hex: null,
    path: null,
    name: "",
    cost: 0,
    colortype: "",
    description: "",
  },
  material: {
    name: null,
    value: null,
    cost: 0,
  },
  stitching: {
    type: "",
    description: "",
  },
  fading: {
    type: "",
  },
  neck: {
    noLabels: false,
    type: "",
    additional: {
      color: "",
      material: "",
    },
  },
  package: {
    isPackage: null,
    description: "",
  },
  quantity: {
    type: null,
    list: [
      {
        name: "XXS",
        value: 0,
      },
      {
        name: "XS",
        value: 0,
      },
      {
        name: "S",
        value: 0,
      },
      {
        name: "M",
        value: 0,
      },
      {
        name: "L",
        value: 0,
      },
      {
        name: "XL",
        value: 0,
      },
      {
        name: "XXL",
        value: 0,
      },
    ],
  },
  delivery: {
    companyName: "",
    addressLine: "",
    zipCode: "",
    taxNumber: "",
    bolNumber: "",
    city: "",
    state: "",
    country: null,
    sameAsBilling: false,
    name: "",
    phoneNumber: "",
    email: "",
  },
  designUploads: [],
  labelUploads: [],
  neckUploads: [],
  neckDescription: "",
  packageUploads: [],
  cost: 0,
  subtotal: 0,
  shipping: 0,
  moq: 0,
  createAt: new Date().toISOString(),
  // tableSize: [
  //   {
  //     name: "Total Length",
  //     char: "A",
  //     list: [
  //       {
  //         param: "xs",
  //         value: 65,
  //       },
  //       {
  //         param: "s",
  //         value: 67,
  //       },
  //       {
  //         param: "m",
  //         value: 69,
  //       },
  //       {
  //         param: "l",
  //         value: 71,
  //       },
  //       {
  //         param: "xl",
  //         value: 73,
  //       },
  //       {
  //         param: "xxl",
  //         value: 75,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Chest Width",
  //     char: "B",
  //     list: [
  //       {
  //         param: "xs",
  //         value: 59,
  //       },
  //       {
  //         param: "s",
  //         value: 60,
  //       },
  //       {
  //         param: "m",
  //         value: 61,
  //       },
  //       {
  //         param: "l",
  //         value: 62,
  //       },
  //       {
  //         param: "xl",
  //         value: 63,
  //       },
  //       {
  //         param: "xxl",
  //         value: 64,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Bottom Width",
  //     char: "C",
  //     list: [
  //       {
  //         param: "xs",
  //         value: 59,
  //       },
  //       {
  //         param: "s",
  //         value: 60,
  //       },
  //       {
  //         param: "m",
  //         value: 61,
  //       },
  //       {
  //         param: "l",
  //         value: 62,
  //       },
  //       {
  //         param: "xl",
  //         value: 63,
  //       },
  //       {
  //         param: "xxl",
  //         value: 64,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Sleeve Length",
  //     char: "D",
  //     list: [
  //       {
  //         param: "xs",
  //         value: 22,
  //       },
  //       {
  //         param: "s",
  //         value: 23,
  //       },
  //       {
  //         param: "m",
  //         value: 24,
  //       },
  //       {
  //         param: "l",
  //         value: 25,
  //       },
  //       {
  //         param: "xl",
  //         value: 26,
  //       },
  //       {
  //         param: "xxl",
  //         value: 27,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Armhole",
  //     char: "E",
  //     list: [
  //       {
  //         param: "xs",
  //         value: 24,
  //       },
  //       {
  //         param: "s",
  //         value: 24.5,
  //       },
  //       {
  //         param: "m",
  //         value: 25,
  //       },
  //       {
  //         param: "l",
  //         value: 25.5,
  //       },
  //       {
  //         param: "xl",
  //         value: 26,
  //       },
  //       {
  //         param: "xxl",
  //         value: 26.5,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Sleeve Opening",
  //     char: "F",
  //     list: [
  //       {
  //         param: "xs",
  //         value: 21,
  //       },
  //       {
  //         param: "s",
  //         value: 21.5,
  //       },
  //       {
  //         param: "m",
  //         value: 22,
  //       },
  //       {
  //         param: "l",
  //         value: 22.5,
  //       },
  //       {
  //         param: "xl",
  //         value: 23,
  //       },
  //       {
  //         param: "xxl",
  //         value: 23.5,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Neck Rib Length",
  //     char: "G",
  //     list: [
  //       {
  //         param: "xs",
  //         value: 2,
  //       },
  //       {
  //         param: "s",
  //         value: 2,
  //       },
  //       {
  //         param: "m",
  //         value: 2,
  //       },
  //       {
  //         param: "l",
  //         value: 2,
  //       },
  //       {
  //         param: "xl",
  //         value: 2,
  //       },
  //       {
  //         param: "xxl",
  //         value: 2,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Neck Opening",
  //     char: "H",
  //     list: [
  //       {
  //         param: "xs",
  //         value: 18,
  //       },
  //       {
  //         param: "s",
  //         value: 18,
  //       },
  //       {
  //         param: "m",
  //         value: 18,
  //       },
  //       {
  //         param: "l",
  //         value: 18,
  //       },
  //       {
  //         param: "xl",
  //         value: 18,
  //       },
  //       {
  //         param: "xxl",
  //         value: 18,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Shoulder-to-Shoulder",
  //     char: "I",
  //     list: [
  //       {
  //         param: "xs",
  //         value: 58,
  //       },
  //       {
  //         param: "s",
  //         value: 59,
  //       },
  //       {
  //         param: "m",
  //         value: 60,
  //       },
  //       {
  //         param: "l",
  //         value: 61,
  //       },
  //       {
  //         param: "xl",
  //         value: 62,
  //       },
  //       {
  //         param: "xxl",
  //         value: 63,
  //       },
  //     ],
  //   },
  // ],
  tableSize: [],
  tableType: null,
  totalcost: 0,
  minimumQuantity: 1,
  // logodetails: {
  //   frontlogo: "No Design",
  //   backlogo: "No Design",
  //   description: "",
  // },
  logodetails: {
    frontlogo: "",
    backlogo: "",
    description: "",
  },
  frontlogoUploads: [],
  backlogoUploads: [],
  orderType: "",
};
