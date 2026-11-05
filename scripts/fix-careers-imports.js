const fs = require('fs');
const file = 'd:/defence/src/app/careers/page.tsx';
let c = fs.readFileSync(file, 'utf8');

const oldImports = `"use client";\r\n\r\nimport React, { useState } from "react";\r\nimport {\r\n  MapPin,\r\n  Clock,\r\n  Briefcase,\r\n  ChevronDown,\r\n  ArrowRight,\r\n  CheckCircle2,\r\n  X,\r\n  Send,\r\n  Upload,\r\n} from "lucide-react";`;

const newImports = `"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  X,
  Send,
  Upload,
} from "lucide-react";

const CAREERS_LETTERS = ["C", "A", "R", "E", "E", "R", "S"];

function CareerScrollLetter({
  char,
  index,
  progress,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.01 + index * 0.1;
  const end = Math.min(start + 0.18, 0.96);
  const y = useTransform(progress, [start, end], ["110vh", "0vh"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 1, 1], { clamp: true });
  return (
    <motion.span
      style={{ y, opacity }}
      className="inline-block font-anton font-black uppercase text-[6.8vh] sm:text-[7.4vh] md:text-[8vh] lg:text-[8.4vh] xl:text-[8.8vh] leading-[0.8] tracking-tight text-center bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)] select-none"
    >
      {char}
    </motion.span>
  );
}`;

c = c.replace(oldImports, newImports);
fs.writeFileSync(file, c, 'utf8');
console.log('Imports replaced. Length:', c.length);

