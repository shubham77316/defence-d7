export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  children?: {
    label: string;
    href: string;
    description: string;
  }[];
}

export const NAV_LINKS: NavItem[] = [
  {
    label: "About",
    href: "/about",
    description: "Our mission, strategic vision, and sovereign capability architecture.",
    children: [
      {
        label: "About Us",
        href: "/about",
        description: "Founding purpose, sovereign commitment and capability architecture."
      },
      {
        label: "Mission & Vision",
        href: "/about#mission",
        description: "Long-term institutional horizon and strategic defence autonomy."
      },
      {
        label: "Group of Companies",
        href: "/about#group",
        description: "Integrated alliance of defence and aerospace engineering entities."
      }
    ]
  },
  {
    label: "Products",
    href: "/capabilities",
    description: "Sovereign aerospace systems and tactical defence solutions.",
    children: [
      {
        label: "Defence Solutions",
        href: "/defence",
        description: "Tactical armor, survivability equipment and kinetic technologies."
      },
      {
        label: "Jio",
        href: "/news?id=jio",
        description: ""
      },
      {
        label: "PETRO",
        href: "/news?id=petro",
        description: ""
      },
      {
        label: "Bisto",
        href: "/news?id=bisto",
        description: ""
      },
      {
        label: "Aerospace Systems",
        href: "/aerospace",
        description: "Autonomous aerial platforms, tactical UAVs & surveillance suites."
      }
    ]
  },
  {
    label: "Affiliations",
    href: "/partnerships",
    description: "Institutional collaboration, sovereign research and strategic alliances."
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Join our mission-critical engineering and aerospace divisions."
  },
  {
    label: "News",
    href: "/news",
    description: "Official releases, platform advancements and defence briefings."
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Direct strategic liaison and institutional inquiry portal."
  }
];

export const FOOTER_LINKS = {
  sectors: [
    { label: "Aerospace Systems", href: "/businesses#aerospace" },
    { label: "Defence Solutions", href: "/defence" },
    { label: "Advanced Ground Systems", href: "/businesses#advanced-systems" },
    { label: "Petrochemical & Materials", href: "/businesses#petrochemical" }
  ],
  capabilities: [
    { label: "Autonomous Flight Systems", href: "/capabilities#aerospace" },
    { label: "Tactical Sensor Integration", href: "/capabilities#defence" },
    { label: "Perimeter Electronic Security", href: "/capabilities#advanced-systems" },
    { label: "High-Performance Lubricants", href: "/capabilities#petrochemical" },
    { label: "Real-time Telemetry & HUD", href: "/technology" }
  ],
  company: [
    { label: "About Sky Wardens", href: "/about" },
    { label: "Strategic Vision", href: "/about#vision" },
    { label: "Governance & Quality", href: "/about#governance" },
    { label: "Ecosystem & Affiliations", href: "/partnerships" },
    { label: "Institutional Inquiries", href: "/contact" }
  ]
};
