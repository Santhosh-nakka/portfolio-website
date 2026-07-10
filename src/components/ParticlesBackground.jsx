import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    }).catch((err) => {
      console.error("Failed to load particles engine:", err);
    });
  }, []);

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: -10
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            push: { quantity: 2 },
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: ["#ffffff", "#08fdd8", "#8d8d8d"] },
          links: { enable: false },
          collisions: { enable: false },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: true,
            speed: 0.5,
            straight: false,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 60, // Total number of particles
          },
          opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
          },
          shape: {
            type: ["circle", "char", "char"],
            options: {
              char: [
                {
                  fill: true,
                  font: "Verdana",
                  value: ["🚀", "🪐", "🌍", "☄️", "🛸", "👨‍🚀", "🌟", "✨", "☄️"],
                  style: "",
                  weight: "400",
                }
              ]
            }
          },
          size: {
            value: { min: 1, max: 20 },
            animation: { enable: false }
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
