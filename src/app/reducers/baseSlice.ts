import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BaseState {
  savedDatas: any[];
  selectedBrand: string;
  lastSavedData: object;
}

const initialState: BaseState = {
  savedDatas: [],
  lastSavedData: {},
  selectedBrand: "",
};

export const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<any>) => {
      state.savedDatas = [...state.savedDatas, action.payload];
      state.lastSavedData = action.payload;
    },
    setSelectedBrand: (state, action: PayloadAction<string>) => {
      state.selectedBrand = action.payload;
    },
    resetLastSavedData: (state) => {
      state.lastSavedData = initialState.lastSavedData;
    },
  },
});

export const { addData, setSelectedBrand, resetLastSavedData } = baseSlice.actions;

export default baseSlice.reducer;
