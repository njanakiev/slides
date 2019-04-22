precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265358979323846
#define TAU (2.0 * 3.14159265358979323846)

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
	vec2 p = u_mouse.xy / u_resolution.xy;

	vec3 c1 = vec3(1.0, 0.5, 0.5);
	vec3 c2 = vec3(0.5, 1.0, 1.0);

	//float t = st.x;
	//vec3 color = (1.0 - t) * c1 + t * c2;

	float t = 0.1 * u_time;
	vec2 p0 = vec2(0.25 * sin(TAU * t) + 0.5, 
				   0.25 * cos(TAU * t) + 0.5);
	vec2 p1 = vec2(0.25 * sin(TAU * t + PI) + 0.5, 
				   0.25 * cos(TAU * t + PI) + 0.5);

	float d0 = distance(p0, st);
	float d1 = distance(p1, st);

	float ratio = 0.5 * sin(2.0 * TAU * t) + 0.5;
	float t0 = step(ratio, d0 / (d0 + d1));
	vec3 color = (1.0 - t0) * c1 + t0 * c2;

	gl_FragColor = vec4(color, 1.0);
}