import { useEffect, useCallback, useState, forwardRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import createPlanetShader from "../../../shaders/Planet";
import createAtmoshpereShader from "../../../shaders/Planet/atmoshpere";
import { gsap } from "gsap";
import {
  useGetAspectRatioState,
  useGetMouse3DState,
} from "../../../hooks/state";
const PlanetModel = forwardRef<Mesh>((_, ref) => {
  const mouse3D = useGetMouse3DState();
  // const isMobile = useGetIsMobile();
  const aspectRatio = useGetAspectRatioState();

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
    if (!ref) return;
    // @ts-ignore
    const mesh = ref.current as Mesh;
    if (!mesh) return;
    const bounceAnimation = gsap.fromTo(
      mesh.position,
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

  // useEffect(() => {
  //   if (!meshRef || !meshRef.current) return;

  //   if (isMobile) {
  //     meshRef.current.position.setX(10);
  //   } else {
  //     meshRef.current.position.setX(15);
  //   }
  // }, [isMobile]);

  useFrame((_, delta) => {
    if (!ref) return;
    // @ts-ignore
    const mesh = ref.current;
    if (!mesh || !mesh?.rotation || !mouse3D) return;

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
        ref={ref}
        // position={[15, -0.5, -100]}
        position={[0, 0, -200]}
        rotation={[0, 0.5, 0]}
        scale={[7 + aspectRatio, 7 + aspectRatio, 7 + aspectRatio]}
        object={gltf.scene}
      />
    </mesh>
  );
});

export default PlanetModel;
