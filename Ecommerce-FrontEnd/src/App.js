import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Room from "./components/3DModels/Room";
import Man from "./components/3DModels/Man";

function App() {
  const refScene = useRef(null);
  const refCamera = useRef(null);
  const refRenderer = useRef(null);

  refScene.current = new THREE.Scene();
  refCamera.current = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.3,
    7000
  );
  refRenderer.current = new THREE.WebGLRenderer();

  useEffect(() => {
    const renderer = refRenderer.current;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = false;
    renderer.setClearColor(0x000000);

    document.body.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);

      // Your global animation logic here

      renderer.render(refScene.current, refCamera.current);
    };

    animate();
  }, []);

  return (
    <React.StrictMode>
      <Room
        scene={refScene.current}
        camera={refCamera.current}
        renderer={refRenderer.current}
      />
      <Man
        scene={refScene.current}
        camera={refCamera.current}
        renderer={refRenderer.current}
      />
    </React.StrictMode>
  );
}

export default App;
