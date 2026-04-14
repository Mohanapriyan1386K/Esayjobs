import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ModalStateType = {
  modalname: string;
  data: any;
};

const initialState: ModalStateType = {
  modalname: "",
  data: {},
};



const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalStateType>) => {
      state.modalname = action.payload.modalname;
      state.data = action.payload.data;
    },
    closeModal: (state) => {
      state.modalname = "";
      state.data = {};
    },
  },
});

export const { openModal, closeModal } = ModalSlice.actions;
export default ModalSlice.reducer;
