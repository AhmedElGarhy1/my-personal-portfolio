// import { useRef, useEffect } from "react";
// import { gsap } from "gsap";

// const FollowMouseAnimation = () => {
//   const elementRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const element = elementRef.current;

//     const handleMouseMove = (event: MouseEvent) => {
//       if (!element) return;
//       // Get the current mouse position
//       const { clientX, clientY } = event;

//       // Calculate the desired animation values based on the mouse position
//       const x = clientX - element.offsetWidth / 2;
//       const y = clientY - element.offsetHeight / 2;

//       // Use GSAP to animate the element to the new position
//       gsap.to(element, {
//         top: y,
//         left: x,
//         duration: 0.5,
//         ease: "power2.easeOut",
//       });
//     };

//     // Add the event listener to track mouse movement
//     window.addEventListener("mousemove", handleMouseMove);

//     // Clean up the event listener when the component is unmounted
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <div
//       className="w-20 h-20 rounded-full bg-transparent fixed z-50 border-[var(--main-color)] border"
//       ref={elementRef}></div>
//   );
// };

// export default FollowMouseAnimation;

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3, Vector2, Raycaster, Plane } from "three";
import { gsap } from "gsap";

import vertexShader from "../../../shaders/Mouse/vertex.glsl";
import fragmentShader from "../../../shaders/Mouse/fragment.glsl";

const intersectionPoint = new Vector3();
const planeNormal = new Vector3();
const plane = new Plane();
const raycaster = new Raycaster();

const CircleCursor = () => {
  const circleRef = useRef<Mesh>(null);

  useFrame(({ camera, mouse, scene, clock }) => {
    const mesh = circleRef.current;
    if (!mesh) return;
    // update time
    // @ts-ignore
    mesh.material.uniforms.uTime = {
      value: clock.oldTime / 1000000,
    };
    // update center
    // @ts-ignore
    mesh.material.uniforms.uCenter = {
      value: new Vector2(intersectionPoint.x, intersectionPoint.y),
    };

    // get the current mesh position from camera to the 3d Wrold and store it in intersectionPoint
    raycaster.setFromCamera(mouse, camera);
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);

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
      <mesh ref={circleRef} position={[0, 0, -10]}>
        <circleGeometry args={[0.5, 32]} />
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
        />
      </mesh>
    </>
  );
};

export default CircleCursor;
