/** StarfieldBackground — tsParticles full-page starfield with phase control. */
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function StarfieldBackground({ warpSpeed = false }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 80 : 150;
  const speed = warpSpeed ? 8 : 0.3;

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        color: { value: "#ffffff" },
        number: { value: particleCount, density: { enable: true, area: 800 } },
        opacity: {
          value: { min: 0.2, max: 0.8 },
          animation: { enable: true, speed: 0.5, minimumValue: 0.1 },
        },
        size: {
          value: { min: 0.5, max: 2 },
        },
        move: {
          enable: true,
          speed: speed,
          direction: "none",
          outModes: { default: "out" },
        },
        links: { enable: false },
      },
      detectRetina: true,
    }),
    [particleCount, speed]
  );

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles id="starfield" options={options} className="w-full h-full" />
    </div>
  );
}
