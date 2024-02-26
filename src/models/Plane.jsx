import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import planeScene from "../assets/3d/plane.glb";

const Plane = ({ isRotating, isRotatingLeft, isRotatingRight, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        ref.current.rotation.y = -Math.PI;
      } else if (e.key === "ArrowRight") {
        ref.current.rotation.y = 0;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  
  useEffect(() => {
    if (isRotating) {
      actions["Armature|CINEMA_4D_Main|Layer0"].play();
    } else {
      actions["Armature|CINEMA_4D_Main|Layer0"].stop();
    }
  }, [actions, isRotating]);

  if(isRotating && isRotatingLeft){
    ref.current.rotation.y = -Math.PI;
  }
  else if(isRotating && isRotatingRight){
    ref.current.rotation.y = 0;
  }

  return (
    <mesh {...props} position={[0, -0.5, 3.3]} ref={ref} scale={0.3} rotation={[0, 0, 0]}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Plane;



