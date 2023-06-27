import {
  selectAspectRatio,
  selectIsMobile,
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
export const useGetIsMobile = () => {
  const isMobile = useAppSelector(selectIsMobile);
  return isMobile;
};
export const useGetAspectRatioState = () => {
  const aspectRatio = useAppSelector(selectAspectRatio);
  return aspectRatio;
};
