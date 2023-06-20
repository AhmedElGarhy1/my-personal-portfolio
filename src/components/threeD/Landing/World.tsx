import { Stars } from "@react-three/drei";
import PlanetModel from "./PlanetModel";

const World = () => {
  //   useFrame((_, delta) => {
  //     camera.rotation.y += delta / 100;
  //   });

  return (
    <>
      {/* lights */}
      <directionalLight intensity={1} position={[5, 0, 20]} />
      <ambientLight intensity={1} />
      {/* controller */}
      {/* modles */}
      <PlanetModel />
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={100}
        fade
        speed={2}
      />
    </>
  );
};

export default World;
