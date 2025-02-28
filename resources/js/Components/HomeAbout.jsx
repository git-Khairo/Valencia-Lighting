import React from 'react';
import { motion } from "framer-motion";

function AboutPreview() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://source.unsplash.com/1600x900/?architecture,light"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </motion.div>

      {/* Text Content on Image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
      >
        <h2 className="text-white font-black text-4xl md:text-5xl leading-snug">
          Who We Are
        </h2>
        <p className="text-gray-200 text-lg md:text-xl max-w-3xl mt-4">
          As a leading international specialist in architectural lighting, we blend{" "}
          <strong className="text-white">innovation</strong>,{" "}
          <strong className="text-white">sustainability</strong>, and{" "}
          <strong className="text-white">design excellence</strong> to shape illuminating experiences.
        </p>
        <a
          href="/about"
          className="mt-6 bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Learn More →
        </a>
      </motion.div>
    </section>
  );
}

export default AboutPreview;