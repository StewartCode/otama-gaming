import * as THREE from "three";
import App from "./App";
import fragmentShader from "../shaders/eye/fragment.glsl";
import vertexShader from "../shaders/eye/vertex.glsl";
import gsap from "gsap";

export default class Eye {
  constructor(group, position, randomBlinkTimeArray) {
    this.group = group;
    this.position = position;
    this.randomBlinkTimeArray = randomBlinkTimeArray;
    this.app = new App();

    this.blinkValue = {
      value: 1.0,
    };

    //cache
    this.count = 0;

    this.start();
    this.animation();
  }

  start() {
    this.geometry = new THREE.SphereGeometry(0.00027, 32, 32);
    this.material = new THREE.ShaderMaterial({
      //  color: new THREE.Color("#ffffff"),
      side: THREE.DoubleSide,
      transparent: true,
      fragmentShader,
      vertexShader,
      uniforms: {
        time: {
          value: this.app.time.elapsed,
        },
        aspectRatio: {
          value: new THREE.Vector2(this.app.sizes.width, this.app.sizes.height),
        },
        blinkValue: {
          value: this.blinkValue.value,
        }
      },
    });

    this.instance = new THREE.Mesh(this.geometry, this.material);

    this.instance.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    );

    // this.instance.renderOrder = 500;
    // this.instance.material.depthTest = false; // Disable depth testing
    // this.instance.material.depthWrite = false; // Disable writing to the depth buffer

    this.group.add(this.instance);
  }

  blinkAnimation() {
    gsap.timeline({repeat: -1})
      .to(this.instance.material.uniforms.blinkValue, {
        value: 0.0,
        duration: 0.05,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
      })
      .to({}, {duration: this.randomBlinkTimeArray[this.count]}); // This creates a delay

      this.count++;
      if(this.count >= this.randomBlinkTimeArray.length) {
        this.count = 0;
      }
  }

  animation() {

    this.blinkAnimation();

    document.addEventListener("mousemove", (e) => {
      let x = e.clientX / this.app.sizes.width;
      let y = e.clientY / this.app.sizes.height;

      x = x * 2.0 - 1.0;
      y = y * 2.0 - 0.7;

      this.instance.rotation.set(y * Math.PI * 0.25, x * Math.PI * 0.25, 0);
    });
  }
}
