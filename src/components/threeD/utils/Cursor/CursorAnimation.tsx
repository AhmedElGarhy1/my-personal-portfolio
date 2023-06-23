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
  const electronRef = useRef<Group>(null);

  useFrame(({ camera, scene, pointer, raycaster }) => {
    const mesh = circleRef.current;
    if (!mesh) return;

    // // update time
    // // @ts-ignore
    // mesh.material.uniforms.uTime = {
    //   value: clock.oldTime / 10000,
    // };
    // // update center
    // // @ts-ignore
    // mesh.material.uniforms.uCenter = {
    //   value: new Vector2(intersectionPoint.x, intersectionPoint.y),
    // };

    // get the current mesh position from camera to the 3d Wrold and store it in intersectionPoint
    raycaster.setFromCamera(pointer, camera);
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);

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
