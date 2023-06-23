import { useFrame } from "@react-three/fiber";
import { forwardRef } from "react";
import { Group, AdditiveBlending } from "three";

import vertexShader from "../../../../shaders/Mouse/vertex.glsl";
import fragmentShader from "../../../../shaders/Mouse/fragment.glsl";

const RADIUS = 0.4;
const BORDER = 0.002;
const PARTICLE_WIDTH = 0.02;
const PARTICLE_SIZE = 5;
const RINGS_SIZE = 4;

const ElectronRingParticles = forwardRef<Group>((_, ref) => {
  useFrame(({ clock }) => {
    if (!ref) return;
    // @ts-ignore
    const group = ref.current as Group;
    if (!group) return;
    const time = clock.getElapsedTime();
    group.children.forEach((child, j) => {
      // const speed = 5000;
      const electronParticlesGroup = child.children[0];

      for (let i = 0; i < PARTICLE_SIZE; i++) {
        const theta = time;
        const x = RADIUS * Math.cos(theta + i + j);
        const y = RADIUS * Math.sin(theta + i + j);

        electronParticlesGroup.children[i].position.x = x;
        electronParticlesGroup.children[i].position.y = y;
        // @ts-ignore
        electronParticlesGroup.children[i].material.uniforms.uTime = {
          value: time,
        };
      }
    });
  });
  return (
    <>
      <mesh>
        <sphereGeometry args={[0.06]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uI: { value: 1 },
          }}
        />
      </mesh>

      <group ref={ref}>
        {[...Array(RINGS_SIZE)].map((_, i) => (
          <mesh
            key={i}
            rotation={[Math.PI * (0.25 * (i + 1)), Math.PI * (0.25 * i), 0]}>
            <torusGeometry args={[RADIUS, BORDER]} />
            <group>
              {[...Array(PARTICLE_SIZE)].map((_, i) => (
                <mesh key={i}>
                  <sphereGeometry args={[PARTICLE_WIDTH]} />
                  <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    blending={AdditiveBlending}
                    uniforms={{
                      uI: { value: i },
                    }}
                  />
                </mesh>
              ))}
            </group>
          </mesh>
        ))}
      </group>
    </>
  );
});

export default ElectronRingParticles;
