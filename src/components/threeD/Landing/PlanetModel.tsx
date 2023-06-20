import { FC, useRef, useEffect, useCallback } from "react";
import { useFrame, useLoader, extend } from "@react-three/fiber";
import { TextureLoader, Mesh } from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import createPlanetShader from "../../../shaders/Planet";
import createAtmoshpereShader from "../../../shaders/Planet/atmoshpere";

// extend({ CustomShaderMaterial });

const PlanetModel: FC = () => {
  const meshRef = useRef<Mesh>(null);
  const gltf = useLoader(GLTFLoader, "/planet/scene.gltf");
  // const texture = new TextureLoader().load("/moon.jpg");

  const setShaderMaterial = useCallback(
    (child) => {
      if (child.isMesh) {
        if (child.name === "Object_6") {
          const cop = child.clone();
          cop.material = createAtmoshpereShader();
          cop.scale.set(1.5, 1.5, 1.5);
          gltf.scene.add(cop);
        }

        const material = createPlanetShader(child.material.map);
        child.material = material;
      }
    },
    [gltf.scene]
  );

  useEffect(() => {
    gltf.scene.traverse(setShaderMaterial);
  }, [gltf.scene, setShaderMaterial]);

  useFrame((_, delta) => {
    if (!meshRef || !meshRef.current || !meshRef.current?.rotation) return;
    meshRef.current.rotation.y -= delta / 50;
  });

  return (
    // <mesh ref={meshRef} position={[0, 0, 0]}>
    //   <sphereGeometry args={[3, 100, 100]} />
    //   <meshStandardMaterial map={texture} color={"white"} />
    // </mesh>
    <group>
      <mesh>
        <primitive scale={[3, 3, 3]} ref={meshRef} object={gltf.scene} />
      </mesh>
    </group>
  );
};

export default PlanetModel;
