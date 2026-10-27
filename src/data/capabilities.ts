export interface CapabilityItem {
  id: string;
  category: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  readinessLevel: string; // TRL
}

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: "autonomous-swarms",
    category: "Aerospace Systems",
    title: "Autonomous Swarm & Flight Control",
    description: "Distributed decision-making algorithms allowing coordinated multi-agent aerial missions with dynamic role reallocation and zero-GPS fallback.",
    metrics: [
      { label: "Agents Managed", value: "32+ Synchronized" },
      { label: "Failover Time", value: "< 200 ms" }
    ],
    tags: ["Swarm AI", "Decentralized Mesh", "Anti-GPS Spoofing"],
    readinessLevel: "TRL 8"
  },
  {
    id: "sensor-fusion",
    category: "Advanced Systems",
    title: "Multi-Spectrum Sensor Fusion Engine",
    description: "Hardware-accelerated edge data merging combining Long-Wave IR, Short-Wave IR, mmWave Radar, and Optical feeds into a unified 3D tactical HUD.",
    metrics: [
      { label: "Fusion Pipeline", value: "60 FPS 4K Streams" },
      { label: "Object Recall", value: "99.4% Accuracy" }
    ],
    tags: ["Edge AI", "Computer Vision", "Tactical HUD"],
    readinessLevel: "TRL 9"
  },
  {
    id: "ballistic-composites",
    category: "Defence Engineering",
    title: "Nano-Composite Lightweight Armor",
    description: "Multilayered ceramic and carbon-nanotube hybrid matric systems delivering extreme multi-hit ballistic resistance at a 30% weight reduction.",
    metrics: [
      { label: "Weight Reduction", value: "-32% vs Steel" },
      { label: "Threat Rating", value: "7.62 AP Multi-Hit" }
    ],
    tags: ["Nanomaterials", "Ballistics", "Weight Optimization"],
    readinessLevel: "TRL 9"
  },
  {
    id: "synthetic-chemistry",
    category: "Petrochemical",
    title: "Extreme-Thermal Lubrication Matrix",
    description: "Custom-formulated synthetic ester basestocks combined with micro-ceramic boundary lubricants engineered for supersonic jet turbines and heavy gears.",
    metrics: [
      { label: "Temp Ceiling", value: "340°C Continuous" },
      { label: "Wear Reduction", value: "48% Friction Drop" }
    ],
    tags: ["Tribology", "Aerospace Esters", "Extreme Pressure"],
    readinessLevel: "TRL 9"
  },
  {
    id: "perimeter-radar",
    category: "Advanced Systems",
    title: "Micro-Doppler Ground Radar Arrays",
    description: "High-frequency solid-state micro-Doppler radar units capable of distinguishing human crawl, animal footsteps, and micro-drone threats over 5km radius.",
    metrics: [
      { label: "Detection Range", value: "5.5 KM Radius" },
      { label: "False Alarm Rate", value: "< 0.01%" }
    ],
    tags: ["Doppler Radar", "Perimeter Defence", "Micro-UAV Detection"],
    readinessLevel: "TRL 8"
  },
  {
    id: "telemetry-c4isr",
    category: "Defence Engineering",
    title: "Low-Probability-of-Intercept (LPI) Datasets",
    description: "Tactical data relay units utilizing frequency-hopping spread spectrum (FHSS) to transfer encrypted command streams through contested EW airspace.",
    metrics: [
      { label: "Encryption", value: "Quantum-Resistant 512b" },
      { label: "Hop Rate", value: "1,200 hops/sec" }
    ],
    tags: ["C4ISR", "LPI Communications", "Anti-Jamming"],
    readinessLevel: "TRL 8"
  }
];
