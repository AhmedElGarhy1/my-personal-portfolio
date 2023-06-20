import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

import { ShaderMaterial, Texture } from "three";

const createPlanetShader = (texture: Texture) => {
  const uniforms = {
    innerTexture: {
      value: texture,
    },
  };

  const planetShaderMaterial = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });
  return planetShaderMaterial;
};

export default createPlanetShader;
