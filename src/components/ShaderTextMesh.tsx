import { Text } from "@react-three/drei";
import { ShaderMaterial, Vector3 } from "three";

import vertexShader from "../shaders/Text/vertex.glsl";
import fragmentShader from "../shaders/Text/fragment.glsl";
import { forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useGetMouse3DState } from "../hooks/state";

interface ParamsType {
  text: string;
  position: [number, number, number];
  fontSize?: number;
  textAligh?: "center" | "left" | "right" | "justify";
}

const mousePos = new Vector3(0, 0, 0);

const ShaderTextMesh = forwardRef<Text | undefined, ParamsType>(
  ({ fontSize, position, text, textAligh }, textRef) => {
    const mouse3D = useGetMouse3DState();

    useFrame(({ clock }) => {
      if (!textRef) return;
      // @ts-ignore
      const text = textRef.current as Text;
      if (!text) return;
      const time = clock.getElapsedTime();
      // @ts-ignore
      textRef.current.material.uniforms.uTime = {
        value: time,
      };

      gsap.to(mousePos, {
        x: mouse3D.x,
        y: mouse3D.y,
        z: mouse3D.z,
        duration: 0.3,
        ease: "power2.easeOut",
      });

      // @ts-ignore
      textRef.current.material.uniforms.uMouse = {
        value: mousePos,
      };
    });

    const textMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTextPosition: {
          value: new Vector3(0, 0, 0),
        },
      },
    });

    return (
      <Text
        ref={textRef}
        material={textMaterial}
        anchorX="left"
        anchorY="middle"
        lineHeight={1}
        fontSize={fontSize}
        color="white"
        position={position}
        textAlign={textAligh || "center"}
        outlineColor="black">
        {text}
      </Text>
    );
  }
);

export default ShaderTextMesh;
