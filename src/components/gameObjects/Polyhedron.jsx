import * as THREE from 'three';
import { useState, useMemo } from 'react'
import { useBox } from '@react-three/cannon'
import { useLoader } from '@react-three/fiber';

const Polyhedron = ({ color, ...props }) => {
    const [ref, api] = useBox(() => ({
        mass: 1,
        position: [0, 5, 0],
        ...props
    }));

    const [count, setCount] = useState(0);

    const texture = useLoader(THREE.TextureLoader, './rowlet.jpg');

    const polyhedron = useMemo(
        () => [
            new THREE.SphereGeometry(0.785398),
            new THREE.BoxGeometry(),
            new THREE.DodecahedronGeometry(0.785398),
        ],
        []
    )

    console.log(color)


    return (
        <mesh
            {...props}
            ref={ref}
            onPointerDown={() => {
                setCount((count + 1) % 3)
            }}
            geometry={polyhedron[count]}
            castShadow
            receiveShadow
            material={new THREE.MeshPhongMaterial({ map: texture })}
        >
            <meshPhongMaterial color={color}/>
        </mesh>
    )
}

export default Polyhedron;