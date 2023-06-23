import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3, Group, Plane } from "three";
import { gsap } from "gsap";
import ElectronRingParticles from "./ElectronAnimation";

const intersectionPoint = new Vector3();
const planeNormal = new Vector3();
const plane = new Plane();

const CircleCursor = () => {
  const circleRef = useRef<Mesh>(null);
  const mouseCursorRef = useRef<Mesh>(null);
  const electronRef = useRef<Group>(null);

  useFrame(({ camera, scene, pointer, raycaster }) => {
    const mesh = circleRef.current;
    const mouseCursor = mouseCursorRef.current;
    if (!mesh || !mouseCursor) return;

    // get the current mesh position from camera to the 3d Wrold and store it in intersectionPoint
    raycaster.setFromCamera(pointer, camera);
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);

    gsap.to(mouseCursor.position, {
      x: intersectionPoint.x,
      y: intersectionPoint.y,
      z: intersectionPoint.z,
      duration: 0.1,
      ease: "power2.easeOut",
    });

    // tempCircle.current.rotation.y += delta;
    gsap.to(mesh.position, {
      x: intersectionPoint.x,
      y: intersectionPoint.y,
      z: intersectionPoint.z,
      duration: 0.5,
      ease: "power2.easeOut",
    });
  });

  return (
    <>
      <group>
        <mesh ref={mouseCursorRef}>
          <sphereGeometry args={[0.06]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh ref={circleRef} position={[0, 0, -10]}>
          <ElectronRingParticles ref={electronRef} />
        </mesh>
      </group>
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
