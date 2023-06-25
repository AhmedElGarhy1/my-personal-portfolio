import { useMemo, useRef } from "react";
import { Group, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";

import vertextShader from "../../../shaders/Nebula/vertex.glsl";
import fragmentShader from "../../../shaders/Nebula/fragment.glsl";

const count = 40000;

const InnerStars = () => {
  const nebulaPointsGroupRef = useRef<Group>(null);
  // This reference gives us direct access to our points
  // const points = useRef();

  // Generate our positions attributes array
  useFrame(({ clock }) => {
    if (!nebulaPointsGroupRef || !nebulaPointsGroupRef.current) return;

    const time = clock.getElapsedTime();
    const pointsGroup = nebulaPointsGroupRef.current;
    pointsGroup.children.forEach((points) => {
      // @ts-ignore
      points.material.uniforms.uTime = { value: time };
      points.rotation.y += Math.random() / 100;
      // points.rotation.z += delta * 0.05;
    });
  });

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const distance = 3;

    for (let i = 0; i < count; i++) {
      const theta = MathUtils.randFloatSpread(360) * 2;
      const phi = MathUtils.randFloatSpread(360) * 0.25;

      const x = distance * Math.sin(theta) * Math.cos(phi) * Math.random() * 2;
      const y = distance * Math.sin(theta) * Math.sin(phi) * Math.random() * 2;
      const z = distance * Math.cos(theta) * Math.random();

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, []);

  return (
    <group position={[0, 0, -50]} ref={nebulaPointsGroupRef}>
      {[...Array(6)].map((_, i) => (
        <points
          key={i}
          rotation={[0, Math.PI, 0]}
          position={[(3 - i) * 3, 0, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlesPosition.length / 3}
              array={particlesPosition}
              itemSize={3}
            />
          </bufferGeometry>

          <shaderMaterial
            vertexShader={vertextShader}
            fragmentShader={fragmentShader}
            uniforms={{
              uSize: { value: 1 },
              uTime: { value: 0 },
            }}
            transparent
          />
        </points>
      ))}
    </group>
  );
};

export default InnerStars;
