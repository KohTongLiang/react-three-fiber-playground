import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Stats } from "@react-three/drei";
import { useControls } from 'leva';
import { Physics } from "@react-three/cannon";

import Polyhedron from './components/gameObjects/Polyhedron';
import Box from './components/gameObjects/Box';
import Plane from './components/gameObjects/Plane';
import Light from './components/light';

import Tree from './components/gameObjects/Tree';
import MapleTree from './components/gameObjects/MapleTree';

function App() {

  const options = useMemo(() => {
    return {
      x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      visible: true,
      color: { value: '#519351' },
    }
  }, [])

  const colour = useControls({
    colour: { value: '#463d76', label: 'Colour' }
  })

  const pA = useControls('Polyhedron A', options)
  const pB = useControls('Polyhedron B', options)

  return (
    <Canvas style={{ height: '100vh' }} camera={{ position: [4, 4, 4] }} shadows>
      <color attach={'background'} args={[colour.colour]} />

      <Stars />
      <OrbitControls />

      <Light />

      <Physics>
        <Plane />

        <Tree position={[0, 0, 0]} scale={[1, 1, 1]} />
        <MapleTree position={[-7, 0, 0]} scale={[1, 1, 1]} />

        <Polyhedron
          position={[-1, 10, 0]}
          rotation={[pA.x, pA.y, pA.z]}
          visible={pA.visible}
          color={pA.color}
        />
        <Polyhedron
          position={[1, 10, 0]}
          rotation={[pB.x, pB.y, pB.z]}
          visible={pB.visible}
          color={pB.color}
        />
      </Physics>

      <axesHelper args={[5]} />
      {/* <gridHelper rotation={[0, 1, 0]} args={[50, 50, 0xff0000, 'blue']} /> */}
      <Stats />
    </Canvas>
  )
}

export default App
