import React from "react";
import {Canvas} from "@react-three/fiber";
import Box from './viewer/Viewer';
import Ply from './viewer/ply';
import Stl from './viewer/stl';

export default function App() {
  return <div className="App" >
     <Box/>
     <Canvas>
        <Stl/>
     </Canvas>
     <Canvas>
        <Ply/>
     </Canvas>
     

  </div>;
}
