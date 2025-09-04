// src/components/Skills.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { 
    category: 'Machine Learning', 
    icon: '🧠',
    items: [
      { name: 'TensorFlow', url: 'https://www.tensorflow.org/', proficiency: 90 },
      { name: 'PyTorch', url: 'https://pytorch.org/', proficiency: 85 },
      { name: 'Scikit-learn', url: 'https://scikit-learn.org/', proficiency: 95 },
      { name: 'Keras', url: 'https://keras.io/', proficiency: 80 },
      { name: 'XGBoost', url: 'https://xgboost.ai/', proficiency: 85 }
    ] 
  },
  { 
    category: 'Programming', 
    icon: '💻',
    items: [
      { name: 'Python', url: 'https://www.python.org/', proficiency: 95 },
      { name: 'SQL', url: 'https://www.w3schools.com/sql/', proficiency: 90 },
      { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', proficiency: 85 },
      { name: 'C++', url: 'https://isocpp.org/', proficiency: 75 }
    ] 
  },
  { 
    category: 'Data & Cloud', 
    icon: '☁️',
    items: [
      { name: 'AWS', url: 'https://aws.amazon.com/', proficiency: 85 },
      { name: 'Docker', url: 'https://www.docker.com/', proficiency: 80 },
      { name: 'Kubernetes', url: 'https://kubernetes.io/', proficiency: 75 },
      { name: 'Apache Spark', url: 'https://spark.apache.org/', proficiency: 85 },
      { name: 'MongoDB', url: 'https://www.mongodb.com/', proficiency: 80 }
    ] 
  },
  { 
    category: 'Specializations', 
    icon: '⭐',
    items: [
      { name: 'Deep Learning', url: 'https://deeplearning.ai/', proficiency: 90 },
      { name: 'NLP', url: 'https://nlp.stanford.edu/', proficiency: 85 },
      { name: 'EDA', url: 'https://en.wikipedia.org/wiki/Exploratory_data_analysis', proficiency: 95 },
      { name: 'ETL', url: 'https://en.wikipedia.org/wiki/Extract,_transform,_load', proficiency: 90 }
    ] 
  }
];

const Skills = () => {
  const [isSpread, setIsSpread] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  const stackVariants = {
    initial: { scale: 0.8, opacity: 0, x: 0 },
    stacked: (i: number) => ({
      opacity: 1,
      y: i * 5,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1 * i,
      },
      zIndex: skills.length - i,
    }),
    spread: (i: number) => {
      const middleIndex = (skills.length - 1) / 2;
      const xOffset = (i - middleIndex) * 280;
      return {
        y: 0,
        x: xOffset,
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.2,
        },
      };
    },
  };

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsSpread(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div className="py-16 bg-gradient-to-br from-orange-500 to-purple-600 min-h-screen">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-bold relative inline-block">
          <span className="relative z-10 text-white drop-shadow-md">
            My Technical Expertise
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "anticipate" }}
            className="absolute bottom-[-12px] left-0 w-full h-1 bg-white transform origin-left"
          />
        </h2>
        <p className="mt-4 text-white text-opacity-90 max-w-2xl mx-auto">
          Technologies and tools I use to bring ideas to life
        </p>
      </motion.div>

      <div className="flex justify-center items-center h-[300px] relative overflow-visible">
        <AnimatePresence>
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              className={`absolute skill-card p-6 w-64 h-80 rounded-2xl cursor-pointer
                bg-white/10 backdrop-blur-md border border-white/20 
                shadow-lg transition-all duration-300
                ${isSpread ? '' : 'hover:scale-105 hover:shadow-orange-500/20'}
                ${activeCategory === index ? 'ring-2 ring-orange-400/70' : ''}`}
              custom={index}
              initial="initial"
              animate={isSpread ? "spread" : "stacked"}
              variants={stackVariants}
              layout
              whileHover={{ 
                y: isSpread ? -10 : index * 5,
                scale: isSpread ? 1.05 : 1.05,
                zIndex: 99,
                boxShadow: "0 0 30px rgba(255, 140, 0, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(activeCategory === index ? null : index)}
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-xl text-white">
                  {skillGroup.category}
                </h4>
                <span className="text-2xl">{skillGroup.icon}</span>
              </div>
              
              <div className="space-y-4">
                {skillGroup.items.map((skill, skillIndex) => (
                  <a 
                    key={skillIndex}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-sm font-medium text-white group-hover:text-orange-300 transition-colors">
                      {skill.name}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isSpread && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-24 text-white text-opacity-80"
        >
        </motion.div>
      )}
    </div>
  );
};

export default Skills;