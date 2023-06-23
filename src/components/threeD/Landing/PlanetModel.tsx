import { FC, useRef, useEffect, useCallback } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Vector2 } from "three";

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
  }, []);

  useEffect(() => {
    gltf.scene.traverse(setShaderMaterial);
  }, [gltf.scene, setShaderMaterial]);

  useFrame(({ mouse }, delta) => {
    const mesh = meshRef.current;
    if (!meshRef || !mesh || !mesh?.rotation) return;
    mouse = new Vector2(mouse.y, mouse.x);

    meshRef.current.rotation.y -= delta / 25;

    gsap.to(mesh.rotation, {
      x: -mouse.x * 0.1,
      ease: "Power1.easeOut",
      duration: 5,
    });
    // if (sphereMat && sphereMat.uniforms) {
    //   sphereMat.uniforms.uMouse.value = mousePos;
    // }
  });

  return (
    <mesh>
      <primitive
        position={[0, -1, -50]}
        scale={[30, 30, 30]}
        ref={meshRef}
        object={gltf.scene}
      />
    </mesh>
  );
};

export default PlanetModel;
