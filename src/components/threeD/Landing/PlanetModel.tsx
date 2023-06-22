import { FC, useRef, useEffect, useCallback } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import createPlanetShader from "../../../shaders/Planet";
import createAtmoshpereShader from "../../../shaders/Planet/atmoshpere";
import { gsap } from "gsap";

const PlanetModel: FC = () => {
  // const {} = useScroll({
  //   offset: 2000,
  // });
  // const [mousePos, setMousePos] = useState<Vector2>(
  //   new Vector2(undefined, undefined)
  // );
  // const [sphereMat, setSphereMat] = useState<ShaderMaterial>();

  const meshRef = useRef<Mesh>(null);
  const gltf = useLoader(GLTFLoader, "/planet/scene.gltf");

  const setShaderMaterial = useCallback(
    (child: Mesh) => {
      if (child.isMesh) {
        if (child.name === "Object_6") {
          const cop = child.clone();
          const mat = createAtmoshpereShader();
          cop.material = mat;
          cop.scale.set(1.5, 1.5, 1.5);
          gltf.scene.add(cop);
          // setSphereMat(mat);
        }
        const material = child.material as MeshStandardMaterial;
        child.material = createPlanetShader(material.map);
      }
    },
    [gltf.scene]
  );

  // mouse
  // useEffect(() => {
  //   window.addEventListener("mousemove", (e) => {
  //     setMousePos(
  //       new Vector2(
  //         (e.clientX / window.innerWidth) * 2 - 1,
  //         -(e.clientY / window.innerHeight) * 2 + 1
  //       )
  //     );
  //   });
  //   return () => removeEventListener("mousemove", () => null);
  // }, [])

  useEffect(() => {
    if (!meshRef || !meshRef.current) return;
    const bounceAnimation = gsap.to(meshRef.current.position, {
      y: 5,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      bounceAnimation.kill();
    };
  }, []);

  useEffect(() => {
    gltf.scene.traverse(setShaderMaterial);
  }, [gltf.scene, setShaderMaterial]);

  useFrame((_, delta) => {
    if (!meshRef || !meshRef.current || !meshRef.current?.rotation) return;

    meshRef.current.rotation.y -= delta / 40;
    // if (sphereMat && sphereMat.uniforms) {
    //   sphereMat.uniforms.uMouse.value = mousePos;
    // }
  });

  return (
    <mesh>
      <primitive
        position={[0, -5, -200]}
        scale={[120, 120, 120]}
        ref={meshRef}
        object={gltf.scene}
      />
    </mesh>
  );
};

export default PlanetModel;
