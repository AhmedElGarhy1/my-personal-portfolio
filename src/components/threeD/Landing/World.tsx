// import { useEffect } from "react";
import { FC, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { Stars } from "@react-three/drei";
import PlanetModel from "./PlanetModel";
import { useFrame } from "@react-three/fiber";
// import CircleCursor from "../utils/Cursor/CursorAnimation";
// import NebulaScene from "./NebulaEffect";
// import { gsap } from "gsap";

interface PropsType {
  mouse: Vector3 | undefined;
}

const World: FC<PropsType> = ({ mouse }) => {
  const starsRef = useRef<Mesh>();
  useFrame((_, delta) => {
    if (!starsRef || !starsRef.current) return;
    starsRef.current.rotation.y += delta / 100;
  });

  // useEffect(() => {
  //   console.log(skyRef?.current);
  //   // gsap.to(skyRef.current.distance);
  // }, []);

  return (
    <>
      {/* lights */}
      {/* <directionalLight intensity={1} position={[5, 0, 20]} />
      <ambientLight intensity={1} /> */}
      {/* controller */}
      {/* <OrbitControls /> */}
      {/* modles */}
      <PlanetModel mouse={mouse} />
      {/* <CircleCursor /> */}
      {/* <NebulaScene /> */}

      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={5000}
        factor={6}
        saturation={100}
        fade
        speed={3}
      />
      {/* <Sky
        ref={skyRef}
        distance={10}
        sunPosition={[0, 10, 0]}
        inclination={0}
        azimuth={2}
      /> */}
    </>
  );
};

export default World;
