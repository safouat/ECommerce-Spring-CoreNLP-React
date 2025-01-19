import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Footer from "../comps/Footer";

function Room({ scene, camera, renderer }) {
  const refRoom = useRef(null);
  const refModal = useRef(null);

  useEffect(() => {
    refRoom.current.appendChild(renderer.domElement);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enablePan = true;
    orbit.enableDamping = true;
    //orbit.mouseButtons.LEFT = THREE.MOUSE.PAN;
    //orbit.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;

    // orbit.autoRotate = true;
    orbit.keys = {
      LEFT: "ArrowLeft", //left arrow
      UP: "ArrowUp", // up arrow
      RIGHT: "ArrowRight", // right arrow
      BOTTOM: "ArrowDown", // down arrow
    };
    orbit.listenToKeyEvents(window);
    orbit.keyPanSpeed = 12;

    const cubeGeometry = new THREE.BoxGeometry(3.5, 2, 4.5);

    // Set up the camera position
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath("/media/"); // Set the base path for your textures

    const cubeTexture1 = textureLoader.load("banner.png");
    const cubeTexture2 = textureLoader.load("sol2.jpeg");
    const cubeTexture4 = textureLoader.load("llk.jpeg");

    const cubeTexture3 = textureLoader.load("WHITE1.jpg");
    cubeTexture1.encoding = THREE.sRGBEncoding;
    cubeTexture2.encoding = THREE.sRGBEncoding;
    cubeTexture3.encoding = THREE.sRGBEncoding;
    cubeTexture4.encoding = THREE.sRGBEncoding;
    cubeTexture1.wrapS = THREE.RepeatWrapping;
    cubeTexture1.repeat.x = -1;
    cubeTexture3.wrapS = THREE.RepeatWrapping;
    cubeTexture3.repeat.x = -1;
    cubeTexture2.wrapS = THREE.RepeatWrapping;
    cubeTexture2.repeat.x = -5;

    const materials = [
      new THREE.MeshBasicMaterial({ map: cubeTexture3, side: THREE.BackSide }), // Right
      new THREE.MeshBasicMaterial({ map: cubeTexture3, side: THREE.BackSide }), // Left
      new THREE.MeshBasicMaterial({ map: cubeTexture4, side: THREE.BackSide }), // Top
      new THREE.MeshBasicMaterial({ map: cubeTexture2, side: THREE.BackSide }), // Bottom
      new THREE.MeshBasicMaterial({ map: cubeTexture1, side: THREE.BackSide }), // Front
      new THREE.MeshBasicMaterial({ map: cubeTexture1, side: THREE.BackSide }), // Back
    ];

    // Create the cube
    const cube1 = new THREE.Mesh(cubeGeometry, materials);

    // Add the cube to the scene
    scene.add(cube1);
    cube1.position.z = 0;
    cube1.position.y = 0.54;
    cube1.position.x = -0.4;

    camera.position.z = 2.4;
    camera.position.y = 0.68;
    camera.position.x = -0.3;

    // Animation/rendering loop
    const animate = () => {
      requestAnimationFrame(animate);
      orbit.update();

      // Rotate the model

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div className="App">
      <div className="room" ref={refRoom}></div>
      <div className="modal" ref={refModal}></div>
    </div>
  );
}

export default Room;
