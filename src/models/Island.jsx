import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import helCat from "../assets/3d/helCat.glb";
import eCat from "../assets/3d/eCat.glb";
import { Html } from "@react-three/drei";

import islandScene from "../assets/3d/peachisland.glb";

const Island = ({
  isRotating,
  setIsRotating,
  setIsRotatingLeft,
  setIsRotatingRight,
  ...props
}) => {
  const { gl } = useThree();
  const islandRef = useRef();
  const { nodes, materials } = useGLTF(islandScene);
  const { nodes: helCatNodes, materials: helCatMaterials } = useGLTF(helCat);
  const { nodes: eCatNodes, materials: eCatMaterials } = useGLTF(eCat);

  

  const [showPopup, setShowPopup] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showHobby, setShowHobby] = useState(false);
  const [showProjects, setShowProjects] = useState(false);



  const [arrowKeysPressed, setArrowKeysPressed] = useState(false);

  useEffect(() => {
    islandRef.current.rotation.y = 0;
  }, []);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    
    if (arrowKeysPressed || !isRotating) return;

    e.stopPropagation();
    e.preventDefault();
  
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / window.innerWidth;
  
      if (delta > 0) {
        setIsRotatingLeft(true);
        setIsRotatingRight(false);
      } else if (delta < 0) {
        setIsRotatingLeft(false);
        setIsRotatingRight(true);
      }
  
      islandRef.current.rotation.y += delta * 0.5 * Math.PI; // Adjust the multiplier for mouse rotation speed
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.5 * Math.PI;
  
      const rotationDegrees =
        ((islandRef.current.rotation.y * 180) / Math.PI) % 360;
      console.log("Rotation Degrees:", rotationDegrees);
  
      if (rotationDegrees >= 0 && rotationDegrees <= 45) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    }
  };
  






  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setArrowKeysPressed(true);
      setIsRotating(true);
      islandRef.current.rotation.y += 0.005 * Math.PI; // Adjust the rotation increment
      rotationSpeed.current = 0.02; // Adjust the multiplier
    } else if (e.key === "ArrowRight") {
      setArrowKeysPressed(true);
      setIsRotating(true);
      islandRef.current.rotation.y -= 0.005 * Math.PI; // Adjust the rotation increment
      rotationSpeed.current = -0.02; // Adjust the multiplier
    }

    const rotationDegrees =
      ((islandRef.current.rotation.y * 180) / Math.PI) % 360;
    console.log("Rotation Degrees:", rotationDegrees);

    if (
      (rotationDegrees >= 0 && rotationDegrees <= 45) ||
      (rotationDegrees >= 315 && rotationDegrees <= 360) ||
      (rotationDegrees <= 0 && rotationDegrees >= -45) ||
      (rotationDegrees <= -315 && rotationDegrees >= -360)
    ) {
      setShowPopup(true);
      setShowAbout(false);
      setShowHobby(false);
      setShowProjects(false);
    }

    if (
      (rotationDegrees >= 150 && rotationDegrees <= 210) ||
      (rotationDegrees >= -210 && rotationDegrees <= -150)
    ) {
      setShowPopup(false);
      setShowAbout(false);
      setShowHobby(true);
      setShowProjects(false);
    }

    if (
      (rotationDegrees >= 250 && rotationDegrees <= 290) ||
      (rotationDegrees >= -290 && rotationDegrees <= -250)
    ) {
      setShowPopup(false);
      setShowAbout(true);
      setShowHobby(false);
      setShowProjects(false);
    }

    if (
      (rotationDegrees >= 70 && rotationDegrees <= 120) ||
      (rotationDegrees >= -120 && rotationDegrees <= -70)
    ) {
      setShowPopup(false);
      setShowAbout(false);
      setShowHobby(false);
      setShowProjects(true);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
      setArrowKeysPressed(false);
    }
  };

  useEffect(() => {
    const handleKeyDownWrapper = (e) => handleKeyDown(e);
    const handleKeyUpWrapper = (e) => handleKeyUp(e);

    window.addEventListener("keydown", handleKeyDownWrapper);
    window.addEventListener("keyup", handleKeyUpWrapper);

    return () => {
      window.removeEventListener("keydown", handleKeyDownWrapper);
      window.removeEventListener("keyup", handleKeyUpWrapper);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl, handlePointerDown, handlePointerMove, handlePointerUp]);

  return (
    <>
      {showPopup && (
        <Html position={[0, -3.2, 0]}>
          <div
            style={{
              textAlign: "center",
              top: "10px",
              width: "500px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#fff",
              fontSize: "18px",
            }}
          >
            <p style={{ display: "inline-block", margin: 0 }}>
              Hi I'm Rohit Pathak. Travel around the castle to know more about me.
              
            </p>
          </div>
        </Html>
      )}

      {showAbout && (
        <Html position={[0, -3.2, 0]}>
          <div
            style={{
              textAlign: "center",
              top: "10px",
              width: "500px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#fff",
              fontSize: "18px",
            }}
          >
            <p style={{ display: "inline-block", margin: 0 }}>
              Let's get the information about my <a href="/projects"><span className="text-emerald-100 font-bold underline">PROJECTS</span></a>.
            </p>
          </div>
        </Html>
      )}

      {showHobby && (
        <Html position={[0, -3.2, 0]}>
          <div
            style={{
              textAlign: "center",
              top: "10px",
              width: "500px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#fff",
              fontSize: "18px",
            }}
          >
            <p style={{ display: "inline-block", margin: 0 }}>
              Let's get the information about my <a href="/hobby"><span className="text-emerald-100 font-bold underline">HOBBY</span></a>.
            </p>
          </div>
        </Html>
      )}

      {showProjects && (
        <Html position={[0, -3.2, 0]}>
          <div
            style={{
              textAlign: "center",
              top: "10px",
              width: "500px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#fff",
              fontSize: "18px",
            }}
          >
            <p style={{ display: "inline-block", margin: 0 }}>
              Let's get the information <a href="/about"><span className="text-emerald-100 font-bold underline">ABOUT ME</span></a>.
            </p>
          </div>
        </Html>
      )}

      <group ref={islandRef} {...props} scale={0.08} position={[0, -2, -3]}>
        <group
          position={[1.354, -0.33, -0.11]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.592, 0.572, 0.435]}
        >
          <mesh
            geometry={nodes.Circle001_Dirt_0.geometry}
            material={materials.Dirt}
          />
          <mesh
            geometry={nodes.Circle001_grass_0.geometry}
            material={materials.grass}
          />

          <mesh
            scale={0.1}
            position={[0, 70, 40]}
            rotation={[0, 0, Math.PI]}
            geometry={helCatNodes.Object_2.geometry}
            material={helCatMaterials.eyes_LPSG}
          />
          <mesh
            scale={0.1}
            position={[20, 70, 40]}
            rotation={[0, 0, Math.PI]}
            geometry={helCatNodes.Object_3.geometry}
            material={helCatMaterials.initialShadingGroup}
          />

          <mesh
            position={[20, 70, 50]}
            scale={10}
            geometry={eCatNodes.defaultMaterial.geometry}
            material={eCatMaterials.M_Cat_Statue}
            rotation={[Math.PI/2, Math.PI, 0]}
          />
          
          <mesh
            position={[-20, 70, 50]}
            scale={10}
            geometry={eCatNodes.defaultMaterial.geometry}
            material={eCatMaterials.M_Cat_Statue}
            rotation={[Math.PI/2, Math.PI, 0]}
          />

        </group>
        
<group position={[2.617, 53.789, -1.574]} rotation={[-Math.PI / 2, 0, 0]}>
  <group position={[-1.29, -3.574, -23.811]}>
    <group position={[0, 0.923, -2.115]}>
      <group
        position={[-15.607, -18.035, -10.759]}
        scale={[0.233, 0.099, 0.171]}
      >
        <mesh
          geometry={nodes["Box032_Material_#25_0"].geometry}
          material={materials.Material_25}
        />
        <mesh
          geometry={nodes["Box032_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
        <mesh
          geometry={nodes["Box032_Material_#26_0"].geometry}
          material={materials.Material_26}
        />
        <mesh
          geometry={nodes["Box032_Material_#84_0"].geometry}
          material={materials.Material_84}
        />
        <mesh
          geometry={nodes["Box032_Material_#27_0"].geometry}
          material={materials.Material_27}
        />
      </group>
      <group
        position={[21.295, 24.283, 6.919]}
        rotation={[-0.511, 0.004, 3.135]}
        scale={[0.223, 0.137, 0.33]}
      >
        <mesh
          geometry={nodes["Plane012_Material_#119_0"].geometry}
          material={materials.Material_119}
        />
        <mesh
          geometry={nodes["Plane012_Material_#120_0"].geometry}
          material={materials.Material_120}
        />
      </group>
      <group
        position={[15.313, -18.035, -10.759]}
        scale={[0.233, 0.099, 0.171]}
      >
        <mesh
          geometry={nodes["Box031_Material_#25_0"].geometry}
          material={materials.Material_25}
        />
        <mesh
          geometry={nodes["Box031_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
        <mesh
          geometry={nodes["Box031_Material_#26_0"].geometry}
          material={materials.Material_26}
        />
        <mesh
          geometry={nodes["Box031_Material_#84_0"].geometry}
          material={materials.Material_84}
        />
        <mesh
          geometry={nodes["Box031_Material_#27_0"].geometry}
          material={materials.Material_27}
        />
      </group>
      <group
        position={[18.574, -21.884, -8.939]}
        scale={[0.23, 0.306, 0.306]}
      >
        <group
          position={[-9.509, -9.468, -5.966]}
          scale={[1, 0.766, 0.593]}
        >
          <mesh
            geometry={nodes["Box018_Material_#26_0"].geometry}
            material={materials.Material_26}
          />
          <mesh
            geometry={nodes["Box018_Material_#25_0"].geometry}
            material={materials.Material_25}
          />
        </group>
        <mesh
          geometry={nodes["Box019_Material_#25_0"].geometry}
          material={materials.Material_25}
          position={[-0.009, 0.049, 4.999]}
          scale={[0.775, 0.932, 0.022]}
        />
      </group>
      <group
        position={[10.959, -21.884, -8.939]}
        scale={[0.23, 0.306, 0.306]}
      >
        <group
          position={[-9.509, -9.468, -5.966]}
          scale={[1, 0.766, 0.593]}
        >
          <mesh
            geometry={nodes["Box020_Material_#26_0"].geometry}
            material={materials.Material_26}
          />
          <mesh
            geometry={nodes["Box020_Material_#25_0"].geometry}
            material={materials.Material_25}
          />
        </group>
        <mesh
          geometry={nodes["Box021_Material_#25_0"].geometry}
          material={materials.Material_25}
          position={[-0.009, 0.049, 4.999]}
          scale={[0.775, 0.932, 0.022]}
        />
      </group>
      <group
        position={[-12.347, -21.884, -8.939]}
        scale={[0.23, 0.306, 0.306]}
      >
        <group
          position={[-9.509, -9.468, -5.966]}
          scale={[1, 0.766, 0.593]}
        >
          <mesh
            geometry={nodes["Box033_Material_#26_0"].geometry}
            material={materials.Material_26}
          />
          <mesh
            geometry={nodes["Box033_Material_#25_0"].geometry}
            material={materials.Material_25}
          />
        </group>
        <mesh
          geometry={nodes["Box034_Material_#25_0"].geometry}
          material={materials.Material_25}
          position={[-0.009, 0.049, 4.999]}
          scale={[0.775, 0.932, 0.022]}
        />
      </group>
      <group
        position={[-19.962, -21.884, -8.939]}
        scale={[0.23, 0.306, 0.306]}
      >
        <group
          position={[-9.509, -9.468, -5.966]}
          scale={[1, 0.766, 0.593]}
        >
          <mesh
            geometry={nodes["Box035_Material_#26_0"].geometry}
            material={materials.Material_26}
          />
          <mesh
            geometry={nodes["Box035_Material_#25_0"].geometry}
            material={materials.Material_25}
          />
        </group>
        <mesh
          geometry={nodes["Box036_Material_#25_0"].geometry}
          material={materials.Material_25}
          position={[-0.009, 0.049, 4.999]}
          scale={[0.775, 0.932, 0.022]}
        />
      </group>
    </group>
    <group position={[0.014, -22.719, 0]}>
      <group
        position={[3.877, 0.226, 9.322]}
        rotation={[0.007, 0.636, 1.559]}
        scale={[0.187, 0.135, 0.295]}
      >
        <mesh
          geometry={nodes["Plane006_Material_#120_0"].geometry}
          material={materials.Material_120}
        />
        <mesh
          geometry={nodes["Plane006_Material_#119_0"].geometry}
          material={materials.Material_119}
        />
      </group>
      <mesh
        geometry={nodes["Plane004_Material_#203_0"].geometry}
        material={materials.Material_203}
        position={[-0.084, -6.034, 3.967]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.124, 0.116, 0.102]}
      />
      <group
        position={[-0.147, 0.633, -12.907]}
        scale={[0.154, 0.161, 0.298]}
      >
        <mesh
          geometry={nodes["Box016_Material_#25_0"].geometry}
          material={materials.Material_25}
        />
        <mesh
          geometry={nodes["Box016_Material_#26_0"].geometry}
          material={materials.Material_26}
        />
        <mesh
          geometry={nodes["Box016_Material_#157_0"].geometry}
          material={materials.Material_157}
        />
        <mesh
          geometry={nodes["Box016_Material_#122_0"].geometry}
          material={materials.Material_122}
        />
        <mesh
          geometry={nodes["Box016_Material_#158_0"].geometry}
          material={materials.Material_158}
        />
      </group>
      <group position={[4.734, -6.392, -8.696]} scale={[1.1, 1, 1.112]}>
        <group
          position={[0.029, -0.266, -1.011]}
          scale={[0.036, 0.038, 0.035]}
        >
          <mesh
            geometry={nodes["Box025_Material_#204_0"].geometry}
            material={materials.Material_204}
          />
          <mesh
            geometry={nodes["Box025_Material_#50_0"].geometry}
            material={materials.Material_50}
          />
        </group>
        <mesh
          geometry={nodes["Torus007_Material_#204_0"].geometry}
          material={materials.Material_204}
          position={[0.031, -0.267, 0.597]}
          rotation={[-1.552, 0.009, 0.432]}
          scale={[0.009, 0.008, 0.011]}
        />
        <mesh
          geometry={nodes["NGon004_Material_#204_0"].geometry}
          material={materials.Material_204}
          position={[0, 0.803, 0.631]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.03, 0.036, 0.038]}
        />
        <mesh
          geometry={nodes["Circle053_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[-0.396, 0.734, 0.911]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.073, 0.087, 0.051]}
        />
        <mesh
          geometry={nodes["Circle054_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[-0.396, 0.734, 0.387]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.073, 0.087, 0.051]}
        />
        <mesh
          geometry={nodes["Circle055_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.421, 0.734, 0.387]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.073, 0.087, 0.051]}
        />
        <mesh
          geometry={nodes["Circle056_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.421, 0.734, 0.911]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.073, 0.087, 0.051]}
        />
        <mesh
          geometry={nodes["Box024_Material_#204_0"].geometry}
          material={materials.Material_204}
          position={[0.02, -0.263, -0.32]}
          scale={[0.049, 0.051, 0.021]}
        />
        <mesh
          geometry={nodes["NGon005_Material_#204_0"].geometry}
          material={materials.Material_204}
          position={[0.023, 0.975, 0.592]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.011, 0.011, 0.012]}
        />
        <mesh
          geometry={nodes["Torus008_Material_#204_0"].geometry}
          material={materials.Material_204}
          position={[0.044, -0.247, -1.01]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.01, 0.009, 0.01]}
        />
      </group>
      <group position={[-5.114, -6.392, -8.696]} scale={[1.1, 1, 1.112]}>
        <group
          position={[0.029, -0.266, -1.011]}
          scale={[0.036, 0.038, 0.035]}
        >
          <mesh
            geometry={nodes["Box022_Material_#204_0"].geometry}
            material={materials.Material_204}
          />
          <mesh
            geometry={nodes["Box022_Material_#50_0"].geometry}
            material={materials.Material_50}
          />
        </group>
        <mesh
          geometry={nodes["NGon002_Material_#204_0"].geometry}
          material={materials.Material_204}
          position={[0, 0.803, 0.631]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.03, 0.036, 0.038]}
        />
        <mesh
          geometry={nodes["Circle049_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[-0.396, 0.734, 0.911]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.073, 0.087, 0.051]}
        />
        <mesh
          geometry={nodes["Circle051_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[-0.396, 0.734, 0.387]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.073, 0.087, 0.051]}
        />
        <mesh
          geometry={nodes["Circle052_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.421, 0.734, 0.387]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.073, 0.087, 0.051]}
        />
        <mesh
          geometry={nodes["Circle050_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.421, 0.734, 0.911]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[0.073, 0.087, 0.051]}
        />
        <mesh
          geometry={nodes["Box023_Material_#204_0"].geometry}
          material={materials.Material_204}
          position={[0.02, -0.263, -0.32]}
          scale={[0.049, 0.051, 0.021]}
        />
        <mesh
          geometry={nodes["NGon003_Material_#204_0"].geometry}
          material={materials.Material_204}
          position={[0.023, 0.975, 0.592]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.011, 0.011, 0.012]}
        />
        <mesh
          geometry={nodes["Torus005_Material_#204_0"].geometry}
          material={materials.Material_204}
          position={[0.044, -0.247, -1.01]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.01, 0.009, 0.01]}
        />
        <mesh
          geometry={nodes["Torus006_Material_#204_0"].geometry}
          material={materials.Material_204}
          position={[0.031, -0.267, 0.597]}
          rotation={[-1.552, 0.009, 0.432]}
          scale={[0.009, 0.008, 0.011]}
        />
      </group>
      <group
        position={[0.489, -5.664, -11.471]}
        scale={[1.157, 1, 1.157]}
      >
        <mesh
          geometry={nodes["Circle048_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.391, 0.159, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.03, 0.03, 0.218]}
        />
        <mesh
          geometry={nodes["Circle047_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.137, 0.061, 0.231]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.202, 0.202, 0.064]}
        />
        <mesh
          geometry={nodes["Torus003_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.144, -0.024, -0.054]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          geometry={nodes["Torus004_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.146, 0.001, 0.157]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={[0.006, 0.006, 0.022]}
        />
      </group>
      <group
        position={[-0.749, -5.664, -11.471]}
        scale={[1.157, 1, 1.157]}
      >
        <mesh
          geometry={nodes["Circle046_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.137, 0.061, 0.231]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.202, 0.202, 0.064]}
        />
        <mesh
          geometry={nodes["Circle045_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.391, 0.159, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.03, 0.03, 0.218]}
        />
        <mesh
          geometry={nodes["Torus002_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.144, -0.024, -0.054]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.025, 0.025, 0.02]}
        />
        <mesh
          geometry={nodes["Torus001_Material_#122_0"].geometry}
          material={materials.Material_122}
          position={[0.146, 0.001, 0.157]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={[0.006, 0.006, 0.022]}
        />
      </group>
    </group>
  </group>
  <group position={[-0.88, 0.121, 9.911]}>
    <group
      position={[-6.323, -7.706, -18.469]}
      scale={[1.1, 0.97, 1.112]}
    >
      <group
        position={[0.029, -0.266, -1.011]}
        scale={[0.036, 0.038, 0.035]}
      >
        <mesh
          geometry={nodes["Box040_Material_#204_0"].geometry}
          material={materials.Material_204}
        />
        <mesh
          geometry={nodes["Box040_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
      </group>
      <mesh
        geometry={nodes["NGon006_Material_#204_0"].geometry}
        material={materials.Material_204}
        position={[0.023, 0.975, 0.592]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.011, 0.011, 0.012]}
      />
      <mesh
        geometry={nodes["NGon007_Material_#204_0"].geometry}
        material={materials.Material_204}
        position={[0, 0.803, 0.631]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.03, 0.036, 0.038]}
      />
      <mesh
        geometry={nodes["Circle062_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-0.396, 0.734, 0.911]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.073, 0.087, 0.051]}
      />
      <mesh
        geometry={nodes["Circle063_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-0.396, 0.734, 0.387]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.073, 0.087, 0.051]}
      />
      <mesh
        geometry={nodes["Circle064_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.421, 0.734, 0.387]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.073, 0.087, 0.051]}
      />
      <mesh
        geometry={nodes["Circle065_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.421, 0.734, 0.911]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.073, 0.087, 0.051]}
      />
      <mesh
        geometry={nodes["Box039_Material_#204_0"].geometry}
        material={materials.Material_204}
        position={[0.02, -0.263, -0.32]}
        scale={[0.049, 0.051, 0.021]}
      />
      <mesh
        geometry={nodes["Torus013_Material_#204_0"].geometry}
        material={materials.Material_204}
        position={[0.044, -0.247, -1.01]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.01, 0.009, 0.01]}
      />
      <mesh
        geometry={nodes["Torus014_Material_#204_0"].geometry}
        material={materials.Material_204}
        position={[0.031, -0.267, 0.597]}
        rotation={[-1.552, 0.009, 0.432]}
        scale={[0.009, 0.008, 0.011]}
      />
    </group>
    <group position={[-1.086, -7.266, -20.149]} scale={[1.324, 1, 1.324]}>
      <mesh
        geometry={nodes["Torus009_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.144, -0.024, -0.054]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.025, 0.025, 0.02]}
      />
      <mesh
        geometry={nodes["Circle057_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.137, 0.061, 0.231]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.202, 0.202, 0.064]}
      />
      <mesh
        geometry={nodes["Circle058_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.391, 0.159, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.03, 0.03, 0.218]}
      />
      <mesh
        geometry={nodes["Torus010_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.146, 0.001, 0.157]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.006, 0.006, 0.022]}
      />
    </group>
    <group position={[1.229, -7.242, -20.149]} scale={[1.324, 1, 1.324]}>
      <mesh
        geometry={nodes["Circle059_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.137, 0.061, 0.231]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.202, 0.202, 0.064]}
      />
      <mesh
        geometry={nodes["Circle060_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.391, 0.159, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.03, 0.03, 0.218]}
      />
      <mesh
        geometry={nodes["Torus011_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.144, -0.024, -0.054]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.025, 0.025, 0.02]}
      />
      <mesh
        geometry={nodes["Torus012_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.146, 0.001, 0.157]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.006, 0.006, 0.022]}
      />
    </group>
    <group position={[7.09, -7.748, -18.469]} scale={[1.1, 0.97, 1.112]}>
      <group
        position={[0.029, -0.266, -1.011]}
        scale={[0.036, 0.038, 0.035]}
      >
        <mesh
          geometry={nodes["Box042_Material_#204_0"].geometry}
          material={materials.Material_204}
        />
        <mesh
          geometry={nodes["Box042_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
      </group>
      <mesh
        geometry={nodes["NGon008_Material_#204_0"].geometry}
        material={materials.Material_204}
        position={[0.023, 0.975, 0.592]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.011, 0.011, 0.012]}
      />
      <mesh
        geometry={nodes["Torus015_Material_#204_0"].geometry}
        material={materials.Material_204}
        position={[0.031, -0.267, 0.597]}
        rotation={[-1.552, 0.009, 0.432]}
        scale={[0.009, 0.008, 0.011]}
      />
      <mesh
        geometry={nodes["NGon009_Material_#204_0"].geometry}
        material={materials.Material_204}
        position={[0, 0.803, 0.631]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.03, 0.036, 0.038]}
      />
      <mesh
        geometry={nodes["Circle066_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-0.396, 0.734, 0.911]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.073, 0.087, 0.051]}
      />
      <mesh
        geometry={nodes["Circle067_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-0.396, 0.734, 0.387]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.073, 0.087, 0.051]}
      />
      <mesh
        geometry={nodes["Circle068_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.421, 0.734, 0.387]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.073, 0.087, 0.051]}
      />
      <mesh
        geometry={nodes["Circle069_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[0.421, 0.734, 0.911]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.073, 0.087, 0.051]}
      />
      <mesh
        geometry={nodes["Box041_Material_#204_0"].geometry}
        material={materials.Material_204}
        position={[0.02, -0.263, -0.32]}
        scale={[0.049, 0.051, 0.021]}
      />
      <mesh
        geometry={nodes["Torus016_Material_#204_0"].geometry}
        material={materials.Material_204}
        position={[0.044, -0.247, -1.01]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.01, 0.009, 0.01]}
      />
    </group>
    <group
      position={[2.907, -0.011, -26.909]}
      scale={[0.342, 0.25, 0.415]}
    >
      <mesh
        geometry={nodes["Box038_Material_#25_0"].geometry}
        material={materials.Material_25}
      />
      <mesh
        geometry={nodes["Box038_Material_#26_0"].geometry}
        material={materials.Material_26}
      />
      <mesh
        geometry={nodes["Box038_Material_#50_0"].geometry}
        material={materials.Material_50}
      />
      <mesh
        geometry={nodes["Box038_Material_#84_0"].geometry}
        material={materials.Material_84}
      />
      <mesh
        geometry={nodes["Box038_Material_#157_0"].geometry}
        material={materials.Material_157}
      />
      <mesh
        geometry={nodes["Box038_Material_#122_0"].geometry}
        material={materials.Material_122}
      />
      <mesh
        geometry={nodes["Box038_Material_#119_0"].geometry}
        material={materials.Material_119}
      />
      <mesh
        geometry={nodes["Box038_Material_#120_0"].geometry}
        material={materials.Material_120}
      />
    </group>
    <group
      position={[0.696, 5.258, -7.357]}
      rotation={[0, 0, -0.523]}
      scale={[0.238, 0.238, 0.242]}
    >
      <mesh
        geometry={nodes["Cylinder001_Material_#26_0"].geometry}
        material={materials.Material_26}
      />
      <mesh
        geometry={nodes["Cylinder001_Material_#25_0"].geometry}
        material={materials.Material_25}
      />
      <mesh
        geometry={nodes["Cylinder001_Material_#50_0"].geometry}
        material={materials.Material_50}
      />
      <mesh
        geometry={nodes["Cylinder001_Material_#27_0"].geometry}
        material={materials.Material_27}
      />
    </group>
    <group
      position={[0.713, 5.402, 8.227]}
      rotation={[0, 0, -0.143]}
      scale={[0.186, 0.181, 0.049]}
    >
      <mesh
        geometry={nodes["Tube026_Material_#120_0"].geometry}
        material={materials.Material_120}
      />
      <mesh
        geometry={nodes["Tube026_Material_#119_0"].geometry}
        material={materials.Material_119}
      />
    </group>
    <group position={[2.678, 5.425, 22.686]} scale={[1.195, 1.158, 1]}>
      <mesh
        geometry={nodes["Sphere006_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-1.67, 0.015, 3.451]}
        scale={[0.051, 0.051, 0.057]}
      />
      <mesh
        geometry={nodes["Tube012_Material_#121_0"].geometry}
        material={materials.Material_121}
        position={[-1.65, 0.006, -3.041]}
        scale={[0.014, 0.014, 0.026]}
      />
      <mesh
        geometry={nodes["Tube013_Material_#123_0"].geometry}
        material={materials.Material_123}
        position={[-1.65, 0.006, -2.05]}
        scale={[0.017, 0.017, 0.018]}
      />
      <mesh
        geometry={nodes["Circle070_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-1.629, 0, -4.223]}
        scale={[0.103, 0.103, 0.116]}
      />
    </group>
  </group>
  <group position={[-31.269, 24.322, -11.398]}>
    <group position={[0, 0, -4.714]} rotation={[0, 0, -1.222]}>
      <group
        position={[-0.042, 0.009, 4.739]}
        scale={[0.193, 0.193, 0.075]}
      >
        <mesh
          geometry={nodes["Tube017_Material_#120_0"].geometry}
          material={materials.Material_120}
        />
        <mesh
          geometry={nodes["Tube017_Material_#119_0"].geometry}
          material={materials.Material_119}
        />
      </group>
      <group
        position={[-0.044, -0.193, -2.426]}
        scale={[0.133, 0.133, 0.06]}
      >
        <mesh
          geometry={nodes["Circle077_Material_#25_0"].geometry}
          material={materials.Material_25}
        />
        <mesh
          geometry={nodes["Circle077_Material_#27_0"].geometry}
          material={materials.Material_27}
        />
        <mesh
          geometry={nodes["Circle077_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
      </group>
      <group
        position={[-0.044, -0.193, -20.578]}
        scale={[0.158, 0.158, 0.102]}
      >
        <mesh
          geometry={nodes["Circle078_Material_#27_0"].geometry}
          material={materials.Material_27}
        />
        <mesh
          geometry={nodes["Circle078_Material_#25_0"].geometry}
          material={materials.Material_25}
        />
        <mesh
          geometry={nodes["Circle078_Material_#26_0"].geometry}
          material={materials.Material_26}
        />
        <mesh
          geometry={nodes["Circle078_Material_#84_0"].geometry}
          material={materials.Material_84}
        />
        <mesh
          geometry={nodes["Circle078_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
      </group>
      <group
        position={[-0.112, -0.18, -10.602]}
        scale={[0.071, 0.072, 0.031]}
      >
        <mesh
          geometry={nodes["Circle079_Material_#26_0"].geometry}
          material={materials.Material_26}
          position={[0, 0, 429.347]}
        />
      </group>
      <mesh
        geometry={nodes["Circle072_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.044, -0.045, 7.519]}
        scale={[0.157, 0.157, 0.022]}
      />
      <mesh
        geometry={nodes["Circle073_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.045, 8.888]}
        scale={[0.18, 0.18, 0.022]}
      />
      <mesh
        geometry={nodes["Circle074_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.045, 7.975]}
        scale={[0.165, 0.165, 0.022]}
      />
      <mesh
        geometry={nodes["Circle075_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.044, -0.045, 8.43]}
        scale={[0.172, 0.172, 0.022]}
      />
      <mesh
        geometry={nodes["Circle076_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.193, 4.838]}
        scale={[0.146, 0.146, 0.022]}
      />
    </group>
    <group
      position={[2.001, -0.039, 20.547]}
      scale={[1.217, 1.217, 1.123]}
    >
      <mesh
        geometry={nodes["Circle080_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-1.629, 0, -4.223]}
        scale={[0.103, 0.103, 0.116]}
      />
      <mesh
        geometry={nodes["Sphere008_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-1.67, 0.015, 3.451]}
        scale={[0.051, 0.051, 0.057]}
      />
      <mesh
        geometry={nodes["Tube018_Material_#121_0"].geometry}
        material={materials.Material_121}
        position={[-1.65, 0.006, -3.041]}
        scale={[0.014, 0.014, 0.026]}
      />
      <mesh
        geometry={nodes["Tube019_Material_#123_0"].geometry}
        material={materials.Material_123}
        position={[-1.65, 0.006, -2.05]}
        scale={[0.017, 0.017, 0.018]}
      />
    </group>
  </group>
  <group position={[-33.633, -24.588, -11.398]}>
    <group position={[0, 0, -4.714]}>
      <group
        position={[-0.042, 0.009, 4.739]}
        scale={[0.193, 0.193, 0.075]}
      >
        <mesh
          geometry={nodes["Tube014_Material_#120_0"].geometry}
          material={materials.Material_120}
        />
        <mesh
          geometry={nodes["Tube014_Material_#119_0"].geometry}
          material={materials.Material_119}
        />
      </group>
      <group
        position={[-0.044, -0.193, -2.426]}
        scale={[0.133, 0.133, 0.06]}
      >
        <mesh
          geometry={nodes["Circle016_Material_#25_0"].geometry}
          material={materials.Material_25}
        />
        <mesh
          geometry={nodes["Circle016_Material_#27_0"].geometry}
          material={materials.Material_27}
        />
        <mesh
          geometry={nodes["Circle016_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
      </group>
      <group
        position={[-0.044, -0.193, -20.578]}
        scale={[0.158, 0.158, 0.102]}
      >
        <mesh
          geometry={nodes["Circle017_Material_#27_0"].geometry}
          material={materials.Material_27}
        />
        <mesh
          geometry={nodes["Circle017_Material_#25_0"].geometry}
          material={materials.Material_25}
        />
        <mesh
          geometry={nodes["Circle017_Material_#26_0"].geometry}
          material={materials.Material_26}
        />
        <mesh
          geometry={nodes["Circle017_Material_#84_0"].geometry}
          material={materials.Material_84}
        />
        <mesh
          geometry={nodes["Circle017_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
      </group>
      <group
        position={[-0.112, -0.18, -10.602]}
        scale={[0.071, 0.072, 0.031]}
      >
        <mesh
          geometry={nodes["Circle004_Material_#26_0"].geometry}
          material={materials.Material_26}
          position={[0, 0, 429.347]}
        />
      </group>
      <mesh
        geometry={nodes["Circle009_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.044, -0.045, 7.519]}
        scale={[0.157, 0.157, 0.022]}
      />
      <mesh
        geometry={nodes["Circle014_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.045, 8.888]}
        scale={[0.18, 0.18, 0.022]}
      />
      <mesh
        geometry={nodes["Circle010_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.045, 7.975]}
        scale={[0.165, 0.165, 0.022]}
      />
      <mesh
        geometry={nodes["Circle011_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.044, -0.045, 8.43]}
        scale={[0.172, 0.172, 0.022]}
      />
      <mesh
        geometry={nodes["Circle008_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.193, 4.838]}
        scale={[0.146, 0.146, 0.022]}
      />
    </group>
    <group
      position={[1.972, 0.059, 20.547]}
      scale={[1.217, 1.217, 1.123]}
    >
      <mesh
        geometry={nodes["Sphere007_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-1.67, 0.015, 3.451]}
        scale={[0.051, 0.051, 0.057]}
      />
      <mesh
        geometry={nodes["Tube015_Material_#121_0"].geometry}
        material={materials.Material_121}
        position={[-1.65, 0.006, -3.041]}
        scale={[0.014, 0.014, 0.026]}
      />
      <mesh
        geometry={nodes["Tube016_Material_#123_0"].geometry}
        material={materials.Material_123}
        position={[-1.65, 0.006, -2.05]}
        scale={[0.017, 0.017, 0.018]}
      />
      <mesh
        geometry={nodes["Circle071_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-1.629, 0, -4.223]}
        scale={[0.103, 0.103, 0.116]}
      />
    </group>
  </group>
  <group position={[28.608, 24.216, -11.398]}>
    <group position={[0, 0, -4.714]} rotation={[0, 0, -2.443]}>
      <group
        position={[-0.042, 0.009, 4.739]}
        scale={[0.193, 0.193, 0.075]}
      >
        <mesh
          geometry={nodes["Tube023_Material_#120_0"].geometry}
          material={materials.Material_120}
        />
        <mesh
          geometry={nodes["Tube023_Material_#119_0"].geometry}
          material={materials.Material_119}
        />
      </group>
      <group
        position={[-0.044, -0.193, -2.426]}
        scale={[0.133, 0.133, 0.06]}
      >
        <mesh
          geometry={nodes["Circle095_Material_#25_0"].geometry}
          material={materials.Material_25}
        />
        <mesh
          geometry={nodes["Circle095_Material_#27_0"].geometry}
          material={materials.Material_27}
        />
        <mesh
          geometry={nodes["Circle095_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
      </group>
      <group
        position={[-0.044, -0.193, -20.578]}
        scale={[0.158, 0.158, 0.102]}
      >
        <mesh
          geometry={nodes["Circle096_Material_#27_0"].geometry}
          material={materials.Material_27}
        />
        <mesh
          geometry={nodes["Circle096_Material_#25_0"].geometry}
          material={materials.Material_25}
        />
        <mesh
          geometry={nodes["Circle096_Material_#26_0"].geometry}
          material={materials.Material_26}
        />
        <mesh
          geometry={nodes["Circle096_Material_#84_0"].geometry}
          material={materials.Material_84}
        />
        <mesh
          geometry={nodes["Circle096_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
      </group>
      <group
        position={[-0.112, -0.18, -10.602]}
        scale={[0.071, 0.072, 0.031]}
      >
        <mesh
          geometry={nodes["Circle097_Material_#26_0"].geometry}
          material={materials.Material_26}
          position={[0, 0, 429.347]}
        />
      </group>
      <mesh
        geometry={nodes["Circle090_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.045, 8.888]}
        scale={[0.18, 0.18, 0.022]}
      />
      <mesh
        geometry={nodes["Circle091_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.044, -0.045, 7.519]}
        scale={[0.157, 0.157, 0.022]}
      />
      <mesh
        geometry={nodes["Circle092_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.045, 7.975]}
        scale={[0.165, 0.165, 0.022]}
      />
      <mesh
        geometry={nodes["Circle093_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.044, -0.045, 8.43]}
        scale={[0.172, 0.172, 0.022]}
      />
      <mesh
        geometry={nodes["Circle094_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.193, 4.838]}
        scale={[0.146, 0.146, 0.022]}
      />
    </group>
    <group
      position={[1.971, -0.024, 20.547]}
      scale={[1.217, 1.217, 1.123]}
    >
      <mesh
        geometry={nodes["Tube024_Material_#123_0"].geometry}
        material={materials.Material_123}
        position={[-1.65, 0.006, -2.05]}
        scale={[0.017, 0.017, 0.018]}
      />
      <mesh
        geometry={nodes["Circle098_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-1.629, 0, -4.223]}
        scale={[0.103, 0.103, 0.116]}
      />
      <mesh
        geometry={nodes["Sphere010_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-1.67, 0.015, 3.451]}
        scale={[0.051, 0.051, 0.057]}
      />
      <mesh
        geometry={nodes["Tube025_Material_#121_0"].geometry}
        material={materials.Material_121}
        position={[-1.65, 0.006, -3.041]}
        scale={[0.014, 0.014, 0.026]}
      />
    </group>
  </group>
  <group position={[30.382, -24.667, -11.398]}>
    <group
      position={[2.007, 0.055, 20.547]}
      scale={[1.217, 1.217, 1.123]}
    >
      <mesh
        geometry={nodes["Circle089_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-1.629, 0, -4.223]}
        scale={[0.103, 0.103, 0.116]}
      />
      <mesh
        geometry={nodes["Sphere009_Material_#122_0"].geometry}
        material={materials.Material_122}
        position={[-1.67, 0.015, 3.451]}
        scale={[0.051, 0.051, 0.057]}
      />
      <mesh
        geometry={nodes["Tube021_Material_#121_0"].geometry}
        material={materials.Material_121}
        position={[-1.65, 0.006, -3.041]}
        scale={[0.014, 0.014, 0.026]}
      />
      <mesh
        geometry={nodes["Tube022_Material_#123_0"].geometry}
        material={materials.Material_123}
        position={[-1.65, 0.006, -2.05]}
        scale={[0.017, 0.017, 0.018]}
      />
    </group>
    <group position={[0, 0, -4.714]} rotation={[0, 0, 2.618]}>
      <group
        position={[-0.042, 0.009, 4.739]}
        scale={[0.193, 0.193, 0.075]}
      >
        <mesh
          geometry={nodes["Tube020_Material_#120_0"].geometry}
          material={materials.Material_120}
        />
        <mesh
          geometry={nodes["Tube020_Material_#119_0"].geometry}
          material={materials.Material_119}
        />
      </group>
      <group
        position={[-0.044, -0.193, -2.426]}
        scale={[0.133, 0.133, 0.06]}
      >
        <mesh
          geometry={nodes["Circle086_Material_#25_0"].geometry}
          material={materials.Material_25}
        />
        <mesh
          geometry={nodes["Circle086_Material_#27_0"].geometry}
          material={materials.Material_27}
        />
        <mesh
          geometry={nodes["Circle086_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
      </group>
      <group
        position={[-0.044, -0.193, -20.578]}
        scale={[0.158, 0.158, 0.102]}
      >
        <mesh
          geometry={nodes["Circle087_Material_#27_0"].geometry}
          material={materials.Material_27}
        />
        <mesh
          geometry={nodes["Circle087_Material_#25_0"].geometry}
          material={materials.Material_25}
        />
        <mesh
          geometry={nodes["Circle087_Material_#26_0"].geometry}
          material={materials.Material_26}
        />
        <mesh
          geometry={nodes["Circle087_Material_#84_0"].geometry}
          material={materials.Material_84}
        />
        <mesh
          geometry={nodes["Circle087_Material_#50_0"].geometry}
          material={materials.Material_50}
        />
      </group>
      <group
        position={[-0.112, -0.18, -10.602]}
        scale={[0.071, 0.072, 0.031]}
      >
        <mesh
          geometry={nodes["Circle088_Material_#26_0"].geometry}
          material={materials.Material_26}
          position={[0, 0, 429.347]}
        />
      </group>
      <mesh
        geometry={nodes["Circle081_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.044, -0.045, 7.519]}
        scale={[0.157, 0.157, 0.022]}
      />
      <mesh
        geometry={nodes["Circle082_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.045, 8.888]}
        scale={[0.18, 0.18, 0.022]}
      />
      <mesh
        geometry={nodes["Circle083_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.045, 7.975]}
        scale={[0.165, 0.165, 0.022]}
      />
      <mesh
        geometry={nodes["Circle084_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.044, -0.045, 8.43]}
        scale={[0.172, 0.172, 0.022]}
      />
      <mesh
        geometry={nodes["Circle085_Material_#25_0"].geometry}
        material={materials.Material_25}
        position={[-0.044, -0.193, 4.838]}
        scale={[0.146, 0.146, 0.022]}
      />
    </group>
  </group>
</group>
      </group>
    </>
  );
};

export default Island;
