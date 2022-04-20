import React from "react";
import {Canvas} from "@react-three/fiber";
import Box from './viewer/Viewer';
import Ply from './viewer/ply';

export default function App() {
  return <div className="App" >
     <Box/>
     <Canvas>
        <Ply/>
     </Canvas>
     

  </div>;
}
