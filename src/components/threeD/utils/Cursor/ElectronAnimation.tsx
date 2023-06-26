import { useFrame } from "@react-three/fiber";
import { forwardRef } from "react";
import { Group, AdditiveBlending } from "three";

import vertexShader from "../../../../shaders/Mouse/vertex.glsl";
import fragmentShader from "../../../../shaders/Mouse/fragment.glsl";
import { useGetMouseClickedState } from "../../../../hooks/state";

const RADIUS = 0.5;
const BORDER = 0.005;
const PARTICLE_WIDTH = 0.03;
const PARTICLE_SIZE = 15;
const RINGS_SIZE = 4;

let time = 0;

const ElectronRingParticles = forwardRef<Group>((_, ref) => {
  const isMouseClicked = useGetMouseClickedState();

  useFrame(() => {
    if (isMouseClicked) return;
    if (!ref) return;
    // @ts-ignore
    const group = ref.current as Group;
    if (!group) return;
    // const time = clock.getElapsedTime();
    time += 0.015;
    group.children.forEach((child, j) => {
      // const speed = 5000;
      const electronParticlesGroup = child.children[0];

      for (let i = 0; i < PARTICLE_SIZE; i++) {
        const theta = time * 6;
        const x =
          RADIUS *
          Math.cos(
            theta +
              Math.PI / PARTICLE_SIZE +
              // some push
              (j + 1 * i + 1) * (Math.PI / PARTICLE_SIZE) * 1.15
          );
        const y =
          RADIUS *
          Math.sin(
            theta +
              Math.PI / PARTICLE_SIZE +
              (j + 1 * i + 1) * (Math.PI / PARTICLE_SIZE) * 1.15
          );

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
      <group ref={ref}>
        {[...Array(RINGS_SIZE)].map((_, i) => (
          <mesh
            key={i}
            rotation={[
              Math.PI * 0.5,
              Math.PI * 0.5 + i * (Math.PI / RINGS_SIZE),
              0,
            ]}>
            {/* rotation={[Math.PI * (0.25 * (i + 1)), Math.PI * (0.25 * i), 0]}> */}
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
