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
        }}>
        <color attach="background" args={["#1b1b32"]} />
        {/* <OrbitControls /> */}
        {/* <NebulaEffect /> */}
        <World mouse2D={mouse2D} />
      </Canvas>
    </>
  );
};

export default Landing;
