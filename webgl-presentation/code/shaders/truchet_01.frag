#ifdef GL_ES
precision mediump float;
#endif

#define PI  3.14159265358979323846
#define TAU 6.28318530717958647692

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


mat2 rotate2d(in float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}
mat2 scale(in vec2 scale){
    return mat2(scale.x, 0.0, 0.0, scale.y);
}
float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 truchetPattern(in vec2 st, in float idx) {
    idx = fract(((idx - 0.5) * 2.0));
    if (idx > 0.75) {
        st = vec2(1.0) - st;
    } else if (idx > 0.5) {
        st = vec2(1.0 - st.x, st.y);
    } else if (idx > 0.25) {
        st = 1.0 - vec2(1.0 - st.x, st.y);
    }
    return st;
}

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = u_mouse.xy / u_resolution.xy;

    st.x += u_time * 0.02;
    vec2 pos = 10.0 * st + p;

    vec2 ipos = floor(pos);  // integer
    vec2 fpos = fract(pos);  // fraction
    
    // Truchet pattern
    vec2 tile = truchetPattern(fpos, random( ipos ));
    
    vec3 color = vec3(step(length(tile), 0.65) - 
                      step(length(tile), 0.35) + 
                      step(length(tile - 1.0), 0.65) - 
                      step(length(tile - 1.0), 0.35));

    //vec3 color = vec3(step(tile.x,tile.y));

    gl_FragColor = vec4(color, 1.0);
}