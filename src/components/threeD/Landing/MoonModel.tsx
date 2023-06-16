import { FC, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh } from "three";

const MoonModel: FC = () => {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, "/moon.jpg");
  useFrame((_, delta) => {
    if (!meshRef || !meshRef.current || !meshRef.current?.rotation) return;
    meshRef.current.rotation.x += delta / 80;
    meshRef.current.rotation.y -= delta / 50;
  });
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[3, 100, 100]} />
      <meshStandardMaterial map={texture} color={"white"} />
    </mesh>
  );
};

export default MoonModel;
