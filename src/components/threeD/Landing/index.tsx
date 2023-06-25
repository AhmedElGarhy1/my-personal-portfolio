import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import World from "./World";
import CircleCursor from "../utils/Cursor/CursorAnimation";
import { OrbitControls } from "@react-three/drei";
import NebulaEffect from "./NebulaEffect";
// import NebulaEffect from "./NebulaEffect";
// import { OrbitControls } from "@react-three/drei";

interface PropsType {
  mouse: Vector3 | undefined;
}

const Landing: FC<PropsType> = ({ mouse }) => {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 50],
          fov: 30,
        }}
        className=" bg-black h-[-webkit-fill-available]">
        <CircleCursor mouse={mouse} />
        <OrbitControls />
        <NebulaEffect />
        <World mouse={mouse} />
      </Canvas>
    </>
  );
};

export default Landing;
