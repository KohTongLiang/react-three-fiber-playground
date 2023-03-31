import * as THREE from 'three';
import { usePlane } from "@react-three/cannon";
import { useControls } from 'leva';

const Plane = (props) => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
        ...props
    }))


    const planeControl = useControls('Plane', {
        color: { value: '#519351' },
    })


    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} ref={ref} receiveShadow>
            <planeBufferGeometry args={[100, 100]} />
            <meshPhongMaterial color={planeControl.color} />
        </mesh>
    )
}

export default Plane;