import { FC, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import MoonModel from "./MoonModel";

const Landing: FC = () => {
  const cameraRef = useRef(null);

  //   useEffect(() => {
  //     const handler = setInterval(() => {
  //       console.log(cameraRef.current.position.set(10, 10, 20));
  //       if (!(cameraRef && cameraRef.current)) return;
  //     }, 1000);

  //     // return clearInterval(handler);
  //   }, []);

  return (
    <>
      <Canvas ref={cameraRef} style={{ background: "#000000", zIndex: -5 }}>
        <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 8]} />
        <pointLight position={[-50, 50, -20]} />
        <ambientLight intensity={0.04} />
        <MoonModel />
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={100}
          fade
          speed={2}
        />
      </Canvas>
    </>
  );
};

export default Landing;
