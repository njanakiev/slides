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

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 p =  u_mouse.xy / u_resolution.xy;
    vec3 color = vec3(0.0);

    st *= 5.0;

    // Tile the space
    vec2 i = floor(st);
    vec2 f = fract(st);

    float m_dist = 100.0;
    vec2 m_point;

    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = random2(i + neighbor);
            point = 0.5 + 0.5 * sin(0.2 * u_time + TAU * point);

            float dist = length(neighbor + point - f);

            if( dist < m_dist ) {
                m_dist = dist;
                m_point = point;
            }
        }
    }
    float dist = distance(st, (1.0 - p) * 5.0);
    if(dist < m_dist){
        color.b += 1.0;
        color.g += 1.0;
    }else{
        //color += m_dist;
        color += dot(m_point, vec2(0.3, 0.6));
        //color += 0.7 * step(0.4, fract(m_dist * 6.1));
    }
    // Display Grid
    //color.r += step(.98, f.x) + step(.98, f.y);
    gl_FragColor = vec4(color, 1.0);
}