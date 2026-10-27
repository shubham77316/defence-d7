export interface EcosystemEntity {
  id: string;
  name: string;
  category: "Institutional Research" | "Precision Industrial" | "Technology & Systems";
  domain: string;
  description: string;
  initials: string;
  badge: string;
}

export const STRATEGIC_ECOSYSTEM: EcosystemEntity[] = [
  {
    id: "drdo-domain",
    name: "Defence Research & Development Ecosystem",
    category: "Institutional Research",
    domain: "Strategic Research & Standards",
    description: "Sovereign defence engineering standards, aerodynamic benchmarks, and test evaluation protocols.",
    initials: "DRDO",
    badge: "Standards & Testing"
  },
  {
    id: "aerospace-laboratories",
    name: "Aeronautical Systems Research Hubs",
    category: "Institutional Research",
    domain: "Aero Structures & Composites",
    description: "Advanced computational fluid dynamics, wind-tunnel validation, and composite stress testing frameworks.",
    initials: "CSIR-NAL",
    badge: "Aerospace Hub"
  },
  {
    id: "space-technology-domain",
    name: "High-Altitude & Satellite Subsystems",
    category: "Institutional Research",
    domain: "Orbital & Sub-Orbital Telemetry",
    description: "High-reliability aerospace telemetry, thermal vacuum resilience testing, and hardened orbital sensors.",
    initials: "ISRO-SPEC",
    badge: "Space-Grade Specs"
  },
  {
    id: "heavy-forge-industrial",
    name: "Advanced Forging & Tactical Metallurgy",
    category: "Precision Industrial",
    domain: "Heavy Armament Metallurgy",
    description: "High-integrity titanium, nickel-superalloy forging, and heavy structural military component manufacturing.",
    initials: "BF-KALYANI",
    badge: "Heavy Metallurgy"
  },
  {
    id: "integrated-defense-systems",
    name: "Defence Electronics & Micro-Optics",
    category: "Technology & Systems",
    domain: "C4ISR & Optronics",
    description: "Rugged tactical optronics, thermal core packaging, and mil-spec embedded electronic assemblies.",
    initials: "CENTUM-TS",
    badge: "Defense Electronics"
  },
  {
    id: "aerodynamic-propulsion-lab",
    name: "UAV Airframe & Propulsion Systems",
    category: "Precision Industrial",
    domain: "Aeronautics & Propellers",
    description: "Precision carbon-composite blade fabrication and high-efficiency hybrid brushless motors for UAS.",
    initials: "AIRBLADES",
    badge: "Propulsion Precision"
  },
  {
    id: "autonomous-robotics-grid",
    name: "Tactical Robotics & Ground Autonomy",
    category: "Technology & Systems",
    domain: "UGV Navigation & SLAM",
    description: "Autonomous ground robot chassis, tracked mobility systems, and edge navigation firmware integration.",
    initials: "ANDURAX",
    badge: "Robotics Core"
  },
  {
    id: "secure-telemetry-networks",
    name: "Airborne Surveillance & Radar Grid",
    category: "Technology & Systems",
    domain: "Sensor Systems & Datalinks",
    description: "High-throughput encrypted datalink relays and tactical radar processing suites.",
    initials: "SKY-WARDENS",
    badge: "Datalink Grid"
  },
  {
    id: "industrial-lubricant-facilities",
    name: "Petrochemical Refineries & Tribology Labs",
    category: "Precision Industrial",
    domain: "Synthetic Tribology",
    description: "Industrial-scale synthesis of aerospace ester oils, high-shear greases, and high-temp turbine coolants.",
    initials: "PAGARIYA",
    badge: "Petrochemical Lab"
  }
];

export const ECOSYSTEM_DISCLAIMER = "Strategic Ecosystem reference representations illustrate alignment with defence, aerospace, and sovereign industrial capability matrices. Names, acronyms, and organizational references represent domain standards, prospective integrations, and illustrative ecosystem frameworks.";
