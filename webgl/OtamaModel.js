import * as THREE from "three";
import App from "./App";
import Helper from "./Helper";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Eye from "./Eye";
import gsap from "gsap";

export default class OtamaModel {
  constructor() {
    this.app = new App();
    this.helper = new Helper();
    this.markerElement = document.getElementById("marker");
    this.startTrackingPosition = false;
    this.group = new THREE.Group();
    this.group.name = "otamaModelGroup";
    this.app.scene.add(this.group);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
        "https://www.gstatic.com/draco/versioned/decoders/1.4.1/"
      );
    loader.setDRACOLoader(dracoLoader);


    loader.load("otamatone-compressed.glb", (gltf) => {
      this.model = gltf.scene.children[0].children[0];
      this.start();
      this.addEyes();
      this.animation();
      this.startTrackingPosition = true;
    });
  }

  start() {
    this.geometry = this.model.geometry;
    this.geometry.computeVertexNormals();

    this.material = new THREE.MeshPhongMaterial({
      color: new THREE.Color("#0099FF"),
      side: THREE.DoubleSide,
    });
    this.instance = new THREE.Mesh(this.geometry, this.material);
    this.instance.name = "otamaModelInstance";

    this.instance.scale.set(0.00015, 0.00015, 0.00015);
    this.instance.rotation.set(-Math.PI * 0.35, Math.PI * 0.0, -Math.PI * 0.5);
    this.instance.position.set(0.0015, -0.0015, 0);
    this.group.add(this.instance);
  }

  addEyes() {

    // add random blink action
    const randomBlinkTimeArray = [];

    for (let i = 0; i < 20; i++) {
        randomBlinkTimeArray.push(Math.random() * 3 + Math.random() * 3);
    }

    this.leftEye = new Eye(
      this.group,
      new THREE.Vector3(-0.00048, -0.0004, 0.0023),
      randomBlinkTimeArray
    );
    this.rightEye = new Eye(
      this.group,
      new THREE.Vector3(0.00048, -0.0004, 0.0023),
      randomBlinkTimeArray
    );
  }

  followTarget() {
    this.targetPosition = this.helper.update3DObjectPositionWithOffsetX(
      this.markerElement,
      this.group,
      this.app.camera.instance,
      0,
      0
    );

    this.group.position.x = this.helper.lerp(
      this.group.position.x,
      this.targetPosition.x,
      0.1
    );
    this.group.position.y = this.helper.lerp(
      this.group.position.y,
      this.targetPosition.y,
      0.1
    );
    this.group.position.z = this.helper.lerp(
      this.group.position.z,
      this.targetPosition.z,
      0.1
    );
  }

  animation() {

    document.addEventListener("mousemove", (e) => {
      let x = e.clientX / this.app.sizes.width;
      let y = e.clientY / this.app.sizes.height;

      x = x * 2.0 - 1.0;
      y = y * 2.0 - 0.7;

      this.group.rotation.set(
        y * Math.PI * 0.05,
        x * Math.PI * 0.1,
        0
      );
    });
  }

  update() {
    if (this.startTrackingPosition) {
      this.followTarget();
    }
  }
}
