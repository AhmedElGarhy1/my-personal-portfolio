import { FC } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const ThreeDButton: FC<{ setPosition: (a: Vector3) => void }> = ({
  setPosition,
}) => {
  useFrame((_, delta) => {
    // Update the camera position on each frame
    setPosition(new Vector3(delta * 5, delta * 10, delta * 10));
  });
  return <></>;
};

export default ThreeDButton;
