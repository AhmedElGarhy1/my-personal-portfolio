import { Vector2 } from "three";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

import { ShaderMaterial, AdditiveBlending, BackSide } from "three";

const createAtmoshpereShader = () => {
  const uniforms = {
    uMouse: {
      value: new Vector2(0, 0),
    },
  };
  const atmoshpereShaderMaterial = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    blending: AdditiveBlending,
    side: BackSide,
  });
  return atmoshpereShaderMaterial;
};

export default createAtmoshpereShader;
