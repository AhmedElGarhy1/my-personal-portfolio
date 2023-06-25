
uniform float uTime;
uniform sampler2D uTexture;
uniform vec3 color;
uniform vec2 u_resolution;
uniform vec2 uCenter;
uniform float uI;

varying vec2 vUv;

varying vec3 vPosition;
varying vec3 vertexNormal;




void main() {
    // float dist = distance(vUv);
    // float newTime = abs(mod(uTime*0.2, 1.)-0.5);
    // float newUI = abs(mod(uI*0.2, 1.)-0.5);

    // float intensity = 1.2 - dot(vertexNormal, vec3(0.0, 1.0, 0.)*newTime);
    // vec3 atmospere = vec3(0.4, newUI, 0.5-newUI) * pow(intensity, 1.5);
    
    // gl_FragColor = vec4(atmospere, 1.0);

    float intensity = pow(0.5 + dot(vertexNormal, vec3(1.0, 0.5, 1.0)), 3.0);

    float newUI = uI*0.03;

    vec3 color = vec3(vUv,newUI);
    gl_FragColor = vec4(color, 1.) * intensity;
}