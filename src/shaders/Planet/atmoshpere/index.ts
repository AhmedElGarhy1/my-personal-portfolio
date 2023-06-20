import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

import { ShaderMaterial, AdditiveBlending, BackSide } from "three";

const createAtmoshpereShader = () => {
  const atmoshpereShaderMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    blending: AdditiveBlending,
    side: BackSide,
  });
  return atmoshpereShaderMaterial;
};

export default createAtmoshpereShader;
