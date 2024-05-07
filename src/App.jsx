import React, {Suspense, useRef, useState} from 'react';
import {Center, ContactShadows, OrbitControls, useGLTF} from "@react-three/drei";
import {Canvas, useFrame} from "@react-three/fiber";
import {gsap} from "gsap";
import TextPlugin from 'gsap/TextPlugin'
import {useGSAP} from "@gsap/react";

useGLTF.preload('/nike-transformed.glb')

export default function Shoes() {
	const [width, setWidth] = useState(window.innerWidth)

	return (
			<>
				<Underlay/>
				<Canvas
						shadows
						camera={{position: [2, 1, 1.1], fov: 35}}>
					<ambientLight intensity={1.5}/>
					<spotLight position={[1, 6, 1.5]} angle={0.2} penumbra={1} intensity={2.5} castShadow
										 shadow-mapSize={[2048, 2048]}/>
					<spotLight position={[-5, 5, -1.5]} angle={0.03} penumbra={1} intensity={4} castShadow
										 shadow-mapSize={[1024, 1024]}/>
					<spotLight position={[5, 5, -5]} angle={0.3} penumbra={1} intensity={4} castShadow={true}
										 shadow-mapSize={[256, 256]} color="#ffffc0"/>
					<Suspense fallback={null}>
						<Center center>
							<Nike scale={`${width < 650 ? 1 : 2}`} position={[0, 0, 2]}/>
						</Center>
						<ContactShadows frames={2} rotation-x={[Math.PI / 2]} position={[0, -0.33, 0]} far={3} width={1}
														height={1}
														blur={1}/>
					</Suspense>
					<OrbitControls enablePan={false} enableZoom={false}
												 minPolarAngle={Math.PI / 2.1}
												 maxPolarAngle={Math.PI / 2.1}/>
				</Canvas>
			</>
	);
};

function Nike(props) {
	const ref = useRef()
	const {nodes, materials} = useGLTF('/nike-transformed.glb')

	useFrame((state) => {
		const t = state.clock.getElapsedTime()
		ref.current.rotation.set(0.1 + Math.cos(t / 4.5) / 10, Math.sin(t / 4) / 4, 0.3 - (1 + Math.sin(t / 4)) / 8)
		ref.current.position.y = (1 + Math.sin(t / 2)) / 14
	})

	return (
			<group {...props} dispose={null} ref={ref}>
				<mesh geometry={nodes.Object_5.geometry} material={materials.metall_svart}
							position={[0.067, 0.044, -0.048]}
							rotation={[-3.008, -0.005, -2.218]} scale={[-0.01, 0.01, 0.01]}/>
				<mesh geometry={nodes.Object_7.geometry} material={materials['Material.006']} scale={[0.11, 0.108, 0.108]}/>
				<mesh geometry={nodes.Object_9.geometry} material={materials['Material.004']}/>
				<mesh geometry={nodes.Object_11.geometry} material={materials['Material.001']} scale={0.108}/>
				<mesh geometry={nodes.Object_13.geometry} material={materials.Material} scale={0.108}/>
				<mesh geometry={nodes.Object_17.geometry} material={materials.material_grund} scale={0.108}/>
				<mesh geometry={nodes.Object_24.geometry} material={materials.sko_sula_underdel} scale={0.108}/>
			</group>
	)
}

function Underlay() {
	const container = useRef()
	gsap.registerPlugin(useGSAP);
	gsap.registerPlugin(TextPlugin)


	useGSAP(() => {
		gsap.to('.underlay-left', {
			duration: 6,
			text: "We've taken the look of early-2000s running and made it tough enough for everyday wear. By combining durable\n" +
					"\t\t\t\t\t\tmaterials with soft cushioning, the TC 7900 is ready for your journey.",
			ease: "none",
			delimiter: " "
		});
		gsap.to('.underlay-right', {
			duration: 5,
			text: "Colour Shown: Sail/Black/Sail Style: DD9682-100",
			ease: "none",
		});
	}, {scope: container})

	return (
			<div ref={container} className={'underlay'}>

				<div className='underlay-left'>
					<p>
						We've taken the look
					</p>
					<p>of early-2000s running and made </p>
					<p>it tough enough for everyday wear. </p>
					<p>By combining durable
						materials with soft cushioning,</p>
					<p>the TC 7900 is ready for your journey.</p>
				</div>
				<p className='underlay-right'>
					Colour Shown: Sail/Black/Sail
					Style: DD9682-100
				</p>
			</div>
	)
}




