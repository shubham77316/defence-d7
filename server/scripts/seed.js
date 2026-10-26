/**
 * SKY WARDENS Sovereign Strategic Systems
 * Database Seed Script - Populates MongoDB with entire website content
 */

const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const connectDB = require("../config/db");
const User = require("../models/User");
const Settings = require("../models/Settings");
const Navigation = require("../models/Navigation");
const Footer = require("../models/Footer");
const Homepage = require("../models/Homepage");
const About = require("../models/About");
const Product = require("../models/Product");
const News = require("../models/News");
const Partner = require("../models/Partner");
const Faq = require("../models/Faq");
const Enquiry = require("../models/Enquiry");

const seedDatabase = async () => {
  try {
    console.log("[SEEDER] Connecting to database...");
    await connectDB();

    console.log("[SEEDER] Clearing existing collections for fresh seed...");
    await Promise.all([
      User.deleteMany(),
      Settings.deleteMany(),
      Navigation.deleteMany(),
      Footer.deleteMany(),
      Homepage.deleteMany(),
      About.deleteMany(),
      Product.deleteMany(),
      News.deleteMany(),
      Partner.deleteMany(),
      Faq.deleteMany(),
      Enquiry.deleteMany(),
    ]);

    // 1. Initial Admin User
    console.log("[SEEDER] Creating initial administrator user...");
    const adminUser = await User.create({
      username: "admin",
      email: "admin@skywardens.com",
      password: "adminPassword123!", // Will be hashed by User pre-save hook
      fullName: "Sky Wardens Command Admin",
      role: "admin",
    });
    console.log(`[SEEDER] Admin created: ${adminUser.email} / 
      `);

    // 2. Settings
    console.log("[SEEDER] Creating Settings...");
    await Settings.create({
      siteName: "Sky Wardens",
      companyName: "Sky Wardens Alliance Private Limited",
      tagline: "Engineering Strategic Capability For The Next Era",
      subTagline: "Aerospace / Defence / Advanced Systems / Petrochemical",
      foundingVision:
        "Sky Wardens was established to develop durable industrial capability, engineering systems and strategic technologies designed for long-term impact.",
      corporateOffice:
        "Sky Wardens Strategic Engineering Centre, Defence & Aerospace Tech Corridor, India",
      contactEmail: "liaison@skywardens.com",
      inquiriesEmail: "contact@skywardens.in",
      phone: "+91 (0) 11 4988 2000",
      workingHours: "0900 – 1800 IST (Mon – Fri)",
      clearanceNotice:
        "Institutional and government procurement inquiries are routed through secure, verified liaison protocols.",
      logoUrl: "/images/skywardens-logo.png",
      faviconUrl: "/favicon.ico",
      socialLinks: [
        { platform: "Instagram", url: "https://instagram.com" },
        { platform: "YouTube", url: "https://youtube.com" },
        { platform: "LinkedIn", url: "https://linkedin.com" },
        { platform: "Facebook", url: "https://facebook.com" },
        { platform: "X", url: "https://x.com" },
        { platform: "TikTok", url: "https://tiktok.com" },
      ],
      seoDefaults: {
        metaTitle: "Sky Wardens — Sovereign Aerospace & Defence Engineering Group",
        metaDescription:
          "Sky Wardens architects and manufactures sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations.",
        keywords: [
          "Sky Wardens",
          "Defence Engineering",
          "Aerospace Systems",
          "UAV Platforms",
          "Tactical Solutions",
          "Sovereign Capability",
        ],
      },
      copyrightText: "SKY WARDENS ALLIANCE PVT. LTD.",
    });

    // 3. Navigation Items
    console.log("[SEEDER] Creating Navigation Items...");
    const navItems = [
      {
        label: "About",
        href: "/about",
        description: "Our mission, strategic vision, and sovereign capability architecture.",
        order: 1,
        isVisible: true,
        children: [
          {
            label: "About Us",
            href: "/about",
            description: "Founding purpose, sovereign commitment and capability architecture.",
          },
          {
            label: "Mission & Vision",
            href: "/about#mission",
            description: "Long-term institutional horizon and strategic defence autonomy.",
          },
          {
            label: "Group of Companies",
            href: "/about#group",
            description: "Integrated alliance of defence and aerospace engineering entities.",
          },
        ],
      },
      {
        label: "Products",
        href: "/capabilities",
        description: "Sovereign aerospace systems and tactical defence solutions.",
        order: 2,
        isVisible: true,
        children: [
          {
            label: "Aerospace Systems",
            href: "/aerospace",
            description: "Autonomous aerial platforms, tactical UAVs & surveillance suites.",
          },
          {
            label: "Defence Solutions",
            href: "/defence",
            description: "Tactical armor, survivability equipment and kinetic technologies.",
          },
        ],
      },
      {
        label: "Affiliations",
        href: "/partnerships",
        description: "Institutional collaboration, sovereign research and strategic alliances.",
        order: 3,
        isVisible: true,
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Join our mission-critical engineering and aerospace divisions.",
        order: 4,
        isVisible: true,
      },
      {
        label: "News",
        href: "/news",
        description: "Official releases, platform advancements and defence briefings.",
        order: 5,
        isVisible: true,
      },
      {
        label: "E-Shop",
        href: "https://eshop.skywardens.com",
        description: "Direct procurement portal for verified tactical and industrial supplies.",
        badge: "external",
        order: 6,
        isVisible: true,
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Direct strategic liaison and institutional inquiry portal.",
        order: 7,
        isVisible: true,
      },
    ];
    await Navigation.insertMany(navItems);

    // 4. Footer
    console.log("[SEEDER] Creating Footer data...");
    await Footer.create({
      heading: "Raise your sovereign trajectory",
      description:
        "Architecting sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations.",
      inquiriesEmail: "contact@skywardens.in",
      copyrightText: "SKY WARDENS ALLIANCE PVT. LTD.",
      navLinks: [
        { label: "Home", href: "/", order: 1 },
        { label: "About", href: "/about", order: 2 },
        { label: "Products", href: "/capabilities", order: 3 },
        { label: "Affiliations", href: "/partnerships", order: 4 },
        { label: "Careers", href: "/careers", order: 5 },
        { label: "Contact", href: "/contact", order: 6 },
      ],
      focusLinks: [
        { label: "Aerospace", href: "/aerospace", order: 1 },
        { label: "Defence", href: "/defence", order: 2 },
      ],
      socialLinks: [
        { platform: "Instagram", href: "https://instagram.com" },
        { platform: "YouTube", href: "https://youtube.com" },
        { platform: "LinkedIn", href: "https://linkedin.com" },
        { platform: "Facebook", href: "https://facebook.com" },
        { platform: "X", href: "https://x.com" },
        { platform: "TikTok", href: "https://tiktok.com" },
      ],
    });

    // 5. Homepage
    console.log("[SEEDER] Creating Homepage sections...");
    await Homepage.create({
      heroTag: "SOVEREIGN AEROSPACE & DEFENCE SYSTEMS",
      heroTitle: "ENGINEERING STRATEGIC CAPABILITY FOR THE NEXT ERA",
      heroSubtitle:
        "Architecting sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations.",
      heroCtaText: "Explore Capabilities",
      heroCtaLink: "/capabilities",
      heroSecondaryCtaText: "Initiate Liaison",
      heroSecondaryCtaLink: "/contact",
      tickerItems: [
        { tag: "SPOTLIGHT:", text: "SKY WARDENS MAKING HEADLINES" },
        { tag: "SPOTLIGHT:", text: "NEW HIGH-ENDURANCE TACTICAL UAV COMPLETED SUCCESSFUL FLIGHT TRIALS" },
        { tag: "SPOTLIGHT:", text: "STRATEGIC INDIGENOUS DEFENCE PRODUCTION EXPANDS ACROSS ALLIED CORRIDORS" },
        { tag: "SPOTLIGHT:", text: "ADVANCED BALLISTIC SHIELD SYSTEMS QUALIFIED UNDER NIJ STANDARDS" },
      ],
      showcaseTitle: "STRATEGIC HYPERSONIC & AEROSPACE PLATFORMS",
      showcaseSubtitle: "SOVEREIGN MULTI-MISSION AIRFRAMES",
      showcaseDesc:
        "Engineered to deliver unmatched beyond-line-of-sight situational intelligence and tactical air superiority.",
      ctaBannerTitle: "SHAPING SOVEREIGN DEFENCE READINESS",
      ctaBannerDesc:
        "Partner with Sky Wardens to engineer and deploy next-generation autonomous aerospace airframes, multi-domain defence systems, and resilient industrial technologies.",
      ctaBannerButtonText: "Initiate Strategic Liaison",
      ctaBannerButtonLink: "/contact",
    });

    // 6. About Page
    console.log("[SEEDER] Creating About page content...");
    await About.create({
      badge: "PRECISION &bull; PROTECT &bull; PROGRESS",
      headline: "SKY WARDENS GROUP",
      subHeadline: "REDEFINING STANDARDS IN DEFENCE & INDUSTRIAL SECTORS",
      foundingVision:
        "Sky Wardens combines engineering focus, manufacturing depth, and disciplined execution to support high-stakes defence and industrial environments.",
      overviewText:
        "As a dynamic and forward-looking company, Sky Wardens Alliance Private Limited is redefining the standards of the defence and industrial sectors. With innovation and quality at the core of our operations, we specialise in the manufacturing and supply of advanced military, tactical, and industrial solutions designed to meet the highest standards of performance, reliability, and operational excellence.",
      groupText:
        "Sky Wardens Alliance Private Limited is an indigenous defence and industrial solutions company focused on innovation, precision, and manufacturing excellence. As part of the Sky Wardens Group, we are committed to supporting the evolving requirements of defence forces and allied sectors through reliable, future-ready solutions.",
      affiliationsText:
        "Our strategic partnerships with leading government agencies, DRDO, CSIR (Council of Scientific and Industrial Research), and private-sector leaders continue to strengthen our growth and technological advancement in defence and tactical domains. Sky Wardens is also coordinating with Tri-Service Headquarters, including the Army, Navy, and Air Force.",
      pillars: [
        {
          title: "Strategic Self-Reliance",
          desc: "Developing indigenous technology stacks across aerospace, tactical gear, and chemical synthesis that eliminate critical supply chain vulnerabilities.",
          icon: "ShieldCheck",
        },
        {
          title: "Mission-Critical Precision",
          desc: "Every airframe, ballistic plate, autonomous controller, and synthetic lubricant is engineered to exceed stringent military and aerospace tolerances.",
          icon: "Target",
        },
        {
          title: "Dual-Use Industrial Scale",
          desc: "Bridging sovereign defence specifications with high-volume industrial petrochemical and manufacturing capacity for sustainable long-term capability.",
          icon: "Factory",
        },
        {
          title: "Advanced Edge Autonomy",
          desc: "Integrating proprietary edge AI, sensor fusion, and quantum-resistant telemetry across next-generation unmanned aerial and ground platforms.",
          icon: "Cpu",
        },
      ],
      metrics: [
        { number: "04", label: "Strategic Sectors", desc: "Aerospace, Defence, Advanced Systems, Petrochemical" },
        { number: "B2G", label: "Operating Model", desc: "Government, institutional & sovereign partnerships" },
        { number: "Long Term", label: "Strategic Horizon", desc: "Durable capability built to last decades" },
        { number: "100%", label: "Indigenous Engineering", desc: "Sovereign IP, in-house CAD/CAM & verification" },
      ],
      sectors: [
        { number: "01", title: "Aerospace", desc: "High-endurance UAV platforms and autonomous aerial intelligence systems." },
        { number: "02", title: "Defence", desc: "Advanced tactical equipment, protective assemblies, and mission-critical systems." },
        { number: "03", title: "Advanced Systems", desc: "Next-generation sensing, autonomous robotics, and hardened electronics." },
        { number: "04", title: "Petrochemical", desc: "Specialized lubricants, extreme-condition greases, and engineered materials." },
      ],
    });

    // 7. Products (Aerospace & Defence)
    console.log("[SEEDER] Creating Products...");
    const productsData = [
      // Aerospace: Surveillance Systems
      {
        name: "Arrow Drone",
        slug: "arrow-drone",
        sector: "aerospace",
        category: "Surveillance Systems",
        categoryNumber: "01",
        categorySubtitle: "Reconnaissance, ISR, and persistent observation platforms.",
        desc: "Tactical aerospace platform with mission-focused capability presentation and technical specification view.",
        image: "/images/aerospace-arrow-drone.jpg",
        specs: [
          { label: "Endurance", value: "8+ Hours" },
          { label: "Ceiling", value: "18,000 FT" },
        ],
        status: "active",
        order: 1,
      },
      {
        name: "Ranger Drone",
        slug: "ranger-drone",
        sector: "aerospace",
        category: "Surveillance Systems",
        categoryNumber: "01",
        categorySubtitle: "Reconnaissance, ISR, and persistent observation platforms.",
        desc: "Fixed-wing surveillance platform shaped for endurance, area coverage, and field reconnaissance.",
        image: "/images/aerospace-ranger-drone.jpg",
        specs: [
          { label: "Take off weight", value: "5 kg" },
          { label: "Service ceiling", value: "3000 m" },
          { label: "Wingspan", value: "1700 mm" },
          { label: "Length", value: "1200 mm" },
          { label: "Payload capacity", value: "1.5 kg max" },
          { label: "Flight Time", value: "90 Minutes" },
          { label: "Cruise Speed", value: "16 m/sec" },
          { label: "Max Speed", value: "25 m/sec" },
          { label: "Wind tolerance", value: "12 m/sec" },
        ],
        status: "active",
        order: 2,
      },
      {
        name: "Raven Eye",
        slug: "raven-eye",
        sector: "aerospace",
        category: "Surveillance Systems",
        categoryNumber: "01",
        categorySubtitle: "Reconnaissance, ISR, and persistent observation platforms.",
        desc: "Raven Eye surveillance drone designed for observation, tracking, and persistent mission awareness.",
        image: "/images/aerospace-raven-eye.jpg",
        specs: [
          { label: "Optics", value: "40x Optical Zoom" },
          { label: "Telemetry", value: "AES-256 Encrypted" },
        ],
        status: "active",
        order: 3,
      },
      {
        name: "Ghost (Piston Engine)",
        slug: "ghost-piston",
        sector: "aerospace",
        category: "Surveillance Systems",
        
        categoryNumber: "01",
        categorySubtitle: "Reconnaissance, ISR, and persistent observation platforms.",
        desc: "Long-endurance tactical UAV with heavy-lift capability for surveillance, logistics, and extended-range missions.",
        image: "/images/aerospace-ghost-piston.jpg",
        specs: [
          { label: "Payload", value: "Up to 45 KG" },
          { label: "Endurance", value: "16+ Hours" },
        ],
        status: "active",
        order: 4,
      },
      {
        name: "Ghost (Electric Motor)",
        slug: "ghost-electric",
        sector: "aerospace",
        category: "Surveillance Systems",
        categoryNumber: "01",
        categorySubtitle: "Reconnaissance, ISR, and persistent observation platforms.",
        desc: "Silent electric UAV engineered for reconnaissance, mapping, inspection, and precision aerial operations.",
        image: "/images/aerospace-ghost-electric.jpg",
        specs: [
          { label: "Acoustic Signature", value: "Ultra-low silent" },
          { label: "Ceiling", value: "12,000 FT" },
        ],
        status: "active",
        order: 5,
      },
      {
        name: "Scout 1 Alpha Surveillance Drone",
        slug: "scout-1-alpha",
        sector: "aerospace",
        category: "Surveillance Systems",
        categoryNumber: "01",
        categorySubtitle: "Reconnaissance, ISR, and persistent observation platforms.",
        desc: "Dedicated surveillance quadcopter designed for observation, monitoring, and tactical field intelligence.",
        image: "/images/aerospace-scout-alpha.jpg",
        specs: [
          { label: "Deployment", value: "< 90 Seconds" },
          { label: "Flight Time", value: "45 Minutes" },
        ],
        status: "active",
        order: 6,
      },
      {
        name: "SWAT Airborne Surveillance & Support",
        slug: "swat-airborne",
        sector: "aerospace",
        category: "Surveillance Systems",
        categoryNumber: "01",
        categorySubtitle: "Reconnaissance, ISR, and persistent observation platforms.",
        desc: "Airborne support system intended for tactical overwatch, response coordination, and team visibility.",
        image: "/images/aerospace-swat-airborne.jpg",
        specs: [
          { label: "Interoperability", value: "Tactical HUD link" },
          { label: "Coverage", value: "360° Perimeter" },
        ],
        status: "active",
        order: 7,
      },

      // Aerospace: Tactical FPV Platforms
      {
        name: "5-inch FPV Drone",
        slug: "5-inch-fpv",
        sector: "aerospace",
        category: "Tactical FPV Platforms",
        categoryNumber: "02",
        categorySubtitle: "Small agile combat and close-range tactical systems.",
        desc: "Compact FPV surveillance platform configured for agile day operations and payload deployment.",
        image: "/images/aerospace-fpv-5inch.jpg",
        specs: [
          { label: "Prop Size", value: "5-inch Tri-blade" },
          { label: "Deployment", value: "Rapid field launch" },
        ],
        status: "active",
        order: 8,
      },
      {
        name: "7-inch FPV Drone",
        slug: "7-inch-fpv",
        sector: "aerospace",
        category: "Tactical FPV Platforms",
        categoryNumber: "02",
        categorySubtitle: "Small agile combat and close-range tactical systems.",
        desc: "Extended FPV platform developed for day camera payloads and precision release missions.",
        image: "/images/aerospace-fpv-7inch.jpg",
        specs: [
          { label: "Range", value: "Extended tactical link" },
          { label: "Payload", value: "Precision release claw" },
        ],
        status: "active",
        order: 9,
      },
      {
        name: "Ultra Hardened Training Whooper 5-Inch Drone",
        slug: "ultra-hardened-whooper",
        sector: "aerospace",
        category: "Tactical FPV Platforms",
        categoryNumber: "02",
        categorySubtitle: "Small agile combat and close-range tactical systems.",
        desc: "Rugged military training UAV for intensive field operations, pilot training, and mission rehearsal.",
        image: "/images/aerospace-fpv-whooper.jpg",
        specs: [
          { label: "Protection", value: "Ducted Prop Guards" },
          { label: "Role", value: "CQB Pilot Training" },
        ],
        status: "active",
        order: 10,
      },

      // Aerospace: Strike Systems
      {
        name: "SNS (Shoot & Scoot)",
        slug: "sns-shoot-scoot",
        sector: "aerospace",
        category: "Strike Systems",
        categoryNumber: "03",
        categorySubtitle: "Precision payload delivery and kinetic air-to-ground response platforms.",
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
        status: "active",
        order: 11,
      },
      {
        name: "Onyx Dart",
        slug: "onyx-dart",
        sector: "aerospace",
        category: "Strike Systems",
        categoryNumber: "03",
        categorySubtitle: "Precision payload delivery and kinetic air-to-ground response platforms.",
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
        status: "active",
        order: 12,
      },
      {
        name: "Weaponized Drone",
        slug: "weaponized-drone",
        sector: "aerospace",
        category: "Strike Systems",
        categoryNumber: "03",
        categorySubtitle: "Precision payload delivery and kinetic air-to-ground response platforms.",
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
        status: "active",
        order: 13,
      },
      {
        name: "Grenade Dropping With Agri Drone Stack",
        slug: "grenade-dropping-agri",
        sector: "aerospace",
        category: "Strike Systems",
        categoryNumber: "03",
        categorySubtitle: "Precision payload delivery and kinetic air-to-ground response platforms.",
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
        status: "active",
        order: 14,
      },

      // Aerospace: Loitering Munitions
      {
        name: "Viper-X",
        slug: "viper-x",
        sector: "aerospace",
        category: "Loitering Munitions",
        categoryNumber: "04",
        categorySubtitle: "Terminal strike systems built for rapid deployment profiles.",
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
        status: "active",
        order: 15,
      },
      {
        name: "Doom Sparrow",
        slug: "doom-sparrow",
        sector: "aerospace",
        category: "Loitering Munitions",
        categoryNumber: "04",
        categorySubtitle: "Terminal strike systems built for rapid deployment profiles.",
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
        status: "active",
        order: 16,
      },
      {
        name: "Bee Sting (Kamikaze)",
        slug: "bee-sting-kamikaze",
        sector: "aerospace",
        category: "Loitering Munitions",
        categoryNumber: "04",
        categorySubtitle: "Terminal strike systems built for rapid deployment profiles.",
        desc: "Advanced loitering munition platform for precision strike, real-time reconnaissance, and rapid target interception.",
        overview: "Advanced loitering munition platform engineered for precision strike missions, real-time reconnaissance, and rapid target interception.",
        image: "/images/aerospace-bee-sting.jpg",
        specs: [
          { label: "Weight (MTOW)", value: "1.4 kg (highly dependent on battery)" },
          { label: "Flight time", value: "4-5 mins / 10 mins empty" },
          { label: "Payload", value: "1 kg warhead" },
          { label: "Top speed", value: "250+ mph (400 km/h)" },
        ],
        status: "active",
        order: 17,
      },

      // Aerospace: Heavy Tactical Platforms
      {
        name: "Cargo Drone Stack Quadcopter",
        slug: "cargo-drone-stack",
        sector: "aerospace",
        category: "Heavy Tactical Platforms",
        categoryNumber: "05",
        categorySubtitle: "Large systems with higher payload or specialized capability.",
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
        status: "active",
        order: 18,
      },
      {
        name: "Heavy Lift Drone (50kg)",
        slug: "heavy-lift-50kg",
        sector: "aerospace",
        category: "Heavy Tactical Platforms",
        categoryNumber: "05",
        categorySubtitle: "Large systems with higher payload or specialized capability.",
        desc: "Heavy-lift tactical resupply drone for equipment transport and operational support with exceptional payload capacity.",
        overview: "Designed for tactical resupply, equipment transport, and operational support with exceptional payload-carrying capability.",
        image: "/images/aerospace-heavy-lift-50kg.jpg",
        specs: [
          { label: "Weight (MTOW)", value: "65 kg" },
          { label: "Flight time", value: "15-25 mins loaded / 40+ mins empty" },
          { label: "Payload", value: "50 kg" },
          { label: "Top speed", value: "35-45 mph" },
        ],
        status: "active",
        order: 19,
      },
      {
        name: "Raptor H8/BAZZ H8",
        slug: "raptor-h8-bazz-h8",
        sector: "aerospace",
        category: "Heavy Tactical Platforms",
        categoryNumber: "05",
        categorySubtitle: "Large systems with higher payload or specialized capability.",
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
        status: "active",
        order: 20,
      },
      {
        name: "Aerial Recon Node Quadcopter",
        slug: "aerial-recon-node",
        sector: "aerospace",
        category: "Heavy Tactical Platforms",
        categoryNumber: "05",
        categorySubtitle: "Large systems with higher payload or specialized capability.",
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
        status: "active",
        order: 21,
      },

      // Aerospace: Special Mission Systems
      {
        name: "Agri Hawk",
        slug: "agri-hawk",
        sector: "aerospace",
        category: "Special Mission Systems",
        categoryNumber: "06",
        categorySubtitle: "Mission-specific equipment and tactical support solutions.",
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
        status: "active",
        order: 22,
      },
      {
        name: "Riot Hawk",
        slug: "riot-hawk",
        sector: "aerospace",
        category: "Special Mission Systems",
        categoryNumber: "06",
        categorySubtitle: "Mission-specific equipment and tactical support solutions.",
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
        status: "active",
        order: 23,
      },
      {
        name: "Advanced IED Detection",
        slug: "advanced-ied-detection",
        sector: "aerospace",
        category: "Special Mission Systems",
        categoryNumber: "06",
        categorySubtitle: "Mission-specific equipment and tactical support solutions.",
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
        highlights: [
          "EO",
          "EO + IR",
        ],
        status: "active",
        order: 24,
      },

      // Aerospace: Support Infrastructure
      {
        name: "Optional Wireless Charger For Autonomous Solutions",
        slug: "wireless-charger-autonomous",
        sector: "aerospace",
        category: "Support Infrastructure",
        categoryNumber: "07",
        categorySubtitle: "Operational support systems designed to sustain autonomous deployments.",
        desc: "Autonomous support module intended to extend field readiness and operational turnaround cycles.",
        overviewTitle: "SYSTEM",
        overview: "Optional wireless charger for autonomous solutions.",
        image: "/images/aerospace-wireless-dock.jpg",
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
        status: "active",
        order: 25,
      },

      // Defence: Helmets
      {
        name: "Abhedya Level III Helmet",
        slug: "abhedya-level-iii",
        sector: "defence",
        category: "Helmets",
        categoryNumber: "01",
        categorySubtitle: "Ballistic and tactical head protection systems for field deployment.",
        desc: "Protective headgear solution designed for defence and tactical deployment requirements.",
        overview: "Protective headgear solution designed for defence and tactical deployment requirements.",
        information: "Detailed specifications, sizing, and procurement information are available on request.",
        image: "/images/helmet-abhedya-level3.jpg",
        status: "active",
        order: 10,
      },
      {
        name: "Ballistic Helmet NIJ",
        slug: "ballistic-helmet-nij",
        sector: "defence",
        category: "Helmets",
        categoryNumber: "01",
        categorySubtitle: "Ballistic and tactical head protection systems for field deployment.",
        desc: "Ballistic helmet platform positioned for operational head protection and readiness.",
        overview: "Ballistic helmet platform positioned for operational head protection and readiness.",
        information: "Detailed specifications, sizing, and procurement information are available on request.",
        image: "/images/helmet-ballistic-nij.jpg",
        status: "active",
        order: 11,
      },
      {
        name: "Vajra Helmet",
        slug: "vajra-helmet",
        sector: "defence",
        category: "Helmets",
        categoryNumber: "01",
        categorySubtitle: "Ballistic and tactical head protection systems for field deployment.",
        desc: "Tactical helmet offering structured protection for frontline and response roles.",
        image: "/images/helmet-vajra-riot.jpg",
        specs: [
          { label: "Impact Standard", value: "EN 397 Anti-Trauma" },
          { label: "Visor", value: "Polycarbonate High-Impact" },
        ],
        status: "active",
        order: 12,
      },

      // Defence: Shoes & Boots
      {
        name: "Canvas Jungle Anti-Spike Military Boots",
        slug: "canvas-jungle-anti-spike",
        sector: "defence",
        category: "Shoes & Boots",
        categoryNumber: "02",
        categorySubtitle: "Anti-spike and terrain-ready military footwear for varied operating conditions.",
        desc: "Jungle-oriented anti-spike boots built for demanding terrain and field movement.",
        image: "/images/boots-canvas-jungle.jpg",
        specs: [
          { label: "Protection", value: "Puncture-Resistant Steel Shank" },
          { label: "Upper", value: "Water-Repellent Canvas" },
        ],
        status: "active",
        order: 20,
      },
      {
        name: "Leather Jungle Anti-Spike Military Boots",
        slug: "leather-jungle-anti-spike",
        sector: "defence",
        category: "Shoes & Boots",
        categoryNumber: "02",
        categorySubtitle: "Anti-spike and terrain-ready military footwear for varied operating conditions.",
        desc: "Leather anti-spike jungle boots configured for sustained outdoor defence use.",
        image: "/images/boots-leather-jungle.jpg",
        specs: [
          { label: "Material", value: "Full-Grain Tactical Leather" },
          { label: "Sole", value: "Oil & Acid Resistant Vibram" },
        ],
        status: "active",
        order: 21,
      },
      {
        name: "Leather Snow Adventure Military Boots",
        slug: "leather-snow-adventure",
        sector: "defence",
        category: "Shoes & Boots",
        categoryNumber: "02",
        categorySubtitle: "Anti-spike and terrain-ready military footwear for varied operating conditions.",
        desc: "Cold-condition military boots developed for snow and high-exposure movement.",
        image: "/images/boots-snow-adventure.jpg",
        specs: [
          { label: "Thermal Rating", value: "-30°C Extreme Cold" },
          { label: "Lining", value: "Thinsulate Breathable" },
        ],
        status: "active",
        order: 22,
      },

      // Defence: Gloves
      {
        name: "Stun Shock Proof Dorsal Half Finger Military Gloves",
        slug: "stun-shock-dorsal-half-finger",
        sector: "defence",
        category: "Gloves",
        categoryNumber: "03",
        categorySubtitle: "Shock-resistant and tactical hand protection for operational use.",
        desc: "Half-finger glove platform shaped for tactical grip and shock-resistant handling.",
        image: "/images/gloves-dorsal-half-finger.jpg",
        specs: [
          { label: "Insulation", value: "Dielectric Anti-Shock" },
          { label: "Grip", value: "Non-Slip Silicone Palm" },
        ],
        status: "active",
        order: 30,
      },
      {
        name: "Stun Shock Proof Full Finger Military Gloves",
        slug: "stun-shock-full-finger",
        sector: "defence",
        category: "Gloves",
        categoryNumber: "03",
        categorySubtitle: "Shock-resistant and tactical hand protection for operational use.",
        desc: "Full-finger military gloves built for protected handling and operational comfort.",
        image: "/images/gloves-full-finger-stun.jpg",
        specs: [
          { label: "Protection", value: "Carbon Knuckle Shell" },
          { label: "Touchscreen", value: "Index & Thumb Compatible" },
        ],
        status: "active",
        order: 31,
      },
      {
        name: "Stun Shock Proof Military Half Finger Gloves",
        slug: "stun-shock-half-finger",
        sector: "defence",
        category: "Gloves",
        categoryNumber: "03",
        categorySubtitle: "Shock-resistant and tactical hand protection for operational use.",
        desc: "Shock-resistant half-finger gloves intended for fast-response tactical movement.",
        image: "/images/gloves-military-half-finger.jpg",
        specs: [
          { label: "Dexterity", value: "High Tactical Sensitivity" },
          { label: "Reinforcement", value: "Double Kevlar Stitching" },
        ],
        status: "active",
        order: 32,
      },

      // Defence: Jackets & Ballistics
      {
        name: "Shakti Level IV Standalone Plate Jacket",
        slug: "shakti-level-iv-jacket",
        sector: "defence",
        category: "Jackets & Ballistics",
        categoryNumber: "04",
        categorySubtitle: "Multi-hit sovereign body armor and tactical plate carriers.",
        desc: "Hardened body armor vest providing NIJ Level IV armor-piercing ballistic protection.",
        image: "/images/jacket-shakti-level4.png",
        specs: [
          { label: "Threat Rating", value: "7.62x54R B-32 API" },
          { label: "Weight", value: "6.8 KG Complete Set" },
        ],
        status: "active",
        order: 40,
      },
      {
        name: "Shakti Level III Tactical Modular Vest",
        slug: "shakti-level-iii-vest",
        sector: "defence",
        category: "Jackets & Ballistics",
        categoryNumber: "04",
        categorySubtitle: "Multi-hit sovereign body armor and tactical plate carriers.",
        desc: "Modular load-bearing tactical vest with integrated trauma protection plates.",
        image: "/images/jacket-shakti-level3.jpg",
        specs: [
          { label: "Threat Rating", value: "7.62x39 AK-47 HSC" },
          { label: "Attachment", value: "Laser-cut MOLLE System" },
        ],
        status: "active",
        order: 41,
      },

      // Defence: Riot Control Equipment
      {
        name: "Vajra High-Impact Riot Suit",
        slug: "vajra-riot-suit",
        sector: "defence",
        category: "Riot Control Equipment",
        categoryNumber: "05",
        categorySubtitle: "Full-body protective gear for internal security and perimeter defence.",
        desc: "Ergonomic full-body blunt force trauma protection suit for state police and paramilitary forces.",
        image: "/images/riot-vajra-suit.png",
        specs: [
          { label: "Impact Absorption", value: "Up to 100 Joules" },
          { label: "Coverage", value: "Chest, Back, Arms, Legs & Groin" },
        ],
        status: "active",
        order: 50,
      },
      {
        name: "Polycarbonate Tactical Riot Shield",
        slug: "polycarbonate-riot-shield",
        sector: "defence",
        category: "Riot Control Equipment",
        categoryNumber: "05",
        categorySubtitle: "Full-body protective gear for internal security and perimeter defence.",
        desc: "Optical-grade transparent high-impact shield resistant to stones, blunt weapons, and projectiles.",
        image: "/images/riot-shield.png",
        specs: [
          { label: "Thickness", value: "4.5 mm Polycarbonate" },
          { label: "Dimensions", value: "1000 mm x 550 mm" },
        ],
        status: "active",
        order: 51,
      },
      {
        name: "Vajra Tactical Stun Baton",
        slug: "vajra-tactical-stun-baton",
        sector: "defence",
        category: "Riot Control Equipment",
        categoryNumber: "05",
        categorySubtitle: "Full-body protective gear for internal security and perimeter defence.",
        desc: "Non-lethal high-voltage electrified baton designed for perimeter pacification and crowd control.",
        image: "/images/baton-vajra-stun.png",
        specs: [
          { label: "Output Voltage", value: "80,000 Volts Non-Lethal" },
          { label: "Body", value: "Aviation-grade Aluminum" },
        ],
        status: "active",
        order: 52,
      },
    ];
    await Product.insertMany(productsData);

    // 8. News Articles
    console.log("[SEEDER] Creating News Articles...");
    const newsData = [
      {
        title: "Aerospace highlights and autonomous program positioning",
        slug: "aerospace-highlights",
        category: "AEROSPACE",
        date: "MARCH 2026",
        readTime: "3 MIN READ",
        excerpt:
          "Precision-engineered sovereign airframes, autonomous flight trials, and tactical unmanned aerial surveillance milestones.",
        image: "/images/stealth-fighter-hangar.jpg",
        featured: false,
        status: "published",
        content: [
          "Sky Wardens Aerospace divisions have achieved milestone validations across sovereign autonomous flight algorithms, completing long-range BVLOS endurance trials under simulated electronic jamming environments.",
          "The operational testing included aerodynamic telemetry verification, edge AI target recognition feeds, and autonomous return-to-base maneuvers without GPS assistance.",
        ],
      },
      {
        title: "Defence systems, protective platforms, and readiness updates",
        slug: "defence-systems",
        category: "DEFENCE",
        date: "FEBRUARY 2026",
        readTime: "2 MIN READ",
        excerpt:
          "Multi-layered tactical air defence architectures, kinetic perimeter shields, and next-generation sovereign interception platforms.",
        image: "/images/defence-systems-radar.jpg",
        featured: false,
        status: "published",
        content: [
          "Continuous testing protocols at sovereign ballistic ranges confirm enhanced tensile strength and multi-hit resistance in newly formulated hybrid nano-composite armor suites.",
        ],
      },
    ];
    await News.insertMany(newsData);

    // 9. Strategic Partners & Affiliations
    console.log("[SEEDER] Creating Partners...");
    const partnersData = [
      {
        name: "Defence Research & Development Ecosystem",
        initials: "DRDO",
        category: "Institutional Research",
        domain: "Strategic Research & Standards",
        description: "Sovereign defence engineering standards, aerodynamic benchmarks, and test evaluation protocols.",
        badge: "Standards & Testing",
        status: "active",
        order: 1,
      },
      {
        name: "Aeronautical Systems Research Hubs",
        initials: "CSIR-NAL",
        category: "Institutional Research",
        domain: "Aero Structures & Composites",
        description: "Advanced computational fluid dynamics, wind-tunnel validation, and composite stress testing frameworks.",
        badge: "Aerospace Hub",
        status: "active",
        order: 2,
      },
      {
        name: "High-Altitude & Satellite Subsystems",
        initials: "ISRO-SPEC",
        category: "Institutional Research",
        domain: "Orbital & Sub-Orbital Telemetry",
        description: "High-reliability aerospace telemetry, thermal vacuum resilience testing, and hardened orbital sensors.",
        badge: "Space-Grade Specs",
        status: "active",
        order: 3,
      },
      {
        name: "Advanced Forging & Tactical Metallurgy",
        initials: "BF-KALYANI",
        category: "Precision Industrial",
        domain: "Heavy Armament Metallurgy",
        description: "High-integrity titanium, nickel-superalloy forging, and heavy structural military component manufacturing.",
        badge: "Heavy Metallurgy",
        status: "active",
        order: 4,
      },
      {
        name: "Defence Electronics & Micro-Optics",
        initials: "CENTUM-TS",
        category: "Technology & Systems",
        domain: "C4ISR & Optronics",
        description: "Rugged tactical optronics, thermal core packaging, and mil-spec embedded electronic assemblies.",
        badge: "Defense Electronics",
        status: "active",
        order: 5,
      },
      {
        name: "Bharat Electronics Limited Liaison",
        initials: "BEL",
        category: "Government & Tri-Service",
        domain: "Radar & Tactical Avionics",
        description: "Collaborative exploration of electro-optics, radar surveillance integration, and secure datalink ecosystems.",
        badge: "Strategic Liaison",
        status: "active",
        order: 6,
      },
    ];
    await Partner.insertMany(partnersData);

    // 10. FAQs
    console.log("[SEEDER] Creating FAQs...");
    const faqsData = [
      {
        question: "What sectors does Sky Wardens operate in?",
        answer:
          "Sky Wardens operates across two core strategic domains: Aerospace (unmanned aerial platforms, autonomous flight systems, and sovereign airframes) and Defence (tactical survivability, multi-layered kinetic platforms, and protective architectures).",
        category: "Overview",
        order: 1,
        isVisible: true,
      },
      {
        question: "Who does Sky Wardens work with?",
        answer:
          "Sky Wardens engages directly with government entities, sovereign defence procurement agencies, national aerospace laboratories, and verified tier-1 industrial engineering conglomerates across India, the Middle East, and allied operational theatres.",
        category: "Partnerships",
        order: 2,
        isVisible: true,
      },
      {
        question: "Does Sky Wardens build custom defense solutions?",
        answer:
          "Yes. Sky Wardens develops bespoke engineering architectures, mission-specific tactical payloads, and sovereign hardware-software stacks calibrated to unique operational environments and institutional mission demands.",
        category: "Capabilities",
        order: 3,
        isVisible: true,
      },
      {
        question: "Are products certified for military and tactical field trials?",
        answer:
          "All Sky Wardens platforms undergo stringent quality assurance, MIL-STD environmental validation, and live ballistic trials at certified proving grounds in compliance with DRDO and ISO-standard defence engineering benchmarks.",
        category: "Quality",
        order: 4,
        isVisible: true,
      },
    ];
    await Faq.insertMany(faqsData);

    // 11. Initial Sample Enquiries
    console.log("[SEEDER] Creating Initial Sample Enquiries...");
    const enquiriesData = [
      {
        referenceId: "ANV-K7M9-A1B2",
        fullName: "Col. Rajesh Verma (Retd.)",
        company: "Northern Command Logistics & Procurement",
        email: "r.verma@nic.in",
        phone: "+91 98110 45210",
        country: "India",
        city: "New Delhi",
        areaOfInterest: "Tactical UAV & Surveillance Pods",
        message:
          "Requesting technical specification dossier and field trial evaluation timelines for the Arrow and Ranger drone platforms in high-altitude terrain.",
        status: "New",
        priority: "High",
        notes: [
          {
            author: "Admin",
            text: "Initial inquiry logged from official liaison desk. Scheduling technical briefing with Aerospace Engineering division.",
            createdAt: new Date(),
          },
        ],
      },
      {
        referenceId: "ANV-K8X2-C3D4",
        fullName: "Dr. Alistair Vance",
        company: "Vance Aerospace Systems Ltd.",
        email: "a.vance@vance-aero.co.uk",
        phone: "+44 20 7946 0912",
        country: "United Kingdom",
        city: "Farnborough",
        areaOfInterest: "Strategic Industrial Partnership",
        message:
          "Interested in exploring bilateral composite manufacturing and sub-assembly agreements for beyond-visual-line-of-sight flight modules.",
        status: "In Progress",
        priority: "Normal",
        notes: [
          {
            author: "Admin",
            text: "NDA exchanged via encrypted channel. Next call scheduled for Monday 1100 IST.",
            createdAt: new Date(),
          },
        ],
      },
      {
        referenceId: "ANV-K9Z1-E5F6",
        fullName: "Vikram Malhotra",
        company: "State Police Special Operations Group",
        email: "v.malhotra@police.gov.in",
        phone: "+91 94191 88320",
        country: "India",
        city: "Chandigarh",
        areaOfInterest: "Riot Control & Personal Protective Gear",
        message:
          "Requirement for 500 units of Vajra High-Impact Riot Suits and Stun Shock Proof Tactical Gloves for immediate deployment trials.",
        status: "Contacted",
        priority: "Urgent",
        notes: [],
      },
    ];
    await Enquiry.insertMany(enquiriesData);

    console.log("========================================================");
    console.log("[SEEDER] DATABASE SEEDED SUCCESSFULLY!");
    console.log("[SEEDER] Administrator Account:");
    console.log("         Email:    admin@skywardens.com");
    console.log("         Password: adminPassword123!");
    console.log("========================================================");

    process.exit(0);
  } catch (error) {
    console.error("[SEEDER ERROR] Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
