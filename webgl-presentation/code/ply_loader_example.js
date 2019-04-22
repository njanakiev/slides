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

	var mesh;

	var loader = new THREE.PLYLoader();
	loader.load( './code/models/bunny.ply', function ( geometry ) {
		geometry.computeVertexNormals();
		const material = new THREE.MeshNormalMaterial();
		mesh = new THREE.Mesh( geometry, material );
		mesh.scale.multiplyScalar( 20.0 );

		mesh.position.x =  0.0;
		mesh.position.y = -2.0;
		mesh.position.z =  0.0;

		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add( mesh );

		console.log("Loaded Mesh");
	} );

	function render() {
		if(mesh){
			mesh.rotation.y += 0.02;
		}

		requestAnimationFrame( render );
		renderer.render( scene, camera );
	}

	render();
}