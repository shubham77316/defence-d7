const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema(
  {
    heroTag: {
      type: String,
      default: "SOVEREIGN AEROSPACE & DEFENCE SYSTEMS",
    },
    heroTitle: {
      type: String,
      default: "ENGINEERING STRATEGIC CAPABILITY FOR THE NEXT ERA",
    },
    heroSubtitle: {
      type: String,
      default: "Architecting sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations.",
    },
    heroCtaText: {
      type: String,
      default: "Explore Capabilities",
    },
    heroCtaLink: {
      type: String,
      default: "/capabilities",
    },
    heroSecondaryCtaText: {
      type: String,
      default: "Initiate Liaison",
    },
    heroSecondaryCtaLink: {
      type: String,
      default: "/contact",
    },
    tickerItems: [
      {
        tag: { type: String, default: "SPOTLIGHT:" },
        text: { type: String, required: true },
      },
    ],
    showcaseTitle: {
      type: String,
      default: "STRATEGIC HYPERSONIC & AEROSPACE PLATFORMS",
    },
    showcaseSubtitle: {
      type: String,
      default: "SOVEREIGN MULTI-MISSION AIRFRAMES",
    },
    showcaseDesc: {
      type: String,
      default: "Engineered to deliver unmatched beyond-line-of-sight situational intelligence and tactical air superiority.",
    },
    ctaBannerTitle: {
      type: String,
      default: "SHAPING SOVEREIGN DEFENCE READINESS",
    },
    ctaBannerDesc: {
      type: String,
      default: "Partner with Sky Wardens to engineer and deploy next-generation autonomous aerospace airframes, multi-domain defence systems, and resilient industrial technologies.",
    },
    ctaBannerButtonText: {
      type: String,
      default: "Initiate Strategic Liaison",
    },
    ctaBannerButtonLink: {
      type: String,
      default: "/contact",
    },
    ctaBannerSecondaryButtonText: {
      type: String,
      default: "",
    },
    ctaBannerSecondaryButtonLink: {
      type: String,
      default: "/capabilities",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Homepage", homepageSchema);
