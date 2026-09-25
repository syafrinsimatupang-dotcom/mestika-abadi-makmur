"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const image =
  "https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg?auto=compress&cs=tinysrgb&w=2000";

export function AboutStoryMoment() {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0.08, 0.5, 0.92],
    [1.09, 1.015, 1.055],
  );
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const shade = useTransform(
    scrollYProgress,
    [0.18, 0.54, 0.86],
    [0.14, 0.44, 0.62],
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.46, 0.78, 0.92],
    [0, 1, 1, 0],
  );
  const copyY = useTransform(scrollYProgress, [0.28, 0.5], [22, 0]);

  return (
    <section
      ref={ref}
      className="about-story-moment"
      data-nav-theme="dark"
      aria-label="Prinsip pengerjaan Mestika Abadi Makmur"
    >
      <div className="about-story-stage">
        <motion.img
          src={image}
          loading="lazy"
          alt="Bukaan kaca dan aluminium pada rumah modern"
          width="2000"
          height="1333"
          className="about-story-image"
          style={reduceMotion ? undefined : { scale, y }}
        />
        <motion.div
          className="about-story-shade"
          style={reduceMotion ? undefined : { opacity: shade }}
        />

        <motion.div
          className="about-story-copy"
          style={
            reduceMotion ? { opacity: 1 } : { opacity: copyOpacity, y: copyY }
          }
        >
          <p className="eyebrow light">UKUR · SESUAIKAN · PASANG</p>
          <h2>
            Bukan sekadar terlihat rapi.
            <br />
            <span>Harus bekerja untuk ruangnya.</span>
          </h2>
        </motion.div>

        <div className="about-story-glass" aria-hidden="true">
          <span>RUMAH</span>
          <i />
          <span>RUKO</span>
          <i />
          <span>KANTOR</span>
          <i />
          <span>KOMERSIAL</span>
        </div>
      </div>
    </section>
  );
}
