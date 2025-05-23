import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { idNavItem } from "../../interfaces/Nav.interfaces";

interface IState {
  isMenuOpen: boolean;
  sublist: {
    isOpen: boolean;
    id: idNavItem | null;
  };
  mostPopular: {
    page: number;
    maxPage: number;
  };
  additionalContent: {
    page: number;
    maxPage: number;
  };
  modal: {
    isActive: boolean;
    productId: string | null;
  };
  tableSize: {
    activeChar: string;
  };
  ordermodal: {
    CustomiseisActive: boolean;
    productId: string | null;
    category: string | null;
  };
}

interface IChangePage {
  method: "increment" | "decrement";
}

interface IOpenModal {
  productId: string;
}
interface ICsOpenModal {
  productId: string;
  category: string;
}

const initialState: IState = {
  isMenuOpen: false,
  sublist: {
    isOpen: false,
    id: null,
  },
  mostPopular: {
    page: 1,
    maxPage: 2,
  },
  additionalContent: {
    page: 1,
    maxPage: 2,
  },
  modal: {
    isActive: false,
    productId: null,
  },
  tableSize: {
    activeChar: "",
  },
  ordermodal: {
    CustomiseisActive: false,
    productId: null,
    category: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenu: (state: IState) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    updateMostPopularPage: (
      state: IState,
      { payload }: PayloadAction<IChangePage>
    ) => {
      const { method } = payload;
      if (method === "increment") {
        if (state.mostPopular.page < state.mostPopular.maxPage) {
          state.mostPopular.page += 1;
        }
      } else if (method === "decrement") {
        if (state.mostPopular.page > 1) {
          state.mostPopular.page -= 1;
        }
      }
    },
    updateAdditionalContent: (
      state: IState,
      { payload }: PayloadAction<IChangePage>
    ) => {
      const { method } = payload;
      if (
        method === "increment" &&
        state.additionalContent.page < state.additionalContent.maxPage
      ) {
        state.additionalContent.page += 1;
      } else if (method === "decrement" && state.additionalContent.page > 1) {
        state.additionalContent.page -= 1;
      }
    },
    openModal: (state: IState, { payload }: PayloadAction<IOpenModal>) => {
      state.modal.isActive = true;
      state.modal.productId = payload.productId;
    },
    closeModal: (state: IState) => {
      state.modal.isActive = false;
      state.modal.productId = null;
    },
    changeActiveCharInTableSize: (
      state: IState,
      { payload }: PayloadAction<string>
    ) => {
      state.tableSize.activeChar = payload;
    },
    openOrderTypeModal: (
      state: IState,
      { payload }: PayloadAction<ICsOpenModal>
    ) => {
      state.ordermodal.CustomiseisActive = true;
      state.ordermodal.productId = payload.productId;
      state.ordermodal.category = payload.category;
    },
    closeOrderTypeModal: (state: IState) => {
      state.ordermodal.CustomiseisActive = false;
      state.ordermodal.productId = null;
      state.ordermodal.category = null;
    },
  },
});

export const {
  toggleMenu,
  updateMostPopularPage,
  updateAdditionalContent,
  openModal,
  closeModal,
  changeActiveCharInTableSize,
  openOrderTypeModal,
  closeOrderTypeModal,
} = uiSlice.actions;

export default uiSlice.reducer;
