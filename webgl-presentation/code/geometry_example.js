OrbitControls = require('three-orbit-controls')(THREE)

module.exports = function( canvasId ) {
	const canvas = document.getElementById(canvasId);
	const scene = new THREE.Scene();

	const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
	const camera = new THREE.PerspectiveCamera( 35, canvas.width / canvas.height, 0.1, 1000 );
	camera.position.z = 8;
	camera.position.y = 3;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	
	controls = new OrbitControls(camera, canvas);

	// LIGHTS
	var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	var pointLight = new THREE.PointLight(0xffffff, 0.5);
	pointLight.position.z = 100;
	scene.add(pointLight);

	const geometry = new THREE.TorusGeometry( 1.4, 0.7, 20, 80 );
	const material = new THREE.MeshPhongMaterial( { color: 0x55eeee, shininess: 80.0} );
	const mesh = new THREE.Mesh( geometry, material );
	scene.add(mesh);

	function render() {
		mesh.rotation.x += 0.02;
		mesh.rotation.y += 0.02;
		
		requestAnimationFrame( render );
		renderer.render( scene, camera );
	}

	render();
}