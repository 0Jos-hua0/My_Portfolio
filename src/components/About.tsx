// src/components/About.tsx (or similar path)
import React, { useRef, useEffect } from 'react';
import { Brain, Database, Building2, Gamepad2 } from 'lucide-react';
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilePic from '/assets/pf.png';
import Skills from './Skills'; // Import the new Skills component

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // GSAP animations for the ML avatar
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ml-avatar-container",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    });

    tl.from(".ml-avatar", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .from(".ml-avatar-icon", {
      scale: 0,
      rotation: 180,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.5")
    .from(".ml-avatar-text", {
      y: 20,
      opacity: 0,
      duration: 0.5
    }, "-=0.3");
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const iconVariants: Variants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        damping: 6,
        stiffness: 100
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-50 to-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16 overflow-hidden"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 relative inline-block">
              <span className="relative z-10">About Me</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-[-12px] left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform origin-left"
              />
            </h2>
          </motion.div>
        </motion.div>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 my-12">
          <motion.div
            initial={{ x: -100, opacity: 0, rotate: -5 }}
            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 60,
              damping: 10,
              duration: 1
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-shrink-0 relative"
          >
            <div className="relative">
              <div className="w-48 h-60 md:w-64 md:h-80 relative overflow-hidden rounded-xl shadow-xl z-10">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 border-4 border-purple-500 rounded-xl pointer-events-none"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-300 blur-md -z-10 rounded-xl"
              />
            </div>
            
            <motion.div
              className="absolute -inset-4 border-4 border-dashed border-purple-300 rounded-xl opacity-70 z-0"
              animate={{
                rotate: 360,
                transition: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{
                background: "conic-gradient(transparent 0deg, transparent 90deg, rgba(196, 181, 253, 0.3) 90deg, rgba(196, 181, 253, 0.3) 180deg, transparent 180deg, transparent 270deg, rgba(196, 181, 253, 0.3) 270deg)",
                zIndex: 0
              }}
            />
            
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={`absolute w-4 h-4 border-purple-500 opacity-80`}
                style={{
                  top: i < 2 ? "-0.5rem" : "auto",
                  bottom: i >= 2 ? "-0.5rem" : "auto",
                  left: i % 3 === 0 ? "-0.5rem" : "auto",
                  right: i % 3 !== 0 ? "-0.5rem" : "auto",
                  borderTop: i < 2 ? "4px solid" : "none",
                  borderBottom: i >= 2 ? "4px solid" : "none",
                  borderLeft: i % 3 === 0 ? "4px solid" : "none",
                  borderRight: i % 3 !== 0 ? "4px solid" : "none"
                }}
                animate={{
                  opacity: [0.8, 0.4, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 10,
              duration: 1
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center md:text-left max-w-xl space-y-3"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500 font-medium"
            >
              Born in 2004
            </motion.p>
            <motion.h2 
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Hi, I'm Joshua — a curious mind exploring the world of Machine Learning and on a journey to explore the depths of AI.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-lg text-slate-600 leading-relaxed">
                A Machine Learning enthusiast with a curious mind and a love for turning complex ideas into practical solutions.
                I'm driven by how AI can shape smarter systems and solve real-world problems. Whether it's a weekend experiment or a real-world application, I'm always learning, coding, and pushing boundaries.
              </p>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="w-full text-center space-y-6"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div
            className="relative inline-block mt-100"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 10,
                transition: { duration: 0.6, ease: "easeOut" }
              }
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
              <span className="relative z-10">My Journey</span>
            </h2>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "anticipate" }}
              className="absolute bottom-[8px] left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform origin-left"
            />
          </motion.div>
        </motion.div>
        
        {/* Journey Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-10 mb-16">
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.p variants={itemVariants} className="text-slate-600 leading-relaxed">
              My journey into AI began with a deep curiosity about how intelligence can be modeled through code. 
              With strong skills in Python and a belief that data will always grow and evolve, I naturally gravitated 
              toward machine learning engineering — where data science meets real-world problem-solving.
            </motion.p>
            <motion.p variants={itemVariants} className="text-slate-600 leading-relaxed">
              I completed the Machine Learning course by Stanford University on Coursera, where I first explored model 
              interpretation. Since then, I've built ML systems for tasks like sentiment analysis, animal object detection, 
              and I'm currently working on face generation and recognition. I’m also passionate about gaming and storytelling, 
              and I’m building a pixel-art, story-driven game using Godot 4.
            </motion.p>
            <motion.p variants={itemVariants} className="text-slate-600 leading-relaxed">
              Lately, I’ve been expanding into SAP programming — diving into ABAP, Fiori, and other enterprise modules — 
              exploring how large-scale systems power businesses behind the scenes.
            </motion.p>
          </motion.div>

          {/* ML Avatar Section */}
          <div className="ml-avatar-container relative h-full flex">
            <div className="w-full h-full min-h-[24rem] bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center overflow-hidden relative">
              {/* Animated background elements */}
              <motion.div 
                className="absolute inset-0 opacity-20"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />
              <div className="text-center relative z-10 p-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="ml-avatar w-32 h-32 bg-gradient-to-br from-blue-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl"
                >
                  <motion.div 
                    className="ml-avatar-icon"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Brain className="text-white" size={48} />
                  </motion.div>
                </motion.div>
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="ml-avatar-text text-slate-600 font-medium text-lg mb-8"
                >
                  ML Engineer Avatar
                </motion.p>
                {/* Floating tech badges */}
                {['TensorFlow', 'PyTorch', 'Python', 'AWS'].map((tech, i) => (
                  <motion.div
                    key={tech}
                    className="absolute bg-white rounded-full px-3 py-1 text-xs font-medium shadow-sm border border-slate-100"
                    style={{
                      top: `${10 + (i * 15)}%`,
                      left: `${20 + (i * 15)}%`,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Render the Skills component here */}
        <Skills />

      </div>
    </section>
  );
};

export default About;