import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface ob3jD {
  x: number;
  y: number;
  z: number;
}

// Define a type for the slice state
interface InitialStateType {
  scrollY: number;
  mouse3D: ob3jD;
  mouseClicked: boolean;
  isMobile: boolean;
  aspect: number;
}

// Define the initial state using that type
const initialState: InitialStateType = {
  scrollY: 0,
  mouse3D: {
    x: 0,
    y: 0,
    z: 0,
  },
  mouseClicked: false,
  isMobile: false,
  aspect: 1,
};

export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToScrollY: (state, { payload }: PayloadAction<number>) => {
      if (state.scrollY + payload < 0) return;
      state.scrollY += payload;
    },

    updateMouse3D: (state, action: PayloadAction<ob3jD>) => {
      state.mouse3D = action.payload;
    },
    updateMouseClicked: (state, action: PayloadAction<boolean>) => {
      state.mouseClicked = action.payload;
    },
    updateIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    updateAspectRatio: (state, action: PayloadAction<number>) => {
      state.aspect = action.payload;
    },
  },
});

export const {
  updateIsMobile,
  updateMouseClicked,
  updateMouse3D,
  addToScrollY,
  updateAspectRatio,
} = appSlice.actions;

export const selectMouse3D = (state: RootState) => state.app.mouse3D;
export const selectMouseClicked = (state: RootState) => state.app.mouseClicked;
export const selectScrollY = (state: RootState) => state.app.scrollY;
export const selectIsMobile = (state: RootState) => state.app.isMobile;
export const selectAspectRatio = (state: RootState) => state.app.aspect;

export default appSlice.reducer;
