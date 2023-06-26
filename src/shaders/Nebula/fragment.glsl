uniform sampler2D uTexture;
uniform float uTime;

varying vec3 vNewPos;
varying vec2 uVu;
varying float uNoise;



void main(){


    // gl_FragColor = vec4(clamp(uNoise, 0.5, 0.9), (vNewPos.xyz*uNoise*2.).xy,abs(1.-uNoise));
    gl_FragColor = texture2D(uTexture, uVu);
    // gl_FragColor =vec4(1.,0.,0.,1.);
}