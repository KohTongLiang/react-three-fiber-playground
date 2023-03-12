import { useRef, useState, useEffect, useMemo } from 'react'
// import './App.css'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Stats } from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import * as THREE from 'three';

function App() {

  const Box = (props) => {
    // const [ref, api] = useBox(() => ({
    //   mass: 1,
    //   position: [0, 5, 0],
    //   ...props
    // }));
    const ref = useRef();
    const [rotate, setRotate] = useState(false);
    const [hover, setHover] = useState(false);
    const [count, setCount] = useState(0);
    const geometry = useMemo(() =>
      [new THREE.BoxGeometry(), new THREE.SphereGeometry()],
      []);

    useEffect(() => {
      console.log(ref.current.geometry.uuid);
    })

    useFrame((_, delta) => {
      if (!rotate) {
        ref.current.rotation.x += 1 * delta;
        ref.current.rotation.y += 0.5 * delta;
        ref.current.rotation.z += 0.5 * delta;
        // ref.current.position.y = Math.sin(state.clock.getElapsedTime());
      }

      if (!rotate && hover) {
        ref.current.rotation.x -= 2 * (1 * delta);
        ref.current.rotation.y -= 2 * (0.5 * delta);
        ref.current.rotation.z -= 2 * (0.5 * delta);
      }
    });

    return (
      <mesh
        position={[0, 10, 0]}
        onClick={() => {
          api.velocity.set(0, 5, 0);
        }}
        ref={ref}
        scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onDoubleClick={() => setRotate(!rotate)}
        onUpdate={(e) => console.log(e)}
        onPointerOver={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onPointerDown={() => setCount((count + 1) % 2)}
        geometry={geometry[count]}
      >
        <boxBufferGeometry />
        <meshLambertMaterial color={hover ? "white" : "brown"} wireframe />
      </mesh>
    )
  }

  const Plane = (props) => {
    // const [ref] = usePlane(() => ({
    //   rotation: [-Math.PI / 2, 0, 0],
    //   position: [0, 0, 0],
    //   ...props
    // }))

    const ref = useRef();

    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={ref}>
        <planeBufferGeometry args={[100, 100]} />
        <meshLambertMaterial color="green" />
      </mesh>
    )
  }

  const Polyhedron = ({ position }) => {
    const ref = useRef()
    const [count, setCount] = useState(0)
    const polyhedron = [
      new THREE.BoxGeometry(),
      new THREE.SphereGeometry(0.785398),
      new THREE.DodecahedronGeometry(0.785398)
    ]

    console.log(polyhedron)

    useFrame((_, delta) => {
      ref.current.rotation.x += delta
      ref.current.rotation.y += 0.5 * delta
    })

    return (
      <mesh
        position={position}
        ref={ref}
        onPointerDown={() => {
          setCount((count + 1) % 3)
        }}
        geometry={polyhedron[count]}
      >
        <meshBasicMaterial color={'lime'} wireframe />
      </mesh>
    )
  }

  return (
    <div style={{ height: '100vh', backgroundColor: "black" }}>
      <Canvas>
        <Stars />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 5]} anmgle={0.3} />
        {/* <Plane /> */}
        {/* <Box /> */}
        <Polyhedron position={[-0.75, -0.75, 0]} />
        <Polyhedron position={[0.75, -0.75, 0]} />
        <Polyhedron position={[-0.75, 0.75, 0]} />
        <Polyhedron position={[0.75, 0.75, 0]} />

        <axesHelper args={[5]} />
        <gridHelper rotation={[0, 1, 0]} args={[50, 50, 0xff0000, 'blue']} />
        <Stats />
      </Canvas>
    </div>
  )
}

export default App
