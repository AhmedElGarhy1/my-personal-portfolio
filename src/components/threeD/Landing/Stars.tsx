import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";

const count = 3000;

const Stars = () => {
  const ref = useRef<THREE.Mesh>();
  //   const [sphere] = useState(() =>
  //     random.inSphere(new Float32Array(5000), { radius: 1.2 })
  //   );

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const distance = 20;

    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!ref || !ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particlesPosition} stride={3}>
        <PointMaterial transparent color="#f272c8" size={0.2} />
      </Points>
    </group>
  );
};

// const StarsCanvas = () => {
//   return (
//     <div className="w-full h-auto absolute inset-0 z-[-1]">
//       <Canvas camera={{ position: [0, 0, 1] }}>
//         <Suspense fallback={null}>
//           <Stars />
//         </Suspense>

//         <Preload all />
//       </Canvas>
//     </div>
//   );
// };

export default Stars;
