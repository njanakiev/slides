const glslify = require('glslify');
const path = require('path');

const webgl_example = require('./code/webgl_example');
const simple_cube = require('./code/simple_cube');
const geometry_example = require('./code/geometry_example');
const ply_loader_example = require('./code/ply_loader_example');
const shaderDisplay = require('./code/shaderDisplay');


// More info https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
	history: true,

	// More info https://github.com/hakimel/reveal.js#dependencies
	dependencies: [
		{ src: 'plugin/markdown/marked.js' },
		{ src: 'plugin/markdown/markdown.js' },
		{ src: 'plugin/notes/notes.js', async: true },
		{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
		{ src: 'plugin/math/math.js', async: true }
	]
});

webgl_example('canvas_webgl_example');

simple_cube('canvas_01');
simple_cube('canvas_02');

geometry_example('canvas_torus');

ply_loader_example('canvas_bunny');

shaderDisplay('canvas_simple_fragment', 
	glslify(path.resolve(__dirname, './code/shaders/basic.vert')), 
	glslify(path.resolve(__dirname, './code/shaders/demo_01.frag')));

shaderDisplay('canvas_fragment_01', 
	glslify(path.resolve(__dirname, './code/shaders/basic.vert')), 
	glslify(path.resolve(__dirname, './code/shaders/metaballs_01.frag')));

shaderDisplay('canvas_fragment_02', 
	glslify(path.resolve(__dirname, './code/shaders/basic.vert')), 
	glslify(path.resolve(__dirname, './code/shaders/voronoi_01.frag')));
