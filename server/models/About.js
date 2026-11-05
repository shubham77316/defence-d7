const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    badge: {
      type: String,
      default: "PRECISION &bull; PROTECT &bull; PROGRESS",
    },
    headline: {
      type: String,
      default: "SKY WARDENS GROUP",
    },
    subHeadline: {
      type: String,
      default: "REDEFINING STANDARDS IN DEFENCE & INDUSTRIAL SECTORS",
    },
    foundingVision: {
      type: String,
      default: "Sky Wardens combines engineering focus, manufacturing depth, and disciplined execution to support high-stakes defence and industrial environments.",
    },
    overviewText: {
      type: String,
      default: "As a dynamic and forward-looking company, Sky Wardens Alliance Private Limited is redefining the standards of the defence and industrial sectors. With innovation and quality at the core of our operations, we specialise in the manufacturing and supply of advanced military, tactical, and industrial solutions designed to meet the highest standards of performance, reliability, and operational excellence.",
    },
    groupText: {
      type: String,
      default: "Sky Wardens Alliance Private Limited is an indigenous defence and industrial solutions company focused on innovation, precision, and manufacturing excellence. As part of the Sky Wardens Group, we are committed to supporting the evolving requirements of defence forces and allied sectors through reliable, future-ready solutions.",
    },
    affiliationsText: {
      type: String,
      default: "Our strategic partnerships with leading government agencies, DRDO, CSIR (Council of Scientific and Industrial Research), and private-sector leaders continue to strengthen our growth and technological advancement in defence and tactical domains. Sky Wardens is also coordinating with Tri-Service Headquarters, including the Army, Navy, and Air Force.",
    },
    pillars: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        icon: { type: String, default: "Shield" },
      },
    ],
    metrics: [
      {
        number: { type: String, required: true },
        label: { type: String, required: true },
        desc: { type: String, default: "" },
      },
    ],
    sectors: [
      {
        number: { type: String, required: true },
        title: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("About", aboutSchema);
