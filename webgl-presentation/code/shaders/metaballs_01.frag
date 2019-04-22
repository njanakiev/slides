#ifdef GL_ES
precision mediump float;
#endif

#define PI  3.14159265358979323846
#define TAU 6.28318530717958647692

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in float val) {
    return fract(sin(val * 12.9898) * 43758.5453123);
}

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 random2(in float val){
    vec2 st = vec2( dot(vec2(val), vec2(127.1, 311.7)), dot(vec2(val), vec2(269.5, 183.3)) );
    return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

vec2 random2(in vec2 st){
    st = vec2( dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)) );
    return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 p =  u_mouse.xy / u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 m_dist = vec3(0.0);
    const int n = 10;
    for(int i=0; i<n; i++){
        vec2 pos = random2(vec2(float(i), 0.2)) * 0.2 + 0.5;
        float angle  = mix(0.0,  TAU, random(float(i)));
        float radius = mix(0.01, 0.2, random(float(i)));
        float freq = 1.0;
        if(random(float(i)) > 0.5){
            freq = -1.0;
        }
        vec2 offset = radius*vec2(sin(freq*u_time + angle), cos(freq*u_time + angle));

        //m_dist += 1.0 / distance(st, pos + offset);
        m_dist.r += 1.0 / distance(st + vec2(0.00, 0.00), pos + offset);
        m_dist.g += 1.0 / distance(st + vec2(0.01, 0.01), pos + offset);
        m_dist.b += 1.0 / distance(st + vec2(0.05, 0.00), pos + offset);
    }
    m_dist.r -= 2.0 / distance(st + vec2(0.00, 0.00), 1.0 - p);
    m_dist.g -= 2.0 / distance(st + vec2(0.01, 0.01), 1.0 - p);
    m_dist.b -= 2.0 / distance(st + vec2(0.05, 0.00), 1.0 - p);

    
    //color += step(0.5, m_dist * 0.01);
    color += smoothstep(0.49, 0.5, m_dist * 0.01);
    
    //color += step(0.5, fract(m_dist * 0.226)) -
    //         step(0.5, m_dist * 0.01);
    //color += smoothstep(0.49, 0.51, fract(m_dist * 0.226)) -
    //         smoothstep(0.49, 0.51, m_dist * 0.01);

    gl_FragColor = vec4(color, 1.0);
}