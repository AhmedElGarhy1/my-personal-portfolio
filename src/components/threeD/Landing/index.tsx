import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import World from "./World";

const Landing: FC = () => {
  // useEffect(() => {
  //   const handler = setInterval(() => {
  //     console.log(cameraRef.current.position.set(10, 10, 20));
  //     if (!(cameraRef && cameraRef.current)) return;
  //   }, 1000);

  //   // return clearInterval(handler);
  // }, []);

  return (
    <>
      <Canvas style={{ background: "#000000", zIndex: -5 }}>
        <World />
      </Canvas>
    </>
  );
};

export default Landing;
