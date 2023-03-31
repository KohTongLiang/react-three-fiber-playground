import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const MapleTree = ({ position, scale }) => {
    const gltf = useLoader(GLTFLoader, './MapleTree_1.glb');

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

export default MapleTree;