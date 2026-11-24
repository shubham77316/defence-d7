import React from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  Cpu,
  Radio,
  Lock,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Activity
} from "lucide-react";

export const metadata = {
  title: "Technology — Sky Wardens Proprietary Innovation Stack",
  description: "Explore Sky Wardens's proprietary edge AI, sensor fusion, quantum-resistant telemetry, and precision autonomous firmware architectures."
};

export default function TechnologyPage() {
  const techPillars = [
    {
      id: "edge-ai",
      title: "Edge AI & Swarm Autonomous Guidance",
      tag: "COMPUTE ARCHITECTURE",
      desc: "Embedded neural accelerators performing real-time multi-spectral computer vision, obstacle avoidance, and collaborative swarm tasking directly on-device without cloud dependence.",
      specs: [
        { label: "Inference Latency", value: "< 12 ms" },
        { label: "Target Classification", value: "99.2% Accuracy" },
        { label: "Swarm Node Capacity", value: "32+ Coordinated Nodes" },
        { label: "Power Draw", value: "< 25W Peak" }
      ]
    },
    {
      id: "sensor-fusion",
      title: "Multi-Spectrum Sensor Fusion Suite",
      tag: "OPTRONICS & RF",
      desc: "Hardware-level synchronizer combining Long-Wave Infrared (LWIR), daylight 4K optical, mmWave radar, and acoustic triangulation into an integrated real-time 3D battlefield situational map.",
      specs: [
        { label: "Sensor Feeds", value: "8 Concurrent Streams" },
        { label: "Resolution Pipeline", value: "4K UHD @ 60 FPS" },
        { label: "FOV Coverage", value: "360° Spherical" },
        { label: "Latency", value: "Zero Frame Drop" }
      ]
    },
    {
      id: "quantum-crypto",
      title: "Quantum-Resistant Tactical Telemetry",
      tag: "SECURE COMMS",
      desc: "Frequency-hopping spread spectrum (FHSS) datalink layers secured by lattice-based post-quantum cryptographic key exchanges, offering unbreakable low-probability-of-intercept communications.",
      specs: [
        { label: "Hop Rate", value: "1,200 Hops/Sec" },
        { label: "Encryption Cipher", value: "Kyber-1024 / AES-256-GCM" },
        { label: "EW Resilience", value: "Anti-Jamming MIL-STD" },
        { label: "Line of Sight Range", value: "150+ KM Direct Link" }
      ]
    },
    {
      id: "tribology-materials",
      title: "Molecular Tribology & Synthetic Chemistry",
      tag: "PETROCHEMICAL IP",
      desc: "Engineered synthetic ester basestocks enhanced with nano-diamond and ceramic boundary additives designed to withstand extreme shear pressures, corrosive saline environments, and temperatures exceeding 340°C.",
      specs: [
        { label: "Flash Point", value: "> 280°C" },
        { label: "Viscosity Retention", value: "98.5% Sustained" },
        { label: "Friction Coefficient", value: "0.038 (&mu;)" },
        { label: "Wear Scar Diameter", value: "< 0.38 mm" }
      ]
    }
  ];

  return (
    <div className="relative pt-32 pb-24 bg-slate-950 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-cyan-600/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="radar" size="md">
            Proprietary IP Stack
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Autonomous Systems, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
              Sensor Fusion &amp; Telemetry
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed font-normal">
            Sky Wardens develops sovereign hardware-software architectures engineered to maintain superiority in contested electromagnetic and electronic warfare environments.
          </p>
        </div>

        {/* 4 Core Technology Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techPillars.map((tech) => (
            <div
              key={tech.id}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between hover:border-cyan-400/60 transition-all duration-300 group space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                    {tech.tag}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tech.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3">
                {tech.specs.map((s) => (
                  <div key={s.label} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">{s.label}</div>
                    <div className="text-sm font-mono font-bold text-cyan-300 mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Telemetry Architecture Overview Banner */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-cyan-500/30 space-y-8 bg-slate-950/90">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Software &amp; Firmware Stack
              </span>
              <h3 className="text-3xl font-black uppercase text-white mt-1">
                Real-Time OS &amp; Hardened Microkernels
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Terminal className="w-4 h-4" />
              <span>KERNEL: RTOS-ANV-SEC // DETERMINISTIC</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                Deterministic Real-Time Scheduling
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sub-microsecond task preemption ensuring critical flight controls and sensor interrupts always execute with absolute temporal predictability.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-sky-400 font-bold uppercase">
                Zero-Trust Memory Isolation
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Microkernel memory compartmentalization preventing buffer overflows, side-channel attacks, and untrusted payload injection.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-indigo-400 font-bold uppercase">
                Autonomous Over-The-Air Re-Keying
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tactical key rotation executed over encrypted mesh networks with zero operational downtime and instant compromised-node blacklisting.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-400">
              ALL PROPRIETARY STACKS DEVELOPED AND MAINTAINED IN SOVEREIGN FACILITIES
            </div>
            <Button
              href="/contact"
              variant="cyan"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Initiate Technical Evaluation
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
