"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background gradients */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/40 via-slate-600/20 to-gray-700/30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/5 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-400/10 via-transparent to-gray-500/10"></div> */}

      {/* Subtle background image overlay */}
      <div
        className="absolute inset-0  mix-blend-overlay"
        style={{
          backgroundImage: `url("./background.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Animated silver orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-gray-600/15 to-slate-500/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-r from-gray-500/10 to-gray-400/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col lg:flex-row md:flex-row   items-center gap-x-16 min-h-screen py-16 sm:py-20">
          
          {/* Left Side (Text) */}
          <motion.div
            className="flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left order-1"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              From Screen to Street
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Anime Tees That Speak!
              </span>
            </h1>

            <motion.p
              className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Wear your favorite anime characters with pride. Premium quality
              tees inspired by the world of anime.
            </motion.p>

            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button className="group px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 
                bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
                text-sm sm:text-base md:text-lg 
                font-semibold rounded-full shadow-2xl 
                hover:shadow-blue-500/25 hover:scale-105 
                transition-all duration-300 flex items-center gap-2 md:gap-3">
                Shop now
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side (Models + Kakashi) */}
          <motion.div
            className="flex justify-center items-center order-2 mt-13 sm:mb-10 lg:mt-0"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="relative ml-0 sm:ml-12 lg:ml-[120px]">
              {/* Models Image */}
          <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1, delay: 0.6 }}
  className="relative"
>
  <Image
    src="./ka-bk-he.png"
    alt="Models wearing Kakashi anime t-shirts"
    width={450}
    height={600}
    className="w-40 sm:w-56 md:w-72 lg:w-96 xl:w-[450px] rounded-lg object-contain drop-shadow-2xl"
    priority
  />
    <div className="absolute inset-0 bg-gray-950/20 rounded-lg"></div>

  {/* 🔹 Overlay Layer */}
</motion.div>
              {/* Floating Kakashi */}
              <motion.div
                className=" sm:block absolute -bottom-10 -left-16 lg:-left-24"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="relative">
  {/* Glow effect behind image */}
  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl scale-150"></div>

  {/* Overlayed Image */}
  <div className="relative z-10">
    <Image
      src="./ka-fr-he.png"
      alt="Kakashi character"
      width={200}
      height={200}
      className="w-20 sm:w-28 md:w-36 lg:w-44 xl:w-48  object-contain"
    />
    {/* 🔹 Overlay Layer */}
    <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
  </div>
</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </section>
  );
}
