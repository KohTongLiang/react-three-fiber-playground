import * as THREE from 'three';
import { useState, useEffect, useMemo } from 'react'
import { useBox } from "@react-three/cannon";
import { useFrame } from '@react-three/fiber';

const Box = (props) => {
    const [ref, api] = useBox(() => ({
        mass: 1,
        position: [0, 5, 0],
        ...props
    }));

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
            castShadow
            receiveShadow
        >
            <boxBufferGeometry />
            <meshLambertMaterial color={hover ? "white" : "brown"} wireframe />
        </mesh>
    )
}

export default Box;