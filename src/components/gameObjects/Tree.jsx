import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Tree = ({ position, scale }) => {
    const gltf = useLoader(GLTFLoader, './BirchTree_1.gltf');

    return (
        <>
            <primitive
                object={gltf.scene}
                position={position}
                scale={scale}
            />
        </>
    )
}

export default Tree;