const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Add image to strategicDossiers array
const oldDossiers = `  const strategicDossiers = [
    {
      id: "gov-aligned",
      title: "Government Aligned Strategic Program",
      paragraphs: [
        "Sky Wardens works in alignment with government entities, national bodies, and mission-critical sectors to ensure that every capability we support is relevant, dependable, and operationally meaningful. Our engagement model is shaped around sovereign requirements, regional priorities, and the practical demands of modern defence and security environments.",
        "We support programs where performance, reliability, and deployment relevance are non-negotiable. This includes collaboration across strategic segments tied to national defence preparedness, force modernisation, infrastructure protection, and long-term capability development. Our role is defined by disciplined execution, confidentiality, and an understanding that defence systems must ultimately serve real operational needs under demanding conditions.",
        "By working closely with government stakeholders and aligned institutions, Sky Wardens helps ensure that technologies are not only advanced in concept, but productive, useful, and calibrated to the utmost requirements of the country and region they are intended to serve."
      ]
    },
    {
      id: "industrial-capability",
      title: "Industrial Capability Partnerships",
      paragraphs: [
        "Sky Wardens maintains industrial technology collaborations and alliances with leading engineering companies operating across advanced defence and strategic manufacturing domains. Through these partnerships, we engage in the development, integration, and advancement of capabilities across a focused set of mission areas.",
        "These areas include artillery and missile systems, AI-enabled guided shells, drones and loitering munitions, and battlefield mapping supported by predictive AI frameworks. Our collaboration model brings together industrial engineering depth, systems integration experience, and technology specialization to support scalable and future-relevant defence capability.",
        "We approach these partnerships as long-term industrial relationships rather than isolated project engagements. The objective is to build enduring technical competence, resilient supply alignment, and integrated development pathways that can support evolving operational requirements while maintaining appropriate discretion around program-level detail."
      ]
    },
    {
      id: "aerospace-advanced",
      title: "Aerospace and Advanced System Alliances",
      paragraphs: [
        "Sky Wardens works with specialized engineering and technology partners across aerospace and airborne systems, supporting advanced capability domains where stability, sensing, targeting, and processing performance are critical.",
        "Our aerospace-aligned engagements include aircraft systems such as optical electronic systems, stabilized guided weapons, image processing modules, air target lock-on and tracking modules, and stabilized suspension systems for radar antennas used on helicopters and UAV platforms. In parallel, our broader systems exposure also extends into naval and cross-domain defence technologies, including remote weapon station architectures, optical electronic systems, radar channel antenna posts, instrument TOI, visual observation channels, GPAP hardware and software systems, angular deformation measurement systems, and TAD-configured subsystems.",
        "These alliances are built around precision engineering, integration discipline, and mission adaptability. We deliberately maintain a low-signature communication posture around platform specifics, while continuing to deepen our role in the ecosystem of advanced air, naval, and multi-domain defence technologies."
      ]
    },
    {
      id: "global-capability",
      title: "Global Capability Integration",
      paragraphs: [
        "Sky Wardens operates with active status in India, West Africa, and the Middle East, with further expansion planned as we continue to develop strategic relationships across emerging and established defence markets. This presence enables us to engage across multiple operational environments, understand diverse security requirements, and align capability development with regional realities.",
        "Our international posture is not defined by scale alone, but by selective integration with the right institutional, industrial, and technical ecosystems. This allows Sky Wardens to connect local requirement understanding with broader engineering collaboration, industrial partnerships, and advanced capability access.",
        "As our footprint grows, our focus remains consistent: build discreetly, collaborate selectively, and strengthen defence-relevant capability where it matters most. We believe meaningful expansion in this sector comes not from visibility, but from trust, technical seriousness, and sustained strategic relevance."
      ]
    }
  ];`;

const newDossiers = `  const strategicDossiers = [
    {
      id: "gov-aligned",
      title: "Government Aligned Strategic Program",
      image: "/images/tactical-defense-operator.jpg",
      paragraphs: [
        "Sky Wardens works in alignment with government entities, national bodies, and mission-critical sectors to ensure that every capability we support is relevant, dependable, and operationally meaningful. Our engagement model is shaped around sovereign requirements, regional priorities, and the practical demands of modern defence and security environments.",
        "We support programs where performance, reliability, and deployment relevance are non-negotiable. This includes collaboration across strategic segments tied to national defence preparedness, force modernisation, infrastructure protection, and long-term capability development. Our role is defined by disciplined execution, confidentiality, and an understanding that defence systems must ultimately serve real operational needs under demanding conditions.",
        "By working closely with government stakeholders and aligned institutions, Sky Wardens helps ensure that technologies are not only advanced in concept, but productive, useful, and calibrated to the utmost requirements of the country and region they are intended to serve."
      ]
    },
    {
      id: "industrial-capability",
      title: "Industrial Capability Partnerships",
      image: "/images/industrial-proving-grounds.jpg",
      paragraphs: [
        "Sky Wardens maintains industrial technology collaborations and alliances with leading engineering companies operating across advanced defence and strategic manufacturing domains. Through these partnerships, we engage in the development, integration, and advancement of capabilities across a focused set of mission areas.",
        "These areas include artillery and missile systems, AI-enabled guided shells, drones and loitering munitions, and battlefield mapping supported by predictive AI frameworks. Our collaboration model brings together industrial engineering depth, systems integration experience, and technology specialization to support scalable and future-relevant defence capability.",
        "We approach these partnerships as long-term industrial relationships rather than isolated project engagements. The objective is to build enduring technical competence, resilient supply alignment, and integrated development pathways that can support evolving operational requirements while maintaining appropriate discretion around program-level detail."
      ]
    },
    {
      id: "aerospace-advanced",
      title: "Aerospace and Advanced System Alliances",
      image: "/images/stealth-fighter-hangar.jpg",
      paragraphs: [
        "Sky Wardens works with specialized engineering and technology partners across aerospace and airborne systems, supporting advanced capability domains where stability, sensing, targeting, and processing performance are critical.",
        "Our aerospace-aligned engagements include aircraft systems such as optical electronic systems, stabilized guided weapons, image processing modules, air target lock-on and tracking modules, and stabilized suspension systems for radar antennas used on helicopters and UAV platforms. In parallel, our broader systems exposure also extends into naval and cross-domain defence technologies, including remote weapon station architectures, optical electronic systems, radar channel antenna posts, instrument TOI, visual observation channels, GPAP hardware and software systems, angular deformation measurement systems, and TAD-configured subsystems.",
        "These alliances are built around precision engineering, integration discipline, and mission adaptability. We deliberately maintain a low-signature communication posture around platform specifics, while continuing to deepen our role in the ecosystem of advanced air, naval, and multi-domain defence technologies."
      ]
    },
    {
      id: "global-capability",
      title: "Global Capability Integration",
      image: "/images/news-advanced-systems.jpg",
      paragraphs: [
        "Sky Wardens operates with active status in India, West Africa, and the Middle East, with further expansion planned as we continue to develop strategic relationships across emerging and established defence markets. This presence enables us to engage across multiple operational environments, understand diverse security requirements, and align capability development with regional realities.",
        "Our international posture is not defined by scale alone, but by selective integration with the right institutional, industrial, and technical ecosystems. This allows Sky Wardens to connect local requirement understanding with broader engineering collaboration, industrial partnerships, and advanced capability access.",
        "As our footprint grows, our focus remains consistent: build discreetly, collaborate selectively, and strengthen defence-relevant capability where it matters most. We believe meaningful expansion in this sector comes not from visibility, but from trust, technical seriousness, and sustained strategic relevance."
      ]
    }
  ];`;

// 2. Replace strategicDossiers rendering loop
const oldCards = `          {/* Strategic Dossier Cards */}
          <div className="space-y-8 pt-4">
            {strategicDossiers.map((dossier, idx) => (
              <motion.div
                key={dossier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl bg-[#060a14]/90 border border-white/10 hover:border-cyan-400/40 p-6 sm:p-10 backdrop-blur-2xl transition-all duration-300 shadow-[0_16px_50px_rgba(0,0,0,0.8)] overflow-hidden group"
              >
                <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-75 group-hover:opacity-100 group-hover:via-cyan-300 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 relative z-10">
                  <div className="lg:col-span-4 flex flex-col justify-start">
                    <div className="inline-block">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30 mb-3 inline-block">
                        PROGRAM 0{idx + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
                        {dossier.title}
                      </h2>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                    {dossier.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-300/95 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}`;

const newCards = `          {/* Strategic Dossier Cards - 2 Column with Image & Content (Matching Second Image) */}
          <div className="space-y-12 sm:space-y-16 pt-6">
            {strategicDossiers.map((dossier, idx) => (
              <motion.div
                key={dossier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pb-12 sm:pb-16 border-b border-white/10 group last:border-b-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                  {/* Left Column: Image with Tactical Reticle */}
                  <div className="lg:col-span-6 relative">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#08101e] border border-white/10 shadow-2xl group-hover:border-cyan-400/40 transition-colors duration-500">
                      <Image
                        src={dossier.image}
                        alt={dossier.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/65 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Tactical HUD Reticle */}
                      <div className="absolute top-4 right-4 z-10 pointer-events-none">
                        <svg className="w-7 h-7 text-cyan-400/70" viewBox="0 0 28 28" fill="none">
                          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                          <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1" />
                          <line x1="14" y1="2" x2="14" y2="7" stroke="currentColor" strokeWidth="1" />
                          <line x1="14" y1="21" x2="14" y2="26" stroke="currentColor" strokeWidth="1" />
                          <line x1="2" y1="14" x2="7" y2="14" stroke="currentColor" strokeWidth="1" />
                          <line x1="21" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Title + Paragraphs */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-4 pt-1">
                    <div>
                      <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight leading-snug text-white">
                        {dossier.title}
                      </h2>
                    </div>

                    <div className="space-y-4 text-slate-300 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-normal">
                      {dossier.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-slate-300/90 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}`;

c = c.replace(/\r\n/g, '\n');
const normOldDossiers = oldDossiers.replace(/\r\n/g, '\n');
const normNewDossiers = newDossiers.replace(/\r\n/g, '\n');
const normOldCards = oldCards.replace(/\r\n/g, '\n');
const normNewCards = newCards.replace(/\r\n/g, '\n');

if (c.includes(normOldDossiers)) {
  c = c.replace(normOldDossiers, normNewDossiers);
  console.log('Dossiers array updated with images!');
} else {
  console.log('oldDossiers NOT found');
}

if (c.includes(normOldCards)) {
  c = c.replace(normOldCards, normNewCards);
  console.log('Dossiers cards replaced with 2-column image layout!');
} else {
  console.log('oldCards NOT found');
}

fs.writeFileSync(file, c, 'utf8');
console.log('Done restoring 4 dossier boxes matching second image!');

