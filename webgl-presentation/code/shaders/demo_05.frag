#ifdef GL_ES
precision mediump float;
#endif

#define PI  3.14159265358979323846
#define TAU 6.28318530717958647692

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float square(vec2 st, float left, float right, float top, float bottom) {
    //vec2 bl = step(vec2(0.1),st);       // bottom-left
    //vec2 tr = step(vec2(0.1),1.0-st);   // top-right
    //color = vec3(bl.x * bl.y * tr.x * tr.y);

    return step(left, st.x) *  step(bottom, st.y) * 
           step(right, 1.0 - st.x) * step(top, 1.0 - st.y);
}

float circle(in vec2 st) {
    // Remap to -1 to 1
    st = st * 2.0 - 1.0;

    // Circular Shape
    float d = length(st) / 2.0;
    // Star Shape
    //float d = length( min(abs(st) - 0.51, 0.0) );
    // Rectangular Shape
    //float d = length( max(abs(st) - 0.2, 0.0) );
    //float d = length( vec2(max(abs(st.x) - 0.1, 0.0), 
    //                       max(abs(st.y) - 0.4, 0.0)));

    // Circle
    //return step(0.5, d);

    // Ring
    //return smoothstep(0.0, 0.21, d) * smoothstep(0.22, 0.21, d);

    // Rings
    return step(0.25, fract(d * 10.0));
}

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = u_mouse.xy / u_resolution.xy;

    //vec3 color = vec3(square(st, 0.2, 0.3, 0.2, 0.3));
    vec3 color = vec3(circle(st));

    gl_FragColor = vec4(color, 1.0);
}