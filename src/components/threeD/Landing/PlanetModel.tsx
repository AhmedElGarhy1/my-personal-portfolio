import { FC, useRef, useEffect, useCallback, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Vector3 } from "three";

// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import createPlanetShader from "../../../shaders/Planet";
import createAtmoshpereShader from "../../../shaders/Planet/atmoshpere";
import { gsap } from "gsap";

interface PropsType {
  mouse: Vector3 | undefined;
}

const PlanetModel: FC<PropsType> = ({ mouse }) => {
  // const {} = useScroll({
  //   offset: 2000,
  // });
  // const [mousePos, setMousePos] = useState<Vector2>(
  //   new Vector2(undefined, undefined)
  // );
  // const [sphereMat, setSphereMat] = useState<ShaderMaterial>();

  const meshRef = useRef<Mesh>(null);
  const [shpereGeo, setShpereGeo] = useState<Mesh>();
  const gltf = useLoader(GLTFLoader, "/planet/scene.gltf");

  const setShaderMaterial = useCallback(
    (child: Mesh) => {
      if (child.isMesh) {
        if (child.name === "Object_6") {
          const cop = child.clone();
          const mat = createAtmoshpereShader();
          cop.material = mat;
          cop.scale.set(1.5, 1.5, 1.5);
          setShpereGeo(cop);
          gltf.scene.add(cop);
          // setSphereMat(mat);
        }
        const material = child.material as MeshStandardMaterial;
        child.material = createPlanetShader(material.map);
      }
    },
    [gltf.scene]
  );

  useEffect(() => {
    if (!meshRef || !meshRef.current) return;
    const bounceAnimation = gsap.to(meshRef.current.position, {
      y: 1,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      bounceAnimation.kill();
    };
  }, [shpereGeo]);

  useEffect(() => {
    gltf.scene.traverse(setShaderMaterial);
  }, [gltf.scene, setShaderMaterial]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!meshRef || !mesh || !mesh?.rotation || !mouse) return;

    gsap.to(mesh.rotation, {
      x: -mouse.y * 0.4,
      y: mouse.x * 0.4,
      ease: "Power1.easeOut",
      duration: 4,
    });
    gsap.to(mesh.position, {
      x: -mouse.x * 1.5,
      ease: "easeOut",
      duration: 4,
    });
    if (!shpereGeo) return;
    shpereGeo.rotation.y -= delta / 10;
  });

  return (
    <mesh>
      <primitive
        position={[0, -1, -15]}
        rotation={[0, 0.5, 0]}
        scale={[15, 15, 15]}
        ref={meshRef}
        object={gltf.scene}
      />
    </mesh>
  );
};

export default PlanetModel;
