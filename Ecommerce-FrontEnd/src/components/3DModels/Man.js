import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Modal5 from "../Modals/Modal5";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "../comps/header";

export default function Man({ scene, camera, renderer }) {
  const refman = useRef(null);
  const [partName, setPartName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alert1, setAlert1] = useState(true);

  const [Data, setData] = useState("");
  const [SecondModal, setSecondModal] = useState(false);
  const [model, setModel] = useState(null);
  const [gender, setGender] = useState(null);
  const refAllow3D = useRef(true);

  useEffect(() => {
    refman.current.appendChild(renderer.domElement);

    const gltfLoader = new GLTFLoader();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    //StarSaf1230

    let objects = [];

    const token = localStorage.getItem("token");

    fetch(`//ec2-16-171-7-236.eu-north-1.compute.amazonaws.com:8080/ShowUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.gender);

        const modelPath =
          data.gender === 2
            ? "https://cdns1.s3.eu-north-1.amazonaws.com/female.gltf"
            : "https://cdns1.s3.eu-north-1.amazonaws.com/Safouatfinal124.gltf";

        setModel(modelPath);
        gltfLoader.load(
          modelPath,
          (gltf) => {
            const model = gltf.scene;
            scene.add(model);
            setAlert1(false);

            model.position.x = -1.11;
            model.rotation.y += 0.05;
            model.position.z = 0.1;
            model.position.y += 0.2;
            model.scale.y = 1;

            addNamesToParts(model);
            animate();
          },
          undefined,
          (error) => {
            setData("We are Loading your 3D model");

            setAlert(true);
          }
        );
      })
      .catch((error) => {
        setData("Create an account to get started.");
        setAlert1(false);

        setAlert(true);
      });
    function addNamesToParts(model) {
      model.traverse((child) => {
        if (child.isMesh) {
          const partName = child.name;
          child.userData.name = partName;
          objects.push(child);

          if (
            partName === "Mesh_1" ||
            partName === "Body_SimplifyB" ||
            partName === "Cornea.l"
          ) {
            child.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
          } else if (partName === "Corneal") {
            child.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
          } else if (partName === "Cornear") {
            child.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
          } else if (partName === "Hairs_of_head") {
            child.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
          } else if (partName === "Hairs_of_eyebrowl") {
            child.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
          } else if (partName === "Hairs_of_eyebrowr") {
            child.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
          }
        }
      });
    }

    function onClick(event) {
      if (refAllow3D.current && objects) {
        // Check if objects are defined
        const canvasBounds = event.target.getBoundingClientRect();
        mouse.x =
          ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
        mouse.y =
          -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(objects, false);
        console.log(intersects);

        if (intersects.length > 0) {
          const clickedPart = intersects[0].object;
          clickedPart.material = new THREE.MeshBasicMaterial({
            color: 0x000000,
          });
          const partName = clickedPart.userData.name;
          setPartName(partName);
          setOpenModal(true);
          refAllow3D.current = false;
        }
      }
    }

    function onWindowResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("click", onClick);
    };
  }, [camera, renderer, scene]);

  const closeModal = () => {
    setOpenModal(false);
    refAllow3D.current = true;
  };

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  const makeOpenAIRequest = ({ Symptomps, partName }) => {
    closeModal();
    setSecondModal(true);
  };

  return (
    <div className="App">
      <Header />
      <div className="man" ref={refman}></div>

      {openModal && (
        <Modal5
          partName={partName}
          closeModal={closeModal}
          makeOpenAIRequest={makeOpenAIRequest}
        />
      )}
      {alert && (
        <div className="alert alert-danger " role="alert">
          <h4 className="alert-heading">Sorry!</h4>
          <p>{Data}</p>
        </div>
      )}
      {alert1 && (
        <div id="loader">
          <img src="./media/loader.gif" alt="Loading..." />
        </div>
      )}
    </div>
  );
}
