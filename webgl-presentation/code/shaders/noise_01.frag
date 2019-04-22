#ifdef GL_ES
precision mediump float;
#endif

#define PI  3.14159265358979323846
#define TAU 6.28318530717958647692

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 random2(in vec2 st){
    st = vec2( dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)) );
    return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

float noise(in vec2 st){
	vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    //vec2 u = f;
    vec2 u = smoothstep(0.,1.,f);

    return mix(a, b, u.x) + 
    		   (c - a) * u.y * (1.0 - u.x) +
    		   (d - b) * u.x * u.y;
}

float gradientNoise(in vec2 st){
	vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 a = random2(i + vec2(0.0, 0.0));
    vec2 b = random2(i + vec2(1.0, 0.0));
    vec2 c = random2(i + vec2(0.0, 1.0));
    vec2 d = random2(i + vec2(1.0, 1.0));

    //vec2 u = f;
    vec2 u = smoothstep(0.,1.,f);

    return mix( mix( dot( a, f - vec2(0.0,0.0) ), 
                     dot( b, f - vec2(1.0,0.0) ), u.x),
                mix( dot( c, f - vec2(0.0,1.0) ), 
                     dot( d, f - vec2(1.0,1.0) ), u.x), u.y);
}

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = u_mouse.xy / u_resolution.xy;

    //vec3 color = vec3(noise(20.0 * st));
    vec3 color = vec3(gradientNoise(20.0 * st) * 0.5 + 0.5);

    gl_FragColor = vec4(color, 1.0);
}