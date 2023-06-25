// uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vertexNormal;

void main(){
    vUv = uv;
    vPosition = position;
    vertexNormal = normalize(normalMatrix * normal);
    // vec3 newPosition = position + vec3(uTime, uTime, position.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}