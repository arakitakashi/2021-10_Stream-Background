uniform sampler2D tDiffuse;

varying vec2 vUv;

// #pragma glslify: blur3 = require('glsl-fast-gaussian-blur/5')

void main()
{
  vec4 color = texture2D(tDiffuse, vUv);
  gl_FragColor = color;
}