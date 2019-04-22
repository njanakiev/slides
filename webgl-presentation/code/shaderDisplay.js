module.exports = function( canvasId, vert, frag ) {
	const canvas = document.getElementById(canvasId);
	const scene = new THREE.Scene();

	const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true });
	renderer.setPixelRatio( canvas.width / canvas.height );

	const camera = new THREE.Camera();
	camera.position.z = 1;
	
	const geometry = new THREE.PlaneBufferGeometry( 2, 2 );
	const uniforms = {
		u_time: { type: "f", value: 1.0 },
		u_resolution: { type: "v2", value: new THREE.Vector2() },
		u_mouse: { type: "v2", value: new THREE.Vector2() }
	};

	const material = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: vert,
		fragmentShader: frag
	} );

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	onWindowResize();
	window.addEventListener( 'resize', onWindowResize, false );

	canvas.onmousemove = function( event ){
		var rect = canvas.getBoundingClientRect();
		var scaleX = canvas.width / rect.width;
		var scaleY = canvas.height / rect.height;
		uniforms.u_mouse.value.x = (rect.height - (event.pageX - rect.left)) * scaleX;
		uniforms.u_mouse.value.y = (event.pageY - rect.top)  * scaleY;
	}

	function onWindowResize( event ) {
		renderer.setSize( canvas.width, canvas.height );
		uniforms.u_resolution.value.x = renderer.domElement.width;
		uniforms.u_resolution.value.y = renderer.domElement.height;
	}

	function render() {
		requestAnimationFrame( render );
		uniforms.u_time.value += 0.05;
		renderer.render( scene, camera );
	}

	render();
}
