import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function AboutPreview() {
  return (
    <section className="relative w-full h-[400px] md:h-svh overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/storage/ProductSlider/image4.jpg"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black/50 dark:bg-white/40"></div>
      </motion.div>

      {/* Text Content on Image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
      >
        <h2 className="text-light-background2 dark:text-dark-background2 font-Montserrat text-4xl md:text-5xl leading-snug">
          Who We Are
        </h2>
        <p className="text-light-background2 dark:text-dark-background2 font-Jura text-lg md:text-xl max-w-3xl mt-4">
          As a leading international specialist in architectural lighting, we blend{" "}
          <strong className="text-light-background2 dark:text-dark-background2">innovation</strong>,{" "}
          <strong className="text-light-background2 dark:text-dark-background2">sustainability</strong>, and{" "}
          <strong className="text-light-background2 dark:text-dark-background2">design excellence</strong> to shape illuminating experiences.
        </p>
        <Link
          to={"/about us"}
          className="mt-6 bg-light-background font-Jura text-light-primary font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-light-background2 transition"
        >
          Learn More →
        </Link>
      </motion.div>
    </section>
  );
}

export default AboutPreview;