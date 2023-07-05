import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Vector2 } from "three";
import World from "./World";
import IntroText from "../../IntroText";
// import NebulaEffect from "./NebulaEffect";
// import { OrbitControls } from "@react-three/drei";

interface PropsType {
  mouse2D: Vector2 | undefined;
}

const Landing: FC<PropsType> = ({ mouse2D }) => {
  return (
    <>
      <div className="relative h-full">
        <Canvas
          camera={{
            position: [0, 0, 50],
            fov: 10,
          }}>
          <color attach="background" args={["#1b1b32"]} />
          <World mouse2D={mouse2D} />
        </Canvas>
        <IntroText />
      </div>
    </>
  );
};

export default Landing;
