import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from 'three';

import birdScene from "../assets/3d/bird.glb";

const Bird = () => {
  const birdRef = useRef();

  // Load the 3D model and animations from the provided GLTF file
  const { scene, animations } = useGLTF(birdScene);

  // Get access to the animations for the bird
  const { actions } = useAnimations(animations, birdRef);

  // Play the "Take 001" animation when the component mounts
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  useFrame(({ clock }) => {
    const center = [0, 0.4, 0]; // Center point around which the bird revolves
    const radius = 4; // Radius of revolution
  
    // Calculate the angle based on elapsed time
    const angle = clock.getElapsedTime() * 0.6; // Adjust the speed of revolution as needed
  
    // Calculate the new position of the bird using trigonometry
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1]; // Keep the y-coordinate constant for simplicity
    const z = center[2] + radius * Math.sin(angle);
  
    // Calculate the direction vector between the current and next position
    const nextX = center[0] + radius * Math.cos(angle + 0.01); // Small angle increment for next position
    const nextZ = center[2] + radius * Math.sin(angle + 0.01); // Small angle increment for next position
    const direction = new THREE.Vector3(nextX - x, 0, nextZ - z).normalize();
  
    // Update the position of the bird
    birdRef.current.position.set(x, y, z);
  
    // Set the rotation of the bird to face the direction of movement
    birdRef.current.lookAt(direction);
  });
  
  
  
  
  

  return (
    // to create and display 3D objects
    <mesh ref={birdRef} position={[-5, 2, 1]} scale={[0.001, 0.001, 0.001]}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Bird;



