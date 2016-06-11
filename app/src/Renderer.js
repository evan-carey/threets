"use strict";
const InputHandler_1 = require("./InputHandler");
class Renderer {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cMatrix = new THREE.Matrix4();
        this.camXAngle = 0.0;
        this.camYAngle = 0.0;
        this.camXPos = 0.0;
        this.camYPos = 3.0;
        this.camZPos = 5.0;
        this.camXSpeed = 0.0;
        this.camYSpeed = 0.0;
        this.camZSpeed = 0.0;
        this.speed = 0.2;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveRight = false;
        this.moveLeft = false;
        this.moveUp = false;
        this.moveDown = false;
        this.pointerLock = false;
        this.frames = 0;
        this.onWindowResize = () => {
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        this.camera.position.set(this.camXPos, this.camYPos, this.camZPos);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        let pLight = new THREE.PointLight(0xffffff, .7);
        pLight.position.set(3, 10, 3);
        this.scene.add(pLight);
        let aLight = new THREE.AmbientLight(0xffffff, 0.1);
        this.scene.add(aLight);
        let planeGeometry = new THREE.PlaneGeometry(10, 10);
        let planeMaterial = new THREE.MeshPhongMaterial({ color: 0x444444, specular: 0x888888, shininess: 20 });
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.rotation.x = -Math.PI / 2;
        this.scene.add(this.plane);
        let geometry = new THREE.BoxGeometry(2, 2, 2);
        let material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            specular: 0xffffff,
            shininess: 56
        });
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.translateY(1);
        this.scene.add(this.cube);
        this.inputHandler = new InputHandler_1.InputHandler(this.camera);
        window.addEventListener("resize", this.onWindowResize, false);
        this.startTime = Date.now();
    }
    update() {
        this.cube.rotateY(0.01);
        this.inputHandler.update();
    }
    timer() {
        let dt = Date.now() - this.startTime;
        if (dt >= 1000) {
            this.frames = 0;
            this.startTime = Date.now();
        }
        this.frames++;
    }
    render() {
        this.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
    }
}
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map