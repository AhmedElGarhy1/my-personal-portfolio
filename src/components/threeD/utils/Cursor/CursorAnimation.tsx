import { useRef, FC } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { gsap } from "gsap";
import ElectronRingParticles from "./ElectronAnimation";
import {
  useGetMouse3DState,
  useGetMouseClickedState,
} from "../../../../hooks/state";

const CircleCursor: FC = () => {
  const isMouseClicked = useGetMouseClickedState();
  const circleRef = useRef<Mesh>(null);
  const mouseCursorRef = useRef<Mesh>(null);
  const electronRef = useRef<Group>(null);

  const mouse3D = useGetMouse3DState();

  useFrame(() => {
    const mesh = circleRef.current;
    const mouseCursor = mouseCursorRef.current;
    if (!mesh || !mouseCursor || !mouse3D) return;

    gsap.to(mouseCursor.position, {
      x: mouse3D.x,
      y: mouse3D.y,
      z: mouse3D.z,
      duration: 0.1,
      ease: "power2.easeOut",
    });

    // tempCircle.current.rotation.y += delta;
    if (isMouseClicked) return;
    gsap.to(mesh.position, {
      x: mouse3D.x,
      y: mouse3D.y,
      z: mouse3D.z,
      duration: 0.3,
      ease: "power2.easeOut",
    });
  });

  return (
    <>
      <mesh ref={mouseCursorRef}>
        <sphereGeometry args={[0.08]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh ref={circleRef}>
        <ElectronRingParticles ref={electronRef} />
      </mesh>
    </>
  );
};

export default CircleCursor;

{
  /*<circleGeometry args={[0.5, 32]} />
         <shaderMaterial
         transparent
         vertexShader={vertexShader}
         fragmentShader={fragmentShader}
         // useless  now
         uniforms={{
           uTime: {
              value: 0,
            },
            u_resolution: {
              value: new Vector2(0.5, 0.5),
            },
          }}
        /> */
}
