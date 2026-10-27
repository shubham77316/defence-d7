"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Gauge,
  MoveHorizontal,
  Ruler,
  Package,
  Clock,
  Zap,
  Wind,
  PlaneTakeoff,
  ChevronRight,
  ChevronLeft,
  X,
  Compass,
  ArrowRight,
} from "lucide-react";

interface SpecItem {
  label: string;
  value: string;
  icon?: string;
}

interface FeatureSection {
  title: string;
  items: string[];
}

interface Product {
  id: string;
  name: string;
  desc: string;
  overview?: string;
  overviewTitle?: string;
  image: string;
  cutoutImage?: string;
  specs?: SpecItem[];
  features?: string[];
  featuresTitle?: string;
  featuresPosition?: "top" | "bottom";
  featureSections?: FeatureSection[];
  specsTitle?: string;
  specsLayout?: "grid" | "row";
}

interface CategorySection {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  products: Product[];
}

function getSpecIcon(type?: string) {
  switch (type) {
    case "scale":
    case "weight":
      return <Scale className="w-4 h-4 text-cyan-400 shrink-0" />;
    case "gauge":
    case "altitude":
    case "ceiling":
      return <Gauge className="w-4 h-4 text-cyan-400 shrink-0" />;
    case "wingspan":
      return <MoveHorizontal className="w-4 h-4 text-cyan-400 shrink-0" />;
    case "ruler":
    case "length":
      return <Ruler className="w-4 h-4 text-cyan-400 shrink-0" />;
    case "package":
    case "payload":
      return <Package className="w-4 h-4 text-cyan-400 shrink-0" />;
    case "clock":
    case "time":
    case "endurance":
      return <Clock className="w-4 h-4 text-cyan-400 shrink-0" />;
    case "speed":
      return <Gauge className="w-4 h-4 text-cyan-400 shrink-0" />;
    case "zap":
    case "max-speed":
      return <Zap className="w-4 h-4 text-cyan-400 shrink-0" />;
    case "wind":
      return <Wind className="w-4 h-4 text-cyan-400 shrink-0" />;
    case "takeoff":
      return <PlaneTakeoff className="w-4 h-4 text-cyan-400 shrink-0" />;
    default:
      return <Compass className="w-4 h-4 text-cyan-400 shrink-0" />;
  }
}

function getDefaultSpecs(product: Product): SpecItem[] {
  return [
    { label: "Take off weight", value: "15 kg", icon: "scale" },
    { label: "Service ceiling", value: "2500 m", icon: "gauge" },
    { label: "Wingspan", value: "1800 mm", icon: "wingspan" },
    { label: "Length", value: "1400 mm", icon: "ruler" },
    { label: "Payload capacity", value: "4 kg max", icon: "package" },
    { label: "Flight Time", value: "75 Minutes", icon: "clock" },
    { label: "Cruise Speed", value: "28 m/sec", icon: "speed" },
    { label: "Max Speed", value: "40 m/sec", icon: "zap" },
    { label: "Wind tolerance", value: "15 m/sec", icon: "wind" },
    { label: "Take off", value: "Autonomous VTOL", icon: "takeoff" },
  ];
}

const AEROSPACE_SECTIONS: CategorySection[] = [
  {
    id: "surveillance",
    number: "01",
    name: "Surveillance Systems",
    subtitle: "Reconnaissance, ISR, and persistent observation platforms.",
    products: [
      {
        id: "arrow-drone",
        name: "Arrow Drone",
        desc: "Tactical aerospace platform with mission-focused capability presentation and technical specification view.",
        image: "/images/aerospace-arrow-drone.jpg",
        cutoutImage: "/images/drone-arrow.png",
        specs: [
          { label: "Take off weight", value: "12 kg", icon: "scale" },
          { label: "Service ceiling", value: "2000 m", icon: "gauge" },
          { label: "Wingspan", value: "1700 mm", icon: "wingspan" },
          { label: "Length", value: "1500 mm", icon: "ruler" },
          { label: "Payload capacity", value: "3 kg max", icon: "package" },
          { label: "Flight Time", value: "60 Minutes", icon: "clock" },
          { label: "Cruise Speed", value: "25 m/sec", icon: "speed" },
          { label: "Max Speed", value: "35 m/sec", icon: "zap" },
          { label: "Wind tolerance", value: "14 m/sec", icon: "wind" },
          { label: "Take off", value: "Water, Snow, Grass", icon: "takeoff" },
        ],
      },
      {
        id: "ranger-drone",
        name: "Ranger Drone",
        desc: "Fixed-wing surveillance platform shaped for endurance, area coverage, and field reconnaissance.",
        image: "/images/aerospace-ranger-drone.jpg",
        cutoutImage: "/images/drone-ranger.png",
        specs: [
          { label: "Take off weight", value: "5 kg", icon: "scale" },
          { label: "Service ceiling", value: "3000 m", icon: "gauge" },
          { label: "Wingspan", value: "1700 mm", icon: "wingspan" },
          { label: "Length", value: "1200 mm", icon: "ruler" },
          { label: "Payload capacity", value: "1.5 kg max", icon: "package" },
          { label: "Flight Time", value: "90 Minutes", icon: "clock" },
          { label: "Cruise Speed", value: "16 m/sec", icon: "speed" },
          { label: "Max Speed", value: "25 m/sec", icon: "zap" },
          { label: "Wind tolerance", value: "12 m/sec", icon: "wind" },
        ],
      },
      {
        id: "raven-eye",
        name: "Raven Eye",
        desc: "Raven Eye surveillance drone designed for observation, tracking, and persistent mission awareness.",
        image: "/images/aerospace-raven-eye.jpg",
        cutoutImage: "/images/drone-raven-eye.png",
        specs: [
          { label: "Drone type", value: "Raven Eye - HYBRID VTOL FIXED WING DRONE" },
          { label: "Body type", value: "Carbon fiber" },
          { label: "Mode of operation", value: "Autonomous Unmanned Aircraft System" },
          { label: "Max RANGE", value: "10 km (due to limitation of telemetry)" },
          { label: "Max Payload", value: "3 kg" },
          { label: "Max flight time", value: "2 hours / 120 mins" },
          { label: "AMSL / AGL", value: "15000 feet or 4500 meters / 200 Mtrs" },
          { label: "Man portable", value: "2-man operation" },
          { label: "All Up Weight", value: "28 Kg max" },
        ],
        features: [
          "Very silent at 100-meter height (low Aural Signature)",
          "High wind resistance as compared to quad copter versions",
          "Equipped with AI algo to detect object and create report with lat-long detected objects (bunker, target, object, soldier for DRI)",
          "Can drop 3 kgs payload with modification of dropping mechanism relevant to the IA payload",
        ],
      },
      {
        id: "ghost-piston",
        name: "Ghost (Piston Engine)",
        desc: "Long-endurance tactical UAV with heavy-lift capability for surveillance, logistics, and extended-range missions.",
        overview: "Long-endurance tactical UAV with heavy-lift capability, designed for surveillance, logistics, and extended-range missions in demanding environments.",
        image: "/images/aerospace-ghost-piston.jpg",
        cutoutImage: "/images/drone-ghost-piston.png",
        specs: [
          { label: "Take-off weight", value: "60 kg" },
          { label: "Service length", value: "4000 m" },
          { label: "Payload capacity", value: "Up to 20 kg" },
          { label: "Flight time", value: "4.5-5 hours" },
          { label: "Cruise speed", value: "80 km/h" },
          { label: "Max speed", value: "120 km/h" },
          { label: "Wind tolerance", value: "14 m/sec" },
          { label: "Take-off", value: "Water, snow, grass" },
        ],
      },
      {
        id: "ghost-electric",
        name: "Ghost (Electric Motor)",
        desc: "Silent electric UAV engineered for reconnaissance, mapping, inspection, and precision aerial operations.",
        overview: "Silent and effective electric UAV engineered for reconnaissance, mapping, inspection, and precision aerial operations.",
        image: "/images/aerospace-ghost-electric.jpg",
        cutoutImage: "/images/drone-ghost-electric.png",
        specs: [
          { label: "Take-off weight", value: "80 kg" },
          { label: "Service length", value: "4000 m" },
          { label: "Payload capacity", value: "Up to 18 kg" },
          { label: "Flight time", value: "120-120 minutes" },
          { label: "Cruise speed", value: "80 km/h" },
          { label: "Max speed", value: "120 km/h" },
          { label: "Wind tolerance", value: "14 m/sec" },
          { label: "Take-off", value: "Water, snow, grass" },
        ],
      },
      {
        id: "scout-1-alpha",
        name: "Scout 1 Alpha Surveillance Drone",
        desc: "Dedicated surveillance quadcopter designed for observation, monitoring, and tactical field intelligence.",
        image: "/images/aerospace-scout-alpha.jpg",
        cutoutImage: "/images/drone-scout-alpha.png",
        featuresTitle: "PLATFORM FEATURES",
        featuresPosition: "top",
        features: [
          "Advanced Sensors: EO/IR cameras, smart flight controller give readiness for 24/7 surveillance in all weather conditions.",
          "Real-Time Data Transmission: Secure, high-bandwidth satellite and LOS",
          "Modular Payload Design: Supports easy integration of additional sensors or payloads for mission-specific requirements.",
        ],
        specs: [
          { label: "Dimension", value: "750 mm x 750 mm" },
          { label: "Weight", value: "6 kg" },
          { label: "Endurance", value: "90 minutes" },
          { label: "Range", value: "10 km" },
          { label: "Max Altitude", value: "1000 m" },
          { label: "Payload Capacity", value: "1 kg" },
          { label: "Sensors", value: "EO camera (full HD) and Infrared (IR) sensor" },
        ],
      },
      {
        id: "swat-airborne",
        name: "SWAT Airborne Surveillance & Support",
        desc: "Airborne support system intended for tactical overwatch, response coordination, and team visibility.",
        image: "/images/aerospace-swat-airborne.jpg",
        cutoutImage: "/images/drone-swat-airborne.png",
        specs: [
          { label: "UAV weight with battery and standard payloads", value: "4.2 Kgs" },
          { label: "UAV size with propeller", value: "1176.0 x 1176.0 x 286.0 mm" },
          { label: "Endurance / flight time (at MSL)", value: "Up to 64 Mins" },
          { label: "Range for live transmission (radius)", value: "Up to 6 km" },
          { label: "Nominal cruise speed", value: "9 m/s" },
          { label: "Propulsion", value: "Electric propulsion" },
          { label: "Maximum operating altitude (AGL)", value: "120 m" },
          { label: "Maximum launch altitude (AMSL)", value: "3000 m" },
          { label: "Wind resistance", value: "12 m/s" },
          { label: "Launch and recovery", value: "Semi-autonomous vertical take-off to landing (VTOL)" },
          { label: "Operating crew", value: "Single person deployment" },
          { label: "Deployment time", value: "< 5 min" },
          { label: "Battery capacity", value: "34000 mAH" },
        ],
        featureSections: [
          {
            title: "FAIL SAFE FEATURES",
            items: [
              "Return to home on communication failure",
              "Return to home / land on low battery",
              "Return to home on Battery imbalance",
            ],
          },
          {
            title: "PAYLOAD CHARACTERISTICS - SWAPPABLE",
            items: [
              "EO 1.0",
              "EO 2.0 (10X Optical Zoom)",
              "EO + IR 2.0",
            ],
          },
        ],
      }
    ]
  },
  {
    id: "fpv",
    number: "02",
    name: "Tactical FPV Platforms",
    subtitle: "Small agile combat and close-range tactical systems.",
    products: [
      {
        id: "5-inch-fpv",
        name: "5-inch FPV Drone",
        desc: "Compact FPV surveillance platform configured for agile day operations and payload deployment.",
        image: "/images/aerospace-fpv-5inch.jpg",
        cutoutImage: "/images/drone-fpv-5inch.png",
        specs: [
          { label: "Drone type", value: "FPV - Quadcopter" },
          { label: "Body type", value: "Carbon Fiber / Aluminum / Plastic" },
          { label: "Mode of operation", value: "Manual, autonomous and Self-flying" },
          { label: "Max RANGE", value: "1 to 2 Km" },
          { label: "Max Payload", value: "Up-to 200 gms" },
          { label: "Max flight time", value: "Up-to 15 mins" },
          { label: "AMSL / AGL", value: "1500 m / 120 m" },
          { label: "Man portable", value: "1 Man Operation" },
          { label: "All Up Weight", value: "<500 gms" },
        ],
        featureSections: [
          {
            title: "OTHER FEATURES",
            items: [
              "Battery: Li-Ion 4s (2600 mAH)",
              "Camera: Analog, Video Recording on Googles",
              "Transmitter: 250 mw, 16 ch with telemetry",
              "Flying Speed: Up to 80 Km/hr",
            ],
          },
          {
            title: "DELIVERY TIME",
            items: [
              "Up to 3 units - 7 days",
              "Up to 10 Units - 21 days",
            ],
          },
        ],
      },
      {
        id: "7-inch-fpv",
        name: "7-inch FPV Drone",
        desc: "Extended FPV platform developed for day camera payloads and precision release missions.",
        image: "/images/aerospace-fpv-7inch.jpg",
        cutoutImage: "/images/drone-fpv-7inch.png",
        specs: [
          { label: "Drone type", value: "FPV - Quadcopter" },
          { label: "Body type", value: "Carbon Fiber / Aluminum / Plastic" },
          { label: "Mode of operation", value: "Manual, autonomous and Self-flying" },
          { label: "Max RANGE", value: "2 to 3 Kms" },
          { label: "Max Payload", value: "Up-to 500 gms" },
          { label: "Max flight time", value: "Up-to 15 mins" },
          { label: "AMSL / AGL", value: "2000 m / 120 m" },
          { label: "Man portable", value: "1 Man Operation" },
          { label: "All Up Weight", value: "1.5 Kgs" },
        ],
        featureSections: [
          {
            title: "OTHER FEATURES",
            items: [
              "Battery: Li-ion 6800 mAh",
              "Camera: Day (Thermal camera on additional cost)",
              "Transmitter: 16 ch with telemetry",
              "Flying Speed: 60 to 80 Kms per hour",
            ],
          },
          {
            title: "DELIVERY TIME",
            items: [
              "Up to 10 units - 7 days Delivery time",
              "Up to 50 units - 30 days Delivery time",
              "Up to 150 units - 60 days Delivery time",
              "Up to 250 units - 90 days Delivery time",
            ],
          },
        ],
      },
      {
        id: "ultra-hardened-whooper",
        name: "Ultra Hardened Training Whooper 5-Inch Drone",
        desc: "Rugged military training UAV for intensive field operations, pilot training, and mission rehearsal.",
        overview: "Hardened training drone for military purposes. Rugged military training UAV engineered to withstand intensive field operations, enabling realistic pilot training, mission rehearsal, and tactical skill development.",
        image: "/images/aerospace-fpv-whooper.jpg",
        cutoutImage: "/images/drone-whooper-5inch.png",
        specs: [
          { label: "Weight (AUW)", value: "750-950 g" },
          { label: "Flight time", value: "8-10 mins" },
          { label: "Payload", value: "Up to 250 gms (Full GoPro)" },
          { label: "Top speed", value: "60-75 mph" },
        ],
      }
    ]
  },
  {
    id: "strike",
    number: "03",
    name: "Strike Systems",
    subtitle: "Precision payload delivery and kinetic air-to-ground response platforms.",
    products: [
      {
        id: "sns-shoot-scoot",
        name: "SNS (Shoot & Scoot)",
        desc: "SNS Shoot & Scoot quadcopter platform configured for rapid tactical maneuvering and release capability.",
        image: "/images/aerospace-sns-shoot-scoot.jpg",
        cutoutImage: "/images/drone-sns-shoot-scoot.png",
        featuresTitle: "CAPABILITIES",
        featuresPosition: "top",
        features: [
          "Precision Strike Capabilities: Integration with two grenade bomb to drop at target for more precision and destruction.",
          "Extended Range and Payload Capacity: Ability to carry two grenade bomb at a time, can carry up to 2 kg payload.",
          "Loitering Capability: Capability to hover and wait for a target with immediate strike options when required.",
          "Advanced Guidance Systems: Smart Vision based targeting systems with a focus on minimizing collateral damage.",
        ],
        specs: [
          { label: "Prop size", value: "10 inch" },
          { label: "Weight", value: "1.7 kg (without payload)" },
          { label: "Endurance", value: "25 min (without payload)" },
          { label: "Range", value: "4-5 km" },
          { label: "Payload", value: "2.5 kg" },
          { label: "Guidance System", value: "GPS and inertial navigation system for autonomous flight and targeting" },
        ],
      },
      {
        id: "onyx-dart",
        name: "Onyx Dart",
        desc: "Onyx Dart multirotor built for controlled aerial release and short-range tactical deployment.",
        image: "/images/aerospace-onyx-dart.jpg",
        featuresTitle: "CAPABILITIES",
        featuresPosition: "top",
        features: [
          "Precision Strike Capabilities: Integration with mortar bombs, such as 52mm mortar.",
          "Extended Range and Payload Capacity: Ability to carry multiple bomb at a time, can carry 10 kg payload and operational range up to 10 km.",
          "Loitering Capability: Capability to hover and wait for a target with immediate strike options when required.",
          "Advanced Guidance Systems: Smart Vision based targeting systems with a focus on minimizing collateral damage.",
        ],
        specs: [
          { label: "Wingspan", value: "1100 mm" },
          { label: "Weight", value: "11 kg (without payload)" },
          { label: "Endurance", value: "60 minutes with camera and 30 minutes with full payload" },
          { label: "Range", value: "10 km" },
          { label: "Payload Capacity", value: "10 kg" },
        ],
        featureSections: [
          {
            title: "WEAPONS",
            items: [
              "52 mm mortar",
              "Precision Strike Pods for tailored munitions",
            ],
          },
          {
            title: "AVIONICS",
            items: [
              "Integrated smart bomb targeting system",
              "Autonomous flight system with manual override",
              "Backup manual controls in case of failure",
            ],
          },
        ],
      },
      {
        id: "weaponized-drone",
        name: "Weaponized Drone",
        desc: "Tactical multirotor platform configured for payload delivery, engagement support, and mission flexibility.",
        image: "/images/aerospace-weaponized-drone.jpg",
        specsTitle: "AERIAL VEHICLE CHARACTERISTICS",
        specsLayout: "row",
        specs: [
          { label: "UAV weight with battery and standard payloads", value: "< 50 Kg (MTOW)" },
          { label: "UAV size with propeller", value: "2236 x 2236 x 620 mm3" },
          { label: "UAV size with folded propeller", value: "1350 x 1350 x 620 mm3" },
          { label: "UAV size with folded arms and folded propeller", value: "480 x 480 x 620 mm3" },
          { label: "Endurance / flight time", value: "53 min with 5 Kg payload / 45 min with 10 Kg payload / 35 min with 15 Kg payload" },
          { label: "Maximum Operating Altitude (AGL)", value: "500 m" },
          { label: "Maximum Launch Altitude (MSL)", value: "2000 m" },
          { label: "Avg Cruise Speed", value: "12 m/s (can be increased)" },
          { label: "Wind Resistance", value: "12 m/s" },
          { label: "Payload Capacity", value: "Up-to 15 kg" },
          { label: "Flight Range (Under Ideal Conditions)", value: "Up-to 8 km (depending on payload)" },
          { label: "Precision Landing", value: "+/- 250 cm" },
        ],
        featureSections: [
          {
            title: "CAMERA PAYLOAD OPTIONS",
            items: [
              "EO camera",
              "EO + IR",
            ],
          },
          {
            title: "MISSION SYSTEM",
            items: [
              "WTSS (Weapon Triggering Stabilizing System)",
              "Nvidia Jetson Orin NX 8GB",
              "Doodle labs Mini OEM Mesh Rider Radio 2400~2482 MHz",
            ],
          },
        ],
      },
      {
        id: "grenade-dropping-agri",
        name: "Grenade Dropping With Agri Drone Stack",
        desc: "Adapted agricultural stack platform repurposed for aerial drop and tactical mission support roles.",
        image: "/images/aerospace-agri-drop-drone.jpg",
        specs: [
          { label: "Drone type", value: "Agri Drone Stack - Hexacopter" },
          { label: "Body type", value: "Carbon Fiber / Aluminum / Plastic" },
          { label: "Mode of operation", value: "Manual, autonomous and Self-flying" },
          { label: "Max RANGE", value: "3 to 5 Kms" },
          { label: "Max Payload", value: "Up-to 6 Kgs (6 Grenade Dropping)" },
          { label: "Max flight time", value: "Up-to 30 mins" },
          { label: "AMSL / AGL", value: "2000 m / 120 m" },
          { label: "Man portable", value: "1 Man Operation" },
          { label: "All Up Weight", value: "22.5 Kgs" },
        ],
        featureSections: [
          {
            title: "OTHER FEATURES",
            items: [
              "Battery: Li-ion 30000 mAh",
              "Camera: Day & Thermal Integrated",
              "Transmitter: 16 ch with telemetry",
              "Flying Speed: Up to 12 m/s",
            ],
          },
          {
            title: "DELIVERY TIME",
            items: [
              "Up to 10 units - 10 days Delivery time",
              "Up to 100 units - 30 days Delivery time",
              "Up to 200 units - 45 days Delivery time",
              "Up to 500 units - 90 days Delivery time",
            ],
          },
        ],
      }
    ]
  },
  {
    id: "loitering",
    number: "04",
    name: "Loitering Munitions",
    subtitle: "Terminal strike systems built for rapid deployment profiles.",
    products: [
      {
        id: "viper-x",
        name: "Viper-X",
        desc: "Viper-X loitering tactical drone platform configured for precision attack and rapid target engagement.",
        image: "/images/aerospace-viper-x.jpg",
        featuresTitle: "CAPABILITIES",
        featuresPosition: "top",
        features: [
          "Suicide Payload Option: Lightweight, cost-effective high speed FPV drone designed for high precision.",
          "Pilot-Assisted Targeting: Uses vision sensor target identification and decision-making during final approach.",
          "Rapid Deployment: Capable of being launched from a variety of platforms, including fixed and mobile bases.",
          "Low Cost: Designed for low-cost tactical use, suitable for missions requiring expendable force projection.",
        ],
        specs: [
          { label: "Prop size", value: "7 inch" },
          { label: "Weight", value: "1 kg (without payload)" },
          { label: "Endurance", value: "20 min (without payload)" },
          { label: "Range", value: "4-5 km" },
          { label: "Payload", value: "up to 1 kg" },
          { label: "Guidance System", value: "GPS and inertial navigation system for autonomous flight and targeting" },
        ],
      },
      {
        id: "doom-sparrow",
        name: "Doom Sparrow",
        desc: "Doom Sparrow compact loitering drone concept intended for fast deployment and terminal tactical strike profiles.",
        image: "/images/aerospace-doom-sparrow.jpg",
        specs: [
          { label: "Drone type", value: "Doom Sparrow - HYBRID VTOL FIXED WING DRONE" },
          { label: "Body type", value: "EPP" },
          { label: "Mode of operation", value: "Manual, autonomous and self-flying" },
          { label: "Max RANGE", value: "5 km line of sight (due to limitation of telemetry)" },
          { label: "Max Payload", value: "Option 1: 500 gm, Option 2: 1 KG" },
          { label: "Max flight time", value: "30 mins" },
          { label: "AMSL / AGL", value: "8000 ft or 2400 meters / 120 Mtrs" },
          { label: "Man portable", value: "Two-man operations" },
          { label: "All Up Weight", value: "3 KG / 4 KG" },
        ],
        featuresTitle: "SPECIAL FEATURES",
        featuresPosition: "bottom",
        features: [
          "UP to 500 gm payload",
          "UP to 1 kg payload",
        ],
      },
      {
        id: "bee-sting-kamikaze",
        name: "Bee Sting (Kamikaze)",
        desc: "Advanced loitering munition platform for precision strike, real-time reconnaissance, and rapid target interception.",
        overview: "Advanced loitering munition platform engineered for precision strike missions, real-time reconnaissance, and rapid target interception.",
        image: "/images/aerospace-bee-sting.jpg",
        specs: [
          { label: "Weight (MTOW)", value: "1.4 kg (highly dependent on battery)" },
          { label: "Flight time", value: "4-5 mins / 10 mins empty" },
          { label: "Payload", value: "1 kg warhead" },
          { label: "Top speed", value: "250+ mph (400 km/h)" },
        ],
      }
    ]
  },
  {
    id: "heavy",
    number: "05",
    name: "Heavy Tactical Platforms",
    subtitle: "Large systems with higher payload or specialized capability.",
    products: [
      {
        id: "cargo-drone-stack",
        name: "Cargo Drone Stack Quadcopter",
        desc: "Heavy-lift quadcopter platform positioned for cargo transfer and logistics-oriented aerial support.",
        image: "/images/aerospace-cargo-stack.jpg",
        specs: [
          { label: "Drone type", value: "Cargo Drone Stack - Quadcopter" },
          { label: "Body type", value: "Carbon Fiber / Aluminum / Plastic" },
          { label: "Mode of operation", value: "Manual, autonomous and Self-flying" },
          { label: "Max RANGE", value: "5 to 6 Kms" },
          { label: "Max Payload", value: "Up-to 10 Kgs (6 Grenade Dropping)" },
          { label: "Max flight time", value: "Up-to 45 mins" },
          { label: "AMSL / AGL", value: "2000 m / 500 m" },
          { label: "Man portable", value: "2 Man Operation" },
          { label: "All Up Weight", value: "43 Kgs" },
        ],
        featureSections: [
          {
            title: "OTHER FEATURES",
            items: [
              "Battery: Li-ion 108000 mAh",
              "Camera: Day & Thermal Integrated",
              "Transmitter: 16 ch with telemetry",
              "Flying Speed: Up to 12 m/s",
            ],
          },
          {
            title: "DELIVERY TIME",
            items: [
              "Up to 2 units - 15 days Delivery time",
              "Up to 10 units - 30 days Delivery time",
              "Up to 25 units - 60 days Delivery time",
              "Up to 60 units - 90 days Delivery time",
            ],
          },
        ],
      },
      {
        id: "heavy-lift-50kg",
        name: "Heavy Lift Drone (50kg)",
        desc: "Heavy-lift tactical resupply drone for equipment transport and operational support with exceptional payload capacity.",
        overview: "Designed for tactical resupply, equipment transport, and operational support with exceptional payload-carrying capability.",
        image: "/images/aerospace-heavy-lift-50kg.jpg",
        specs: [
          { label: "Weight (MTOW)", value: "65 kg" },
          { label: "Flight time", value: "15-25 mins loaded / 40+ mins empty" },
          { label: "Payload", value: "50 kg" },
          { label: "Top speed", value: "35-45 mph" },
        ],
      },
      {
        id: "raptor-h8-bazz-h8",
        name: "Raptor H8/BAZZ H8",
        desc: "Heavy tactical aerial system concept built around specialized launch and combat support integration.",
        image: "/images/aerospace-raptor-h8.jpg",
        specs: [
          { label: "Drone type", value: "CO-AXIAL QUADCOPTER DRONE - ATTACK DRONE tested with CARL GUSTAV ROCKET LAUNCHER" },
          { label: "Body type", value: "Carbon Fibre / Aluminum" },
          { label: "Mode of operation", value: "Manual, autonomous and Self-flying" },
          { label: "Max RANGE", value: "10 km line of sight (due to limitation of telemetry)" },
          { label: "Max Payload", value: "UP to 45 kg" },
          { label: "Max flight time", value: "60 min with 5 kg payload / 45 min with 25 kg" },
          { label: "AMSL / AGL", value: "12000 ft or 3600 meters / 200 Mtrs" },
          { label: "Man portable", value: "4-man operation" },
          { label: "All Up Weight", value: "140 kg maximum take-off weight" },
        ],
        featureSections: [
          {
            title: "SPECIAL FEATURES",
            items: [
              "RL System / Anti-Tank - Carl Gustav",
              "High stability vehicle, accuracy 2 Ft, 250 Mtrs",
              "AI Tgt Locking, X-Y Axis Servo Capable",
              "Heavy Lift Logistic Drone (45 KG)",
              "Day & Thermal Camera",
            ],
          },
          {
            title: "DELIVERY TIME",
            items: [
              "UP to 7 units - 45 days Delivery time",
              "UP to 15 units - 60 days Delivery time",
              "UP to 30 units - 90 days Delivery time",
              "UP to 60 units - 180 days Delivery time",
            ],
          },
        ],
      },
      {
        id: "aerial-recon-node",
        name: "Aerial Recon Node Quadcopter",
        desc: "Aerial Recon Node quadcopter optimized for quick deployment, inspection, and close-range tactical operations.",
        image: "/images/aerospace-aerial-recon.jpg",
        specs: [
          { label: "Drone type", value: "Aerial Recon Node - Quadcopter" },
          { label: "Body type", value: "Carbon Fiber / Aluminum / Plastic" },
          { label: "Mode of operation", value: "Manual, autonomous and Self-flying" },
          { label: "Max RANGE", value: "3 to 4 Kms" },
          { label: "Max Payload", value: "Up-to 600 gms" },
          { label: "Max flight time", value: "Up-to 35 mins" },
          { label: "AMSL / AGL", value: "3700 m / 500 m" },
          { label: "Man portable", value: "1 Man Operation" },
          { label: "All Up Weight", value: "2.6 Kgs" },
        ],
        featureSections: [
          {
            title: "OTHER FEATURES",
            items: [
              "Battery: Li-ion 9500 mAh",
              "Camera: Day & Thermal Integrated",
              "Transmitter: 16 ch with telemetry",
              "Flying Speed: Up to 12 m/s",
            ],
          },
          {
            title: "DELIVERY TIME",
            items: [
              "Up to 5 units - 15 days Delivery time",
              "Up to 25 units - 30 days Delivery time",
              "Up to 75 units - 60 days Delivery time",
              "Up to 150 units - 90 days Delivery time",
            ],
          },
        ],
      }
    ]
  },
  {
    id: "special",
    number: "06",
    name: "Special Mission Systems",
    subtitle: "Mission-specific equipment and tactical support solutions.",
    products: [
      {
        id: "agri-hawk",
        name: "Agri Hawk",
        desc: "Agriculture spraying drone with smart sensors for obstacle and terrain avoidance.",
        overview: "Agri Hawk is a 10-litre agriculture spraying hexacopter designed for autonomous or manual operation. Smart terrain and obstacle-avoidance sensors, integrated live video, and automated failsafes support safer, more efficient field coverage while reducing farmers' direct contact with chemicals.",
        image: "/images/aerospace-agri-hawk.jpg",
        specs: [
          { label: "Configuration", value: "Hexacopter" },
          { label: "Spray capacity", value: "10 litres" },
          { label: "Endurance", value: ">20 minutes" },
          { label: "Live transmission", value: "500 m LOS" },
          { label: "Operational speed", value: "5 m/s" },
          { label: "Maximum speed", value: "15 m/s" },
          { label: "Operating altitude", value: "30 m AGL" },
          { label: "Wind resistance", value: "Up to 5 m/s" },
          { label: "Operation modes", value: "Manual and autonomous" },
        ],
        featureSections: [
          {
            title: "TECHNICAL SPECIFICATIONS",
            items: [
              "UAV weight with battery and maximum payload: <29 kg",
              "UAV size with propellers: 2 x 1.8 x 0.5 m (L x B x H)",
              "Functional temperature range: -10°C to +55°C (NABL certified)",
              "Propulsion: Battery-powered electric propulsion",
              "Dust and drizzle resistance: IP53 (NABL certified)",
              "Technical life: Minimum 500 landings (self-certified)",
              "Field clearance required: 5 x 5 m flat land area",
              "Launch and operation: Vertical take-off and landing (VTOL)",
              "Deployment time: <10 minutes from assembly to take-off",
            ],
          },
          {
            title: "SPRAYING OPERATIONS",
            items: [
              "Area coverage: 1 acre per 10-litre flight, with 2 flights per fully charged battery set",
              "Spray swath: 2-5 m",
              "Supported nozzles: flat jet and centrifugal",
              "Supported payloads: liquid pesticides, water, fertilizers, nutrients, and other agrochemicals",
              "Maximum operating crew: 2",
            ],
          },
          {
            title: "SAFETY AND CONTROL",
            items: [
              "Terrain and obstacle detection and avoidance",
              "Automatic return-to-home and landing after communication loss, low battery, health-parameter exceedance, or geofence breach",
              "On-board GPS with triple redundancy and an emergency kill switch",
              "Ground-control app with live location, flight telemetry, spray-rate adjustment, field reports, and live video",
            ],
          },
        ],
      },
      {
        id: "riot-hawk",
        name: "Riot Hawk",
        desc: "Tactical aerial riot-control system with a high-precision deployment platform.",
        overview: "Riot Hawk is a tactical aerial riot-control system designed for precise, remotely operated 38 mm payload deployment. Autonomous navigation, a long-range digital link, and rapid launcher reloading support safe standoff operations in high-pressure environments.",
        image: "/images/aerospace-riot-hawk.jpg",
        specs: [
          { label: "Payload", value: "6 x 38 mm tear-gas shells" },
          { label: "Loaded endurance", value: "28-30 minutes" },
          { label: "Digital link", value: "15 km HD video and telemetry" },
          { label: "Cruise speed", value: "8-15 m/s" },
          { label: "Maximum speed", value: "21 m/s (75 km/h)" },
          { label: "Service ceiling", value: "4,500 m ASL" },
          { label: "Wind resistance", value: "12 m/s (Level 6 Beaufort)" },
          { label: "Navigation", value: "GPS and RTK" },
          { label: "Launcher reload", value: "Approximately 3 minutes" },
        ],
        featureSections: [
          {
            title: "TECHNICAL SPECIFICATIONS",
            items: [
              "Motor model: 6208-280KV",
              "Maximum thrust: 6.2 kg per axis",
              "Take-off weight: 2.2 kg per axis",
              "Climb rate: 3-5 m/s",
              "Maximum flight time without launcher: Approximately 65 minutes",
              "Position accuracy: ±1.5 m GNSS, ±2 cm with RTK",
              "Hover accuracy: ±0.7 m horizontal, ±0.5 m vertical",
              "Flight controller: Pixhawk Cube Orange+",
              "Ground control station: MK32 HD digital transmission system",
              "Mission-planning software: QGroundControl, Mission Planner, UGCS",
              "Autonomous modes: Waypoints, grid mapping, patrol loops, RTL",
              "Operating temperature: -10°C to 50°C",
            ],
          },
          {
            title: "LAUNCHER MODULE",
            items: [
              "Caliber: 38 mm",
              "Capacity: 6 rounds",
              "Firing method: Electric remote ignition",
              "Launcher weight: 3.85 kg",
              "Material: Military-grade carbon fiber and aviation aluminum",
              "Mounting: Quick-release, tool-free",
              "System voltage: 13-24 V from aircraft",
              "Module dimensions: 220 x 140 x 260 mm",
            ],
          },
          {
            title: "OPERATIONAL FEATURES",
            items: [
              "Precision payload deployment at distances up to 1,000 m",
              "GPS and RTK support for accurate deployment",
              "Geo-fencing with low-battery and signal-loss automatic return-to-launch",
              "Quick-release mission payload bay compatible with standard flight controllers",
              "Carbon-fiber arms and high-strength shock-resistant landing gear",
            ],
          },
        ],
      },
      {
        id: "advanced-ied-detection",
        name: "Advanced IED Detection",
        desc: "Mission support drone intended for route inspection, detection workflows, and tactical response support.",
        image: "/images/aerospace-ied-detection.jpg",
        specsTitle: "AERIAL VEHICLE CHARACTERISTICS",
        specsLayout: "row",
        specs: [
          { label: "UAV weight with battery and standard payloads", value: "< 50 Kg (MTOW)" },
          { label: "UAV size with propeller", value: "2236 x 2236 x 620 mm3" },
          { label: "UAV size with folded propeller", value: "1350 x 1350 x 620 mm3" },
          { label: "UAV size with folded arms and folded propeller", value: "480 x 480 x 620 mm3" },
          { label: "Endurance / flight time", value: "53 min with 5 Kg payload / 45 min with 10 Kg payload / 35 min with 15 Kg payload" },
          { label: "Maximum Operating Altitude (AGL)", value: "500 m" },
          { label: "Maximum Launch Altitude (MSL)", value: "2000 m" },
          { label: "Avg Cruise Speed", value: "12 m/s (can be increased)" },
          { label: "Wind Resistance", value: "12 m/s" },
          { label: "Payload Capacity", value: "Up-to 15 kg" },
          { label: "Flight Range (Under Ideal Conditions)", value: "Up-to 8 km (depending on payload)" },
          { label: "Precision Landing", value: "+/- 250 cm" },
        ],
        featuresTitle: "PAYLOAD OPTIONS",
        features: [
          "EO",
          "EO + IR",
        ],
      },
    ]
  },
  {
    id: "infrastructure",
    number: "07",
    name: "Support Infrastructure",
    subtitle: "Operational support systems designed to sustain autonomous deployments.",
    products: [
      {
        id: "wireless-charger-autonomous",
        name: "Optional Wireless Charger For Autonomous Solutions",
        desc: "Autonomous support module intended to extend field readiness and operational turnaround cycles.",
        image: "/images/aerospace-wireless-dock.jpg",
        overviewTitle: "SYSTEM",
        overview: "Optional wireless charger for autonomous solutions.",
        specs: [],
        featureSections: [
          {
            title: "AI & ML SOLUTIONS",
            items: [
              "Human Detection & Crowd Monitoring",
              "Vehicle Detection & Classification",
              "Number Plate Recognition",
              "Foreign Object Detection",
              "Live Streaming",
            ],
          },
        ],
      }
    ]
  }
];

export default function BusinessesPage() {
  const [sections, setSections] = useState<CategorySection[]>(AEROSPACE_SECTIONS);
  const [activeSectionId, setActiveSectionId] = useState("surveillance");
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [modalSection, setModalSection] = useState<CategorySection | null>(null);

  const handleNextModal = () => {
    if (!modalProduct) return;
    const allPlatforms = sections.flatMap((sec) =>
      sec.products.map((prod) => ({ product: prod, section: sec }))
    );
    const currIdx = allPlatforms.findIndex((item) => item.product.id === modalProduct.id);
    if (currIdx === -1) return;
    const nextIdx = (currIdx + 1) % allPlatforms.length;
    setModalProduct(allPlatforms[nextIdx].product);
    setModalSection(allPlatforms[nextIdx].section);
  };

  const handlePrevModal = () => {
    if (!modalProduct) return;
    const allPlatforms = sections.flatMap((sec) =>
      sec.products.map((prod) => ({ product: prod, section: sec }))
    );
    const currIdx = allPlatforms.findIndex((item) => item.product.id === modalProduct.id);
    if (currIdx === -1) return;
    const prevIdx = (currIdx - 1 + allPlatforms.length) % allPlatforms.length;
    setModalProduct(allPlatforms[prevIdx].product);
    setModalSection(allPlatforms[prevIdx].section);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalProduct || !modalSection) return;
      if (e.key === "Escape") setModalProduct(null);
      if (e.key === "ArrowRight") handleNextModal();
      if (e.key === "ArrowLeft") handlePrevModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalProduct, modalSection]);

  useEffect(() => {
    async function loadDynamicAerospace() {
      try {
        const res = await fetch("/api/products?sector=aerospace&status=active", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const json = await res.json();
        const liveProducts = Array.isArray(json.data) ? json.data : (json.data?.data || []);
        if (!liveProducts || liveProducts.length === 0) return;

        setSections((prevSections) => {
          const newSections: CategorySection[] = prevSections.map((sec) => ({
            ...sec,
            products: [...sec.products],
          }));

          liveProducts.forEach((dbProd: any) => {
            const prodName = dbProd.name || "Untitled";
            const prodDesc = dbProd.desc || "";
            const prodImg = (dbProd.image && typeof dbProd.image === "string") ? dbProd.image.trim() : "";
            const prodCat = (dbProd.category || "Surveillance Systems").trim();
            const prodId = dbProd.slug || dbProd._id || prodName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

            // Look for matching category section
            let targetSection = newSections.find(
              (sec) =>
                sec.name.toLowerCase() === prodCat.toLowerCase() ||
                sec.id.toLowerCase() === prodCat.toLowerCase().replace(/[^a-z0-9]+/g, "-")
            );

            // If not found, create new section dynamically
            if (!targetSection) {
              const secNum = dbProd.categoryNumber || String(newSections.length + 1).padStart(2, "0");
              targetSection = {
                id: prodCat.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                number: secNum,
                name: prodCat,
                subtitle: dbProd.categorySubtitle || "Advanced tactical systems and platforms.",
                products: [],
              };
              newSections.push(targetSection);
            }

            // Check if product already exists in section
            const existingIdx = targetSection.products.findIndex(
              (p) =>
                p.id === prodId ||
                p.name.toLowerCase().trim() === prodName.toLowerCase().trim()
            );

            if (existingIdx !== -1) {
              const currentProduct = targetSection.products[existingIdx];
              const currentSpecs = currentProduct.specs;
              targetSection.products[existingIdx] = {
                ...currentProduct,
                name: prodName,
                desc: prodDesc,
                overview: dbProd.overview || currentProduct.overview,
                overviewTitle: dbProd.overviewTitle || currentProduct.overviewTitle,
                image: prodImg,
                cutoutImage: dbProd.cutoutImage || currentProduct.cutoutImage,
                features: (dbProd.features && dbProd.features.length > 0)
                  ? dbProd.features
                  : (dbProd.highlights && dbProd.highlights.length > 0 ? dbProd.highlights : currentProduct.features),
                featuresTitle: dbProd.featuresTitle || currentProduct.featuresTitle,
                featuresPosition: dbProd.featuresPosition || currentProduct.featuresPosition,
                featureSections: (dbProd.featureSections && dbProd.featureSections.length > 0)
                  ? dbProd.featureSections
                  : currentProduct.featureSections,
                specsTitle: dbProd.specsTitle || currentProduct.specsTitle,
                specsLayout: dbProd.specsLayout || currentProduct.specsLayout,
                specs: dbProd.specs && dbProd.specs.length >= 4
                  ? dbProd.specs.map((s: any) => ({
                      label: s.label,
                      value: s.value,
                      icon: currentSpecs?.find((cs) => cs.label.toLowerCase() === s.label.toLowerCase())?.icon || 
                            (s.label.toLowerCase().includes("weight") ? "scale" :
                             s.label.toLowerCase().includes("wingspan") ? "wingspan" :
                             s.label.toLowerCase().includes("length") ? "ruler" :
                             s.label.toLowerCase().includes("payload") ? "package" :
                             s.label.toLowerCase().includes("time") ? "clock" :
                             s.label.toLowerCase().includes("speed") ? "speed" :
                             s.label.toLowerCase().includes("wind") ? "wind" :
                             s.label.toLowerCase().includes("take") ? "takeoff" : "gauge")
                    }))
                  : (currentSpecs || getDefaultSpecs(currentProduct)),
              };
            } else {
              targetSection.products.push({
                id: prodId,
                name: prodName,
                desc: prodDesc,
                image: prodImg,
                specs: dbProd.specs && dbProd.specs.length > 0
                  ? dbProd.specs.map((s: any) => ({
                      label: s.label,
                      value: s.value,
                      icon: s.label.toLowerCase().includes("weight") ? "scale" :
                            s.label.toLowerCase().includes("wingspan") ? "wingspan" :
                            s.label.toLowerCase().includes("length") ? "ruler" :
                            s.label.toLowerCase().includes("payload") ? "package" :
                            s.label.toLowerCase().includes("time") ? "clock" :
                            s.label.toLowerCase().includes("speed") ? "speed" :
                            s.label.toLowerCase().includes("wind") ? "wind" :
                            s.label.toLowerCase().includes("take") ? "takeoff" : "gauge"
                    }))
                  : undefined,
              });
            }
          });

          return newSections;
        });
      } catch (err) {
        console.warn("Failed to fetch dynamic aerospace products:", err);
      }
    }

    loadDynamicAerospace();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="aerospace" className="relative min-h-screen pt-28 sm:pt-36 pb-24 bg-[#030712] overflow-x-clip text-white selection:bg-sky-500/30 selection:text-sky-200">
      {/* Precision Engineering Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-35"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }}
      />

      {/* Subtle Radial Blue Glow */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-sky-600/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 space-y-10 sm:space-y-12">
        
        {/* ========================================================================= */}
        {/* MAIN PAGE HEADER: AEROSPACE + SUBTITLE                                    */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="font-oxanium text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none">
            AEROSPACE
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-[17px] font-normal max-w-3xl leading-relaxed">
            Mission-ready UAV systems for surveillance, strike, loitering, and autonomous tactical support.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* MAIN CONTENT GRID: 2 COLUMNS (LEFT: CONTINUOUS SECTIONS, RIGHT: SIDEBAR)   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: All Continuous Sections Rendered in Sequence */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-14 sm:space-y-16">
            
            {sections.map((section, secIdx) => (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-32 space-y-6 sm:space-y-8"
              >
                {/* Category Header */}
                <div className="space-y-1.5">
                  <div className="text-xs sm:text-[13px] font-mono font-semibold text-sky-400 tracking-[0.2em] uppercase">
                    {section.number}
                  </div>
                  <h2 className="font-oxanium text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                    {section.name}
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm font-normal">
                    {section.subtitle}
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {section.products.map((product, idx) => {
                    const hasProductImage = Boolean(product.image && product.image.trim().length > 0);

                    return (
                      <div
                        key={product.id}
                        className="rounded-2xl border border-white/[0.12] bg-[#070e1c]/85 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between hover:border-sky-400/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)] group"
                      >
                        <div>
                          {/* Top Plane / Drone Image Box (Only if image was added) */}
                          {hasProductImage ? (
                            <div className="relative w-full h-48 sm:h-52 rounded-xl bg-[#030714] border border-white/5 overflow-hidden flex items-center justify-center p-3 mb-4">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                unoptimized
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#070e1c] via-transparent to-transparent opacity-60 pointer-events-none" />
                            </div>
                          ) : null}

                          {/* Middle Info */}
                          <div className={`space-y-2 ${hasProductImage ? "pt-1" : "pt-2"}`}>
                            <h3 className="font-oxanium text-xl font-bold text-white group-hover:text-sky-300 transition-colors duration-200">
                              {product.name}
                            </h3>
                            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                              {product.desc}
                            </p>
                          </div>
                        </div>

                      {/* Bottom Button */}
                      <div className="pt-5">
                        <button
                          type="button"
                          onClick={() => {
                            setModalProduct(product);
                            setModalSection(section);
                          }}
                          className={`inline-block px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                            secIdx === 0 && idx === 0
                              ? "bg-[#00d2ff] hover:bg-[#38bdf8] text-slate-950 font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)] hover:scale-105"
                              : "bg-transparent hover:bg-sky-500/15 border border-sky-400/40 text-sky-300 hover:text-white font-semibold"
                          }`}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
                </div>

                {/* Distinct Divider Line between Sections */}
                {secIdx < sections.length - 1 && (
                  <div className="pt-8 sm:pt-10">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>
                )}
              </div>
            ))}

            {/* Portfolio Update Elegant Banner */}
            <div className="relative rounded-2xl border border-white/10 bg-[#070e1c]/60 backdrop-blur-xl px-6 py-7 sm:px-10 sm:py-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-sky-400/30" />
              <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-sky-400/30" />
              
              <div className="text-xs sm:text-[13px] font-sans font-semibold tracking-wider text-[#7ec8ff] uppercase mb-2.5">
                PORTFOLIO UPDATE
              </div>
              <p className="text-slate-300 font-sans text-xs sm:text-[13.5px] md:text-sm font-normal tracking-wide uppercase max-w-3xl mx-auto leading-relaxed">
                NEW PRODUCTS ARE CURRENTLY UNDER DESIGN &amp; EVALUATION, AND WILL BE ADDED AS THEY ARE CLEARED FOR RELEASE.
              </p>
            </div>

          </div>

          {/* Right Column: Sticky Sections Sidebar Nav with Smooth Anchor Scroll */}
          <aside className="lg:col-span-4 xl:col-span-3 sticky top-28 self-start z-20">
            <div className="rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#070e1c]/95 backdrop-blur-2xl p-4 sm:p-5 space-y-2 shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
              {/* Sidebar Header */}
              <div className="text-[11px] font-mono tracking-[0.25em] text-sky-400 font-semibold uppercase px-3 py-1.5">
                SECTIONS
              </div>

              {/* Navigation List */}
              <div className="space-y-1.5 pt-1">
                {sections.map((sec) => {
                  const isActive = activeSectionId === sec.id;

                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200 block cursor-pointer ${
                        isActive
                          ? "bg-[#0b2238] border border-sky-400/50 text-sky-200 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                          : "text-slate-400 hover:text-sky-300 hover:bg-slate-900/60 border border-transparent"
                      }`}
                    >
                      {sec.number} {sec.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

        </div>

      </div>

      {/* Interactive Platform Details Modal */}
      <AnimatePresence>
        {modalProduct && modalSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModalProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl lg:max-w-5xl bg-[#060b16] border border-slate-800/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.95)] text-white overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Header */}
              <div className="flex items-start justify-between pb-3 sm:pb-4">
                <div>
                  <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#00c8ff] uppercase font-sans">
                    {modalSection.name}
                  </div>
                  <h2 className="font-oxanium text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
                    {modalProduct.name}
                  </h2>
                </div>

                {/* Top Right Navigation & Close Circular Buttons */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <button
                    type="button"
                    onClick={handlePrevModal}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111927] border border-white/10 hover:border-cyan-400/50 hover:bg-[#1a2538] flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
                    title="Previous Platform"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextModal}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111927] border border-white/10 hover:border-cyan-400/50 hover:bg-[#1a2538] flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
                    title="Next Platform"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalProduct(null)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111927] border border-white/10 hover:border-cyan-400/50 hover:bg-[#1a2538] flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
                    title="Close"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start pt-2 sm:pt-4">
                {/* Left Column: Platform Image Box (Only if image exists) */}
                {modalProduct.image && modalProduct.image.trim().length > 0 ? (
                  <div className="md:col-span-5 flex flex-col items-center justify-center">
                    <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#030712] border border-white/[0.08] overflow-hidden shadow-inner">
                      <Image
                        src={modalProduct.image}
                        alt={modalProduct.name}
                        fill
                        unoptimized
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                ) : null}

                {/* Right Column: Key Specifications, Special Features & Request Info CTA */}
                <div className={`${modalProduct.image && modalProduct.image.trim().length > 0 ? "md:col-span-7" : "md:col-span-12"} flex flex-col justify-between max-h-[70vh] sm:max-h-[75vh] overflow-y-auto pr-2 sm:pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-[#00c8ff]/80 [&::-webkit-scrollbar-thumb]:rounded-full`}>
                  <div>
                    {/* Overview (if present) */}
                    {modalProduct.overview && (
                      <div className="mb-4 sm:mb-5">
                        <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#00c8ff] uppercase mb-1.5 font-sans">
                          {modalProduct.overviewTitle || "OVERVIEW"}
                        </div>
                        <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                          {modalProduct.overview}
                        </p>
                      </div>
                    )}

                    {/* Platform Features (Top position if configured) */}
                    {modalProduct.features && modalProduct.features.length > 0 && modalProduct.featuresPosition === "top" && (
                      <div className="mb-5 sm:mb-6">
                        <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#00c8ff] uppercase mb-3 font-sans">
                          {modalProduct.featuresTitle || "PLATFORM FEATURES"}
                        </div>
                        <ul className="divide-y divide-white/[0.08]">
                          {modalProduct.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal py-2.5 border-b border-white/[0.08]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] shrink-0 mt-1.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Key Specifications (Only show if product has specs, or if product has neither specs nor featureSections) */}
                    {((modalProduct.specs && modalProduct.specs.length > 0) || (!modalProduct.specs && !modalProduct.featureSections && !modalProduct.features)) && (
                      <>
                        <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#00c8ff] uppercase mb-2 font-sans">
                          {modalProduct.specsTitle || "KEY SPECIFICATIONS"}
                        </div>

                        {/* Spec Rows with Horizontal Dividers */}
                        <div className="divide-y divide-white/[0.08]">
                          {(() => {
                            const activeSpecs = modalProduct.specs && modalProduct.specs.length > 0
                              ? modalProduct.specs
                              : getDefaultSpecs(modalProduct);

                            if (modalProduct.specsLayout === "row" || activeSpecs.some((s) => s.label.length > 30)) {
                              return activeSpecs.map((spec, idx) => (
                                <div key={idx} className="grid grid-cols-2 gap-6 py-2.5 sm:py-3 items-center">
                                  <div className="text-xs sm:text-[13px] text-slate-400 font-normal">
                                    {spec.label}
                                  </div>
                                  <div className="text-sm sm:text-base font-bold text-white">
                                    {spec.value}
                                  </div>
                                </div>
                              ));
                            }

                            const specRows: { left: SpecItem; right?: SpecItem }[] = [];
                            for (let i = 0; i < activeSpecs.length; i += 2) {
                              specRows.push({
                                left: activeSpecs[i],
                                right: activeSpecs[i + 1],
                              });
                            }

                            return specRows.map((row, idx) => (
                              <div key={idx} className="grid grid-cols-2 gap-6 py-2.5 sm:py-3">
                                {/* Left Spec */}
                                <div>
                                  <div className="text-xs sm:text-[13px] text-slate-400 font-normal">
                                    {row.left.label}
                                  </div>
                                  <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                                    {row.left.value}
                                  </div>
                                </div>

                                {/* Right Spec */}
                                {row.right ? (
                                  <div>
                                    <div className="text-xs sm:text-[13px] text-slate-400 font-normal">
                                      {row.right.label}
                                    </div>
                                    <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                                      {row.right.value}
                                    </div>
                                  </div>
                                ) : <div />}
                              </div>
                            ));
                          })()}
                        </div>
                      </>
                    )}

                    {/* Special Features (Bottom position if configured or default) */}
                    {modalProduct.features && modalProduct.features.length > 0 && modalProduct.featuresPosition !== "top" && (
                      <div className="pt-6">
                        <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#00c8ff] uppercase mb-3 font-sans">
                          {modalProduct.featuresTitle || "SPECIAL FEATURES"}
                        </div>
                        <ul className="space-y-3">
                          {modalProduct.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] shrink-0 mt-1.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Multiple Feature Sections (e.g. SWAT Airborne with Fail Safe & Payload sections) */}
                    {modalProduct.featureSections && modalProduct.featureSections.length > 0 && (
                      <div className="space-y-6 pt-6">
                        {modalProduct.featureSections.map((sec, sIdx) => (
                          <div key={sIdx}>
                            <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#00c8ff] uppercase mb-3 font-sans">
                              {sec.title}
                            </div>
                            {sec.title.toLowerCase().includes("technical specification") || sec.title.toLowerCase().includes("launcher module") ? (
                              <div className="divide-y divide-white/[0.08]">
                                {sec.items.map((item, iIdx) => {
                                  const colonIdx = item.indexOf(":");
                                  const label = colonIdx !== -1 ? item.slice(0, colonIdx).trim() : item;
                                  const value = colonIdx !== -1 ? item.slice(colonIdx + 1).trim() : "";
                                  return (
                                    <div key={iIdx} className="grid grid-cols-2 gap-6 py-2.5 sm:py-3 items-center border-b border-white/[0.08]">
                                      <div className="text-xs sm:text-[13px] text-slate-400 font-normal">
                                        {label}
                                      </div>
                                      <div className="text-sm sm:text-base font-bold text-white">
                                        {value}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <ul className="divide-y divide-white/[0.08]">
                                {sec.items.map((item, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal py-2.5 border-b border-white/[0.08]">
                                    {!sec.title.toLowerCase().includes("solutions") && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] shrink-0 mt-1.5" />
                                    )}
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="pt-6 sm:pt-7 pb-2">
                    <Link
                      href={`/contact?product=${encodeURIComponent(modalProduct.name)}`}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#0072b2] hover:bg-[#0088d4] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(0,114,178,0.35)] hover:shadow-[0_0_25px_rgba(0,114,178,0.55)] cursor-pointer"
                    >
                      <span>REQUEST INFORMATION</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
