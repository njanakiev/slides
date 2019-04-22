#ifdef GL_ES
precision mediump float;
#endif

#define PI  3.14159265358979323846
#define TAU 6.28318530717958647692

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec2 rotate2D(vec2 st, float angle){
    st -= 0.5;
    st =  mat2(cos(angle),-sin(angle),
               sin(angle), cos(angle)) * st;
    st += 0.5;
    return st;
}

vec2 tile(vec2 st, float zoom){
    return fract(st * zoom);
}

float circle(vec2 st, float r){
    vec2 pos = vec2(0.5) - st;
    //return 1.0 - smoothstep(r - (r * 0.05), r + (r * 0.05), length(pos));
    return 1.0 - step(r, length(pos));
}


void main(){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = u_mouse.xy / u_resolution.xy;

    //st = rotate2D(st, PI * 0.25);
    vec2 st0 = tile(st + vec2(cos(u_time), sin(u_time)) * 0.02 + p * 0.2, 10.0);
    vec2 st1 = tile(st + vec2(cos(u_time), sin(u_time)) * 0.01 + p * 0.1, 5.0);
    //vec2 st0 = tile(st + p * 0.2, 10.0);
    //vec2 st1 = tile(st + p * 0.1, 5.0);

    vec3 c0 = vec3(0.075, 0.114, 0.329);
    vec3 c1 = vec3(0.973, 0.843, 0.675);
    vec3 c2 = vec3(0.761, 0.247, 0.102);

    vec3 color = mix(c0,    c1, circle(st0, 0.3) - circle(st0, 0.15));
    color      = mix(color, c2, circle(st1, 0.3) - circle(st1, 0.15));

    gl_FragColor = vec4(color, 1.0);
}