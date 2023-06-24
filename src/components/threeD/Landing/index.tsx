import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import World from "./World";
import CircleCursor from "../utils/Cursor/CursorAnimation";
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
          position: [0, 0, 15],
          fov: 30,
        }}
        linear
        className=" bg-black h-[-webkit-fill-available]">
        <CircleCursor mouse={mouse} />
        {/* <OrbitControls /> */}
        {/* <NebulaEffect /> */}
        <World mouse={mouse} />
      </Canvas>
    </>
  );
};

export default Landing;
