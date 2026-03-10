/** PlanetScene — Three.js canvas: Earth + predicted planet (lazy-loaded). */
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { getPlanetType } from "../../utils/planetClassifier";

function RotatingSphere({ position, radius, color, label }) {
  const meshRef = useRef();
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += 0.3 * delta;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
}

export default function PlanetScene({ predictedRadius }) {
  const earthRadius = 1;
  const scale = Math.min(predictedRadius, 8);
  const planetType = getPlanetType(predictedRadius);
  const ratio = predictedRadius.toFixed(1);
  const spacing = Math.max(earthRadius + scale + 1.5, 4);

  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden bg-[#020818]">
      <Canvas camera={{ position: [0, 0, spacing * 1.8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} />

        {/* Earth */}
        <RotatingSphere
          position={[-spacing / 2, 0, 0]}
          radius={earthRadius}
          color="#4FC3F7"
        />

        {/* Predicted planet */}
        <RotatingSphere
          position={[spacing / 2, 0, 0]}
          radius={scale}
          color={planetType.color}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Labels overlay */}
      <div className="relative -mt-[300px] md:-mt-[400px] h-[300px] md:h-[400px] pointer-events-none flex items-end justify-center pb-6 gap-8">
        <span className="font-mono text-xs text-[var(--accent-cyan)]">
          EARTH — 1.0 R⊕
        </span>
        <span className="font-mono text-xs text-[var(--accent-cyan)]">
          ×{ratio} Earth
        </span>
        <span className="font-mono text-xs" style={{ color: planetType.color }}>
          PREDICTED — {ratio} R⊕
        </span>
      </div>
    </div>
  );
}
