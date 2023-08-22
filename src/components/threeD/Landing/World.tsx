// import { useEffect } from "react";
import { FC, useEffect, useRef } from "react";
import { Mesh, Vector3, Plane, Vector2 } from "three";
// import { Stars } from "@react-three/drei";
import PlanetModel from "./PlanetModel";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import CircleCursor from "../utils/Cursor/CursorAnimation";
import { updateMouse3D } from "../../../redux/slices/app";
import { useAppDispatch } from "../../../hooks/store";
import {
  useGetAspectRatioState,
  useGetMouse3DState,
  useGetScrollYState,
} from "../../../hooks/state";
import { gsap } from "gsap";
import HireMeForm from "../HireMe/HireMeForm";
// import CircleCursor from "../utils/Cursor/CursorAnimation";
// import NebulaScene from "./NebulaEffect";
// import { gsap } from "gsap";

interface PropsType {
  mouse2D: Vector2 | undefined;
  isOpened: boolean;
}

const intersectionPoint = new Vector3();
const planeNormal = new Vector3();
const plane = new Plane();

const World: FC<PropsType> = ({ mouse2D, isOpened }) => {
  // const [isBouncing, setIsBouncing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const mouse3D = useGetMouse3DState();
  const scrollY = useGetScrollYState();
  const aspect = useGetAspectRatioState();

  const starsRef = useRef<Mesh>();
  const meshRef = useRef<Mesh>(null);

  // useEffect(() => {
  //   if (isOpened) {
  //     setIsBouncing(true);
  //     setTimeout(() => {
  //       setIsBouncing(false);
  //     }, 6000);
  //   }
  // }, [isOpened]);

  useEffect(() => {
    if (!meshRef || !meshRef.current) return;
    const tempNum = scrollY / 100;

    if (tempNum < 0) return;
    // planet movement
    else if (tempNum < 50) {
      gsap.to(meshRef.current.position, {
        z: Math.min(tempNum * (innerWidth * 0.0013) - 150, -30),
        x: tempNum / (2 * (5 / aspect)),
        duration: 0.5,
      });
    }
    // intro text movement
  }, [scrollY, aspect]);

  useFrame((_, delta) => {
    if (!starsRef || !starsRef.current) return;
    // let speed = delta;
    // if (isOpened) speed = delta * 10;

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
      <PlanetModel ref={meshRef} />
      {/* <CircleCursor /> */}
      {/* <NebulaScene /> */}
      {/* <Content /> */}
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
      <HireMeForm isOpened={isOpened} />
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
