OrbitControls = require('three-orbit-controls')(THREE)

module.exports = function( canvasId ) {
	const canvas = document.getElementById(canvasId);
	const scene = new THREE.Scene();

	const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
	const camera = new THREE.PerspectiveCamera( 35, canvas.width / canvas.height, 0.1, 1000 );
	camera.position.z = 8;
	camera.position.y = 3;
	camera.lookAt(new THREE.Vector3(0,0,0));
	
	controls = new OrbitControls(camera, canvas);

	const geometry = new THREE.BoxGeometry(2, 2, 2);
	const material = new THREE.MeshNormalMaterial();
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	function render() {
		mesh.rotation.y += 0.02;

		requestAnimationFrame( render );
		renderer.render( scene, camera );
	}

	render();
}