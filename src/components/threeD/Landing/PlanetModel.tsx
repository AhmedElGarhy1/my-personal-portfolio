import { FC, useRef, useEffect, useCallback, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import createPlanetShader from "../../../shaders/Planet";
import createAtmoshpereShader from "../../../shaders/Planet/atmoshpere";
import { gsap } from "gsap";
import { useGetMouse3DState } from "../../../hooks/state";

const PlanetModel: FC = () => {
  const mouse3D = useGetMouse3DState();

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
    const bounceAnimation = gsap.fromTo(
      meshRef.current.position,
      {
        y: -0.5,
      },
      {
        y: 0.5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
    );
    // const starterAnimation = gsap.to(meshRef.current.position, {
    //   y: 0.5,
    //   duration: 5,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "power1.inOut",
    // });

    return () => {
      bounceAnimation.kill();
      // starterAnimation.kill();
    };
  }, [shpereGeo]);

  useEffect(() => {
    gltf.scene.traverse(setShaderMaterial);
  }, [gltf.scene, setShaderMaterial]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!meshRef || !mesh || !mesh?.rotation || !mouse3D) return;

    const mouseRotation = gsap.to(mesh.rotation, {
      x: -mouse3D.y * 0.07,
      y: mouse3D.x * 0.07,
      ease: "Power1.easeOut",
      duration: 5,
    });

    if (!shpereGeo) return;
    shpereGeo.rotation.y -= delta / 10;

    return () => {
      mouseRotation.kill();
    };
  });

  return (
    <mesh>
      <primitive
        ref={meshRef}
        position={[15, -0.5, -100]}
        rotation={[0, 0.5, 0]}
        scale={[10, 10, 10]}
        object={gltf.scene}
      />
    </mesh>
  );
};

export default PlanetModel;
