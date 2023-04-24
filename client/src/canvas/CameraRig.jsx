import React, {useRef} from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

const CameraRig = ({children}) => {
  const snap = useSnapshot(state);
  const group = useRef();

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    let targetPosition = [-0.4, 0, 2];

    if(snap.intro) {
      if(isBreakpoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5]
    }else{
      if(isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2];
    }

    // Rotate the camera rig based on the pointer position
    // const pointerRotation = [state.pointer.y / 500, -state.pointer.x / 500, 0];
    // group.current.rotation.x = pointerRotation[0];
    // group.current.rotation.y = pointerRotation[1];
    // group.current.rotation.z = pointerRotation[2];

    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 5, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  })


  return <group ref={group}>{children}</group>
}

export default CameraRig