import {
  selectMouse3D,
  selectMouseClicked,
  selectScrollY,
} from "../redux/slices/app";
import { useAppSelector } from "./store";

// select state
export const useGetMouse3DState = () => {
  const mouse3D = useAppSelector(selectMouse3D);
  return mouse3D;
};
export const useGetMouseClickedState = () => {
  const mouseClicked = useAppSelector(selectMouseClicked);
  return mouseClicked;
};
export const useGetScrollYState = () => {
  const scrollY = useAppSelector(selectScrollY);
  return scrollY;
};
