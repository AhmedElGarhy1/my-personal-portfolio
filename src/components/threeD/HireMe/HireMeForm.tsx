import vertexShader from "../../../shaders/Text/vertex.glsl";
import fragmentShader from "../../../shaders/Text/fragment.glsl";
import { useRef, FC, useEffect } from "react";
import { Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useGetMouse3DState } from "../../../hooks/state";
import { gsap } from "gsap";

const mousePos = new Vector3(0, 0, 0);
const visability = { x: 0 };

interface ParamsType {
  isOpened: boolean;
}

const HireMeForm: FC<ParamsType> = ({ isOpened }) => {
  const mouse3D = useGetMouse3DState();

  const formRef = useRef<Mesh>(null);

  useEffect(() => {
    gsap.to(visability, {
      x: isOpened ? 0 : 1,
      duration: 0.5,
      ease: "power2.easeOut",
    });
  }, [isOpened]);

  useFrame(({ clock }) => {
    if (!formRef) return;
    // @ts-ignore
    const form = formRef.current as Text;
    if (!form) return;
    const time = clock.getElapsedTime();
    // @ts-ignore
    form.material.uniforms.uTime = {
      value: time,
    };

    gsap.to(mousePos, {
      x: mouse3D.x,
      y: mouse3D.y,
      z: mouse3D.z,
      duration: 0.3,
      ease: "power2.easeOut",
    });

    //@ts-ignore
    form.material.uniforms.uMouse = {
      value: mousePos,
    };
    //@ts-ignore
    form.material.uniforms.uVisability = {
      value: visability.x,
    };
  });

  //   const noiseMaterial = new shaderMaterial({
  //     vertexShader,
  //     fragmentShader,
  //     uniforms: {
  //       uTextPosition: {
  //         value: new Vector3(position[0], position[1], position[2]),
  //       },
  //     },
  //   });

  return (
    <mesh ref={formRef}>
      <planeGeometry args={[30, 30]} />
      <shaderMaterial
        transparent={true}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
    </mesh>
  );
};

export default HireMeForm;
