import { FC, useRef, useEffect, useCallback } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import createPlanetShader from "../../../shaders/Planet";
import createAtmoshpereShader from "../../../shaders/Planet/atmoshpere";

const PlanetModel: FC = () => {
  const meshRef = useRef<Mesh>(null);
  const gltf = useLoader(GLTFLoader, "/planet/scene.gltf");

  const setShaderMaterial = useCallback(
    (child: Mesh) => {
      if (child.isMesh) {
        if (child.name === "Object_6") {
          const cop = child.clone();
          cop.material = createAtmoshpereShader();
          cop.scale.set(1.5, 1.5, 1.5);
          gltf.scene.add(cop);
        }
        const material = child.material as MeshStandardMaterial;
        child.material = createPlanetShader(material.map);
      }
    },
    [gltf.scene]
  );

  useEffect(() => {
    gltf.scene.traverse(setShaderMaterial);
  }, [gltf.scene, setShaderMaterial]);

  useFrame((_, delta) => {
    if (!meshRef || !meshRef.current || !meshRef.current?.rotation) return;
    meshRef.current.rotation.y -= delta / 20;
  });

  return (
    <mesh>
      <primitive scale={[3, 3, 3]} ref={meshRef} object={gltf.scene} />
    </mesh>
  );
};

export default PlanetModel;
