"use strict";

function Lights(scene) {

	var ambientLightColor = new THREE.Color("rgb(255, 255, 255)");
	var ambientLight = new THREE.AmbientLight(ambientLightColor, 0.5);
	ambientLight.name = "ambientLight";
	ambientLight.position.set(15, 3000, 40);

	scene.add(ambientLight);

	var spotLightColor = new THREE.Color("rgb(255, 255, 255)");
	var spotLight = new THREE.PointLight(spotLightColor, 0.525);
	spotLight.name = "spotLight";
	spotLight.position.set(-300, 1500, -1570);

	scene.add(spotLight);

	this.update = function (time) {
		spotLight.intensity = (Math.sin(time) + 1.5) / 1.5;
		spotLight.color.setHSL(Math.sin(time), 0.5, 0.5);
	};
}
"use strict";

function SceneSubject(scene) {

	var radius = 2;
	var mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(radius, 2), new THREE.MeshStandardMaterial({ flatShading: true }));

	mesh.position.set(0, 0, -20);

	scene.add(mesh);

	this.update = function (time) {
		var scale = Math.sin(time) + 2;

		mesh.scale.set(scale, scale, scale);
	};
}
"use strict";

function Scene(canvas) {

    var clock = new THREE.Clock();

    var screenDimensions = {
        width: canvas.width,
        height: canvas.height
    };

    var scene = buildScene();
    var renderer = buildRender(screenDimensions);
    var camera = buildCamera(screenDimensions);
    var sceneSubjects = createSceneSubjects(scene);

    function buildScene() {
        var scene = new THREE.Scene();
        scene.background = new THREE.Color("#000");

        return scene;
    }

    function buildRender(_ref) {
        var width = _ref.width,
            height = _ref.height;

        var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        var DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    function buildCamera(_ref2) {
        var width = _ref2.width,
            height = _ref2.height;

        var aspectRatio = width / height;
        var fieldOfView = 60;
        var nearPlane = 1;
        var farPlane = 100;
        var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        return camera;
    }

    function createSceneSubjects(scene) {
        var sceneSubjects = [new Lights(scene), new SceneSubject(scene)];

        return sceneSubjects;
    }

    this.update = function () {
        var elapsedTime = clock.getElapsedTime();

        for (var i = 0; i < sceneSubjects.length; i++) {
            sceneSubjects[i].update(elapsedTime);
        }renderer.render(scene, camera);
    };

    this.onWindowResize = function () {
        var width = canvas.width,
            height = canvas.height;


        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    };
}
