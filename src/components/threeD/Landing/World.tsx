// import { useEffect } from "react";
import { Stars } from "@react-three/drei";
import PlanetModel from "./PlanetModel";
import CircleCursor from "../utils/Cursor/CursorAnimation";
// import { gsap } from "gsap";

const World = () => {
  //   useFrame((_, delta) => {
  //     camera.rotation.y += delta / 100;
  //   });

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
      <PlanetModel />
      <CircleCursor />

      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={100}
        fade
        speed={2}
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
