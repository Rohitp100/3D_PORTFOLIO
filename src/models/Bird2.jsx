import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

import birdScene from "../assets/3d/snow_dragon.glb";

const Bird2 = (props) => {
  const birdRef = useRef();
  const { nodes, materials, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
    const action = actions["run"];
    action.play();
    action.timeScale = 1;
  }, []);

  useFrame(({ clock }) => {
    const center = [0, 50, -50]; // Center point around which the bird revolves
    const radius = 180; // Radius of revolution
  
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
    birdRef.current.rotateY(Math.PI);
  });

  return (
    <group ref={birdRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, -Math.PI/2]}
          scale={20}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Sketchfab_model_0"
                rotation={[-Math.PI / 2, 0, 0]}
                scale={20.612}
              >
                <group
                  name="zq127_binglong_modefbx_1"
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={0.01}
                >
                  <group name="Object_2_2">
                    <group name="RootNode_3">
                      <group name="zq127_binglong_mode_4" scale={1.5}>
                        <group name="Object_5_5">
                          <group name="GLTF_created_0">
                            <primitive
                              object={nodes.GLTF_created_0_rootJoint}
                            />
                            <skinnedMesh
                              name="Object_102"
                              geometry={nodes.Object_102.geometry}
                              material={materials.zq127_binglong_1}
                              skeleton={nodes.Object_102.skeleton}
                            />
                            <group name="Object_8_8_correction">
                              <group name="Object_8_8" />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default Bird2;