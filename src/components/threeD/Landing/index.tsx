import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Vector2 } from "three";
import World from "./World";
// import NebulaEffect from "./NebulaEffect";
// import { OrbitControls } from "@react-three/drei";

interface PropsType {
  mouse2D: Vector2 | undefined;
}

const Landing: FC<PropsType> = ({ mouse2D }) => {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 50],
          fov: 10,
        }}
        className=" bg-black ">
        {/* <OrbitControls /> */}
        {/* <NebulaEffect /> */}
        <World mouse2D={mouse2D} />
      </Canvas>
    </>
  );
};

export default Landing;
