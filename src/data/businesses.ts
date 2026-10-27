export interface BusinessSector {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  accentColor: string;
  iconName: string;
  description: string;
  capabilities: string[];
  keySpecs: { label: string; value: string }[];
  applications: string[];
  systemHighlights: string[];
}

export const BUSINESS_SECTORS: BusinessSector[] = [
  {
    id: "aerospace",
    number: "01",
    title: "Aerospace",
    subtitle: "Tactical & Strategic Aerial Solutions",
    tagline: "High-endurance UAV platforms and autonomous aerial intelligence systems.",
    accentColor: "#00e5ff",
    iconName: "Plane",
    description: "Sky Wardens Aerospace engineers cutting-edge Unmanned Aerial Systems (UAS), beyond-line-of-sight reconnaissance platforms, and autonomous flight control modules built to operate in severe electronic warfare conditions.",
    capabilities: [
      "Tactical Medium-Altitude UAV Platforms",
      "Beyond Visual Line-of-Sight (BVLOS) Avionics",
      "Multi-Spectral Aerial Reconnaissance Pods",
      "Autonomous Swarm Intelligence Architecture",
      "High-Altitude Aerodynamic Airframes"
    ],
    keySpecs: [
      { label: "Endurance", value: "Up to 24+ Hours" },
      { label: "Operational Ceiling", value: "30,000+ FT" },
      { label: "Payload Capacity", value: "Up to 120 KG" },
      { label: "Comms Link", value: "Encrypted Satcom / RF" }
    ],
    applications: [
      "Border Surveillance & Threat Identification",
      "High-Altitude Reconnaissance & Mapping",
      "Tactical Battlefield Intelligence",
      "Disaster Relief & Disaster Zone Aerial Assessment"
    ],
    systemHighlights: [
      "Carbon-composite reinforced structure for extreme thermal tolerance",
      "Anti-jamming GPS/GNSS receiver arrays with inertial dead-reckoning",
      "Modular bay supporting EO/IR, SAR (Synthetic Aperture Radar), and LiDAR pods"
    ]
  },
  {
    id: "defence",
    number: "02",
    title: "Defence",
    subtitle: "Tactical Survivability & Field Systems",
    tagline: "Advanced tactical equipment, protective assemblies, and mission-critical systems.",
    accentColor: "#38bdf8",
    iconName: "Shield",
    description: "Engineering durable protective gear, tactical hardware, and battlefield situational awareness tools engineered to maximize force protection and mission efficiency in hostile operating zones.",
    capabilities: [
      "Advanced Ballistic & Blast Protection Systems",
      "Tactical Field Computing & C4ISR Terminals",
      "Modular Combat Load-Carrying Equipment",
      "Soldier-Worn Sensor & Vital Telemetry Arrays",
      "Next-Gen Night Vision & Thermal Optics Integration"
    ],
    keySpecs: [
      { label: "Protection Level", value: "STANAG 4569 / NIJ IV+" },
      { label: "Operating Temp", value: "-40°C to +65°C" },
      { label: "Ruggedization", value: "MIL-STD-810H Certified" },
      { label: "Deployment Ready", value: "All-Terrain & Maritime" }
    ],
    applications: [
      "Infantry Protective Field Gear",
      "Forward Operating Base Perimeter Hardening",
      "Tactical C4ISR Command Relays",
      "Rapid-Response Tactical Ensembles"
    ],
    systemHighlights: [
      "Ultra-high molecular weight polyethylene (UHMWPE) hybrid ceramic composite armor",
      "Zero-signature thermal camouflage coatings",
      "EMP-shielded field communication enclosures"
    ]
  },
  {
    id: "advanced-systems",
    number: "03",
    title: "Advanced Systems",
    subtitle: "Detection, AI & Autonomous Ground Systems",
    tagline: "Intelligent autonomous ground platforms and integrated security perimeters.",
    accentColor: "#818cf8",
    iconName: "Cpu",
    description: "Developing intelligent autonomous ground vehicles (UGVs), seismic and acoustic ground sensor networks, and automated perimeter interdiction platforms driven by edge AI inference.",
    capabilities: [
      "Autonomous Unmanned Ground Vehicles (UGVs)",
      "Smart Perimeter Electronic Fence & Radar Arrays",
      "Multi-Sensor Fusion (Acoustic, Seismic, RF & Optical)",
      "Edge AI Real-Time Threat Classification",
      "Automated Counter-Intrusion Deterrent Platforms"
    ],
    keySpecs: [
      { label: "AI Latency", value: "< 15ms Edge Inference" },
      { label: "Ground Range", value: "80+ KM Autonomous Path" },
      { label: "Sensor Array", value: "360° LiDAR + 4K Thermal" },
      { label: "Payload Power", value: "Integrated Auxiliary Bus" }
    ],
    applications: [
      "Airbase & Strategic Infrastructure Protection",
      "Unmanned Hazardous Zone Reconnaissance",
      "Automated Logistics & Ammo Resupply",
      "Border Fence Autonomous Patrol"
    ],
    systemHighlights: [
      "All-wheel-drive independent suspension with climbing grade up to 45°",
      "Zero-light autonomous navigation using proprietary SLAM algorithms",
      "Secure mesh relay network with automatic multi-node failover"
    ]
  },
  {
    id: "petrochemical",
    number: "04",
    title: "Petrochemical",
    subtitle: "High-Performance Industrial Chemistry",
    tagline: "Military-grade lubricants, synthetic fluids, and high-durability polymer coatings.",
    accentColor: "#f59e0b",
    iconName: "Flame",
    description: "Formulating extreme-pressure lubricants, thermal transfer fluids, and protective chemical coatings tailored for heavy industrial machinery, aerospace turbines, and mission-critical gearboxes.",
    capabilities: [
      "Synthetic Extreme-Pressure Aerospace Lubricants",
      "High-Temperature Turbine & Gearbox Oils",
      "Corrosion-Resistant Industrial Polymer Coatings",
      "Dielectric Coolants for High-Density Radar & Compute",
      "Biodegradable Heavy Machinery Greases"
    ],
    keySpecs: [
      { label: "Viscosity Index", value: "> 185 VI (Synthetic)" },
      { label: "Flash Point", value: "> 280°C" },
      { label: "Pour Point", value: "-54°C" },
      { label: "Corrosion Rating", value: "1A (ASTM D130)" }
    ],
    applications: [
      "Gas Turbine Engines & Auxiliary Power Units",
      "Heavy Armored Vehicle Drivetrains",
      "Naval Propulsion & Saltwater Corrosive Gears",
      "High-Precision CNC & Defence Manufacturing Mills"
    ],
    systemHighlights: [
      "Nano-diamond friction modifier additive formulation",
      "Zero-ash combustion profile for extended engine overhaul cycles",
      "Formulated for extreme thermal stability under sustained high-load conditions"
    ]
  }
];
