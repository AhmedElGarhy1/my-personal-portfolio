// import { useEffect } from "react";
import { FC, useRef } from "react";
import { Mesh, Vector3, Plane, Vector2 } from "three";
// import { Stars } from "@react-three/drei";
import PlanetModel from "./PlanetModel";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import CircleCursor from "../utils/Cursor/CursorAnimation";
import Content from "./Content";
import { updateMouse3D } from "../../../redux/slices/app";
import { useAppDispatch } from "../../../hooks/store";
import { useGetMouse3DState } from "../../../hooks/state";
// import CircleCursor from "../utils/Cursor/CursorAnimation";
// import NebulaScene from "./NebulaEffect";
// import { gsap } from "gsap";

interface PropsType {
  mouse2D: Vector2 | undefined;
}

const intersectionPoint = new Vector3();
const planeNormal = new Vector3();
const plane = new Plane();

const World: FC<PropsType> = ({ mouse2D }) => {
  const dispatch = useAppDispatch();
  const mouse3D = useGetMouse3DState();
  const starsRef = useRef<Mesh>();

  useFrame((_, delta) => {
    if (!starsRef || !starsRef.current) return;
    starsRef.current.rotation.y += delta / 100;
    starsRef.current.rotation.x += delta / 300;
  });

  useFrame(({ camera, scene, raycaster }) => {
    // get the current mesh position from camera to the 3d Wrold and store it in intersectionPoint
    raycaster.setFromCamera(new Vector2(mouse2D?.x, mouse2D?.y), camera);
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(new Vector2(mouse2D?.x, mouse2D?.y), camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);
    if (
      mouse3D.x === intersectionPoint.x &&
      mouse3D.y === intersectionPoint.y &&
      mouse3D.z === intersectionPoint.z
    )
      return;

    dispatch(
      updateMouse3D({
        x: intersectionPoint.x,
        y: intersectionPoint.y,
        z: intersectionPoint.z,
      })
    );
  });

  // useEffect(() => {
  //   console.log(skyRef?.current);
  //   // gsap.to(skyRef.current.distance);
  // }, []);

  return (
    <>
      {/* lights */}
      {/* <directionalLight intensity={1} position={[5, 0, 20]} />
      <ambientLight intensity={1} /> */}
      {/* controller */}
      {/* <OrbitControls /> */}
      {/* modles */}
      <CircleCursor />
      <PlanetModel />
      {/* <CircleCursor /> */}
      {/* <NebulaScene /> */}
      <Content />
      <Stars
        ref={starsRef}
        radius={50}
        depth={50}
        count={5000}
        factor={6}
        saturation={100}
        fade
        speed={3}
      />

      {/* <Sky
        ref={skyRef}
        distance={10}
        sunPosition={[0, 10, 0]}
        inclination={0}
        azimuth={2}
      /> */}
    </>
  );
};

export default World;
