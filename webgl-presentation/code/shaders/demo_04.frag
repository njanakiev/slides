#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846
#define TAU (2.0 * 3.14159265358979323846)

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main(){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = u_mouse.xy / u_resolution.xy;

    float t = u_time * 0.1;

    vec2 center = vec2(0.25 * sin(TAU * t) + 0.5, 
                       0.25 * cos(TAU * t) + 0.5);

    vec2 toCenter = center - st;
    float angle = atan(toCenter.y, toCenter.x);
    float radius = length(toCenter);

    vec3 c0 = vec3(0.0);
    vec3 c1 = vec3(floor(10.0 * (1.0 - radius)) / 10.0);

    vec3 color = mix(c0, c1, 
            floor(mod(angle / TAU - 0.2 * t, 1.0 / 8.0) * 8.0 * 5.0) / 5.0);

    gl_FragColor = vec4(color,1.0);
}