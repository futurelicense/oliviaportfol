import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Vec = [number, number, number];

function useScrollRef() {
  const ref = useRef(0);
  useFrame(() => {
    if (typeof window === "undefined") return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    ref.current = max > 0 ? window.scrollY / max : 0;
  });
  return ref;
}

function NetworkGrid({ tint }: { tint: string }) {
  const nodes = useMemo<Vec[]>(() => {
    const list: Vec[] = [];
    for (let x = -5; x <= 5; x += 1) {
      for (let z = -6; z <= 2; z += 1) {
        if ((x + z) % 2 !== 0) continue;
        list.push([x * 2.1, -3.1 + Math.sin(x * 0.8) * 0.25, z * 2.4]);
      }
    }
    return list;
  }, []);

  const links = useMemo(() => {
    const pairs: [Vec, Vec][] = [];
    nodes.forEach((a, i) => {
      const b = nodes[i + 3];
      if (b) pairs.push([a, b]);
    });
    return pairs;
  }, [nodes]);

  return (
    <group>
      {links.map((pair, i) => (
        <Line key={i} points={pair} color={tint} transparent opacity={0.18} lineWidth={1} />
      ))}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshBasicMaterial color={tint} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Pylon({ position }: { position: Vec }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.05, 0.12, 3.2, 6]} />
        <meshStandardMaterial color="#7fc7dd" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[1.6, 0.08, 0.08]} />
        <meshStandardMaterial color="#9fd8e8" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.1, 0.07, 0.07]} />
        <meshStandardMaterial color="#9fd8e8" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Turbine({ position, speed = 1 }: { position: Vec; speed?: number }) {
  const rotor = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (rotor.current) rotor.current.rotation.z += delta * 0.6 * speed;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 3, 10]} />
        <meshStandardMaterial color="#dbe9f2" metalness={0.4} roughness={0.4} />
      </mesh>
      <group ref={rotor} position={[0, 1.55, 0.12]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]} position={[0, 0, 0]}>
            <boxGeometry args={[0.06, 1.5, 0.03]} />
            <meshStandardMaterial color="#f2f7fa" metalness={0.2} roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Substation({ position }: { position: Vec }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.8, 0.12, 1.2]} />
        <meshStandardMaterial color="#4d6a80" metalness={0.5} roughness={0.5} />
      </mesh>
      {[-0.6, 0, 0.6].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.28, 0.9, 0.5]} />
          <meshStandardMaterial
            color="#7fc7dd"
            emissive="#3fa3c4"
            emissiveIntensity={0.35}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function DataParticles({ count = 700 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 28;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 26;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#8fd6ea"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

function FiberRoutes() {
  const routes = useMemo(() => {
    const list: Vec[][] = [];
    for (let i = 0; i < 7; i += 1) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-12, -2 + i * 0.55, -6 + i),
        new THREE.Vector3(-4, 0.4 + Math.sin(i) * 1.2, -2 + i * 0.4),
        new THREE.Vector3(5, -0.6 + Math.cos(i) * 1.4, 1 - i * 0.3),
        new THREE.Vector3(12, 1.4 - i * 0.4, 4 - i * 0.6),
      ]);
      list.push(curve.getPoints(48).map((p) => [p.x, p.y, p.z] as Vec));
    }
    return list;
  }, []);

  return (
    <group>
      {routes.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={i % 3 === 0 ? "#f2c17a" : "#6fc9e6"}
          transparent
          opacity={0.35}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function CameraRig({ intensity = 1 }: { intensity?: number }) {
  const scroll = useScrollRef();
  const { camera, pointer } = useThree();
  useFrame((_, delta) => {
    const t = scroll.current;
    const targetZ = 14 - t * 6 * intensity;
    const targetY = 1.2 + t * 3.2 * intensity;
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 2.2);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 2.2);
    camera.position.x += (pointer.x * 1.6 - camera.position.x) * Math.min(1, delta * 1.2);
    camera.lookAt(0, targetY * 0.25, -2);
  });
  return null;
}

function WorldContent({ variant }: { variant: "home" | "experience" }) {
  return (
    <>
      <color attach="background" args={["#070d15"]} />
      <fog attach="fog" args={["#070d15", 13, 32]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 9, 4]} intensity={1.2} color="#bfe6f5" />
      <pointLight position={[-7, 2, 3]} intensity={32} color="#f2c17a" distance={18} />
      <pointLight position={[6, -1, -4]} intensity={26} color="#63c6e8" distance={20} />
      <pointLight position={[0, 4, 8]} intensity={14} color="#8fd6ea" distance={22} />

      <NetworkGrid tint="#6fc9e6" />
      <FiberRoutes />
      <DataParticles count={variant === "home" ? 700 : 480} />

      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Substation position={[-4.2, 0.4, -2]} />
      </Float>
      <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.6}>
        <Substation position={[5.4, -0.6, -4]} />
      </Float>

      <Pylon position={[-8.5, -1.5, 0]} />
      <Pylon position={[8.4, -1.5, -1.5]} />
      <Pylon position={[1.2, -1.6, -7]} />

      <Turbine position={[-2, -1.6, 3.4]} speed={1} />
      <Turbine position={[2.6, -1.7, 4.6]} speed={0.8} />
      <Turbine position={[6.8, -1.8, 2.2]} speed={1.2} />
    </>
  );
}

export default function WorldScene({
  variant = "home",
  paused = false,
}: {
  variant?: "home" | "experience";
  paused?: boolean;
}) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      dpr={isMobile ? [1, 1.3] : [1, 1.8]}
      camera={{ position: [0, 1.2, 14], fov: 52 }}
      gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
      frameloop={paused ? "never" : "always"}
    >
      <WorldContent variant={variant} />
      {!reduced && <CameraRig intensity={isMobile ? 0.6 : 1} />}
    </Canvas>
  );
}
