import { useControls } from "leva";

const Light = (props) => {

    const spotLightControls = useControls('Spotlight', {
        position: { value: [10, 5, 5], label: 'Position' },
        angle: { value: 0.3, min: 0, max: Math.PI * 2, step: 0.01, label: 'Angle' },
        castShadow: true
    });
    const ambientLightControls = useControls('Ambient Light', {
        intensity: { value: 0.5, min: 0, max: 1, step: 0.01, label: 'Intensity' },
    });

    return (
        <>
            <ambientLight intensity={ambientLightControls.intensity} />
            <spotLight
                position={spotLightControls.position}
                angle={spotLightControls.angle}
                castShadow={spotLightControls.castShadow} >
                <mesh>
                    <sphereGeometry />
                </mesh>
            </spotLight>
        </>
    )
}

export default Light;