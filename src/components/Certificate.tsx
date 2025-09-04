import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Pause, Play, Award, Star, Sparkles } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  downloadUrl: string;
  issuer: string;
  date: string;
  category: string;
}

const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf',
    issuer: 'Tech Institute',
    date: '2024',
    category: 'AI/ML'
  },
  {
    id: '2',
    title: 'Full Stack Development',
    downloadUrl: '/certificates/fullstack-cert.pdf',
    issuer: 'Code Academy',
    date: '2024',
    category: 'Web Dev'
  },
  {
    id: '3',
    title: 'Cloud Architecture',
    downloadUrl: '/certificates/cloud-cert.pdf',
    issuer: 'Cloud Provider',
    date: '2023',
    category: 'Cloud'
  },
  {
    id: '4',
    title: 'Data Science Mastery',
    downloadUrl: '/certificates/ds-cert.pdf',
    issuer: 'Data Institute',
    date: '2023',
    category: 'Data Science'
  },
  {
    id: '5',
    title: 'Cybersecurity Expert',
    downloadUrl: '/certificates/security-cert.pdf',
    issuer: 'Security Corp',
    date: '2024',
    category: 'Security'
  },
  {
    id: '6',
    title: 'DevOps Professional',
    downloadUrl: '/certificates/devops-cert.pdf',
    issuer: 'DevOps Academy',
    date: '2023',
    category: 'DevOps'
  },
  {
    id: '7',
    title: 'UI/UX Design Expert',
    downloadUrl: '/certificates/design-cert.pdf',
    issuer: 'Design School',
    date: '2024',
    category: 'Design'
  },
  {
    id: '8',
    title: 'Blockchain Developer',
    downloadUrl: '/certificates/blockchain-cert.pdf',
    issuer: 'Crypto Institute',
    date: '2023',
    category: 'Blockchain'
  }
];

const categoryColors = {
  'AI/ML': 'from-purple-500 to-indigo-600',
  'Web Dev': 'from-violet-500 to-purple-600',
  'Cloud': 'from-indigo-500 to-purple-500',
  'Data Science': 'from-purple-600 to-pink-500',
  'Security': 'from-fuchsia-500 to-purple-600',
  'DevOps': 'from-purple-500 to-violet-600',
  'Design': 'from-pink-500 to-purple-500',
  'Blockchain': 'from-indigo-600 to-purple-700'
};

const CertificateCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const speed = 0.5; // Reduced speed for smoother animation

  const handleDownload = (url: string, title: string) => {
    console.log('Downloading:', title, url);
    // Actual download implementation would go here
  };

  // Calculate max scroll when component mounts
  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth / 2;
      const containerWidth = containerRef.current.clientWidth;
      setMaxScroll(scrollWidth - containerWidth);
    }
  }, []);

  // Auto-scroll animation with pause/resume
  useEffect(() => {
    let animationFrame: number;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isPaused && containerRef.current && maxScroll > 0) {
        const newPosition = (scrollPosition + (deltaTime * speed)) % (maxScroll + 1);
        setScrollPosition(newPosition);
        containerRef.current.scrollLeft = newPosition;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, scrollPosition, maxScroll, speed]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section id="certi" className="py-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Fixed header alignment */}
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            className="relative text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Sparkles className="text-purple-600" size={32} />
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
                My Certifications
              </h2>
              <Sparkles className="text-purple-600" size={32} />
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 1, 
                delay: 0.6, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500 rounded-full transform origin-left mx-auto shadow-lg"
              style={{ maxWidth: '400px' }}
            />
            <p className="text-purple-600/70 mt-3 font-medium">
              Professional achievements and continuous learning journey
            </p>
          </motion.div>

          <motion.div 
            className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-purple-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-sm text-purple-700 font-medium">
              {isPaused ? 'Manual scroll' : 'Auto-scroll'}
            </span>
            <motion.button
              onClick={togglePause}
              className="p-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPaused ? "Play animation" : "Pause animation"}
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />}
            </motion.button>
          </motion.div>
        </div>
        
        {/* Carousel container */}
        <div 
          ref={containerRef}
          className="relative h-80 overflow-x-auto scrollbar-hide"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <style>
            {`.scrollbar-hide::-webkit-scrollbar {
                display: none;
              }`
            }
          </style>
          
          <div className="flex gap-6 w-max">
            {[...certificates, ...certificates].map((cert, index) => (
              <motion.div
                key={`${cert.id}-${index}`}
                className="w-72 h-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl flex-shrink-0 relative overflow-hidden group border border-purple-100/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[cert.category as keyof typeof categoryColors]} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-200/30 to-transparent rounded-bl-3xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-tr-3xl"></div>

                <div className="relative z-10 h-full flex flex-col p-6">
                  {/* Header with category badge */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${categoryColors[cert.category as keyof typeof categoryColors]} shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {cert.category}
                    </motion.div>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <Star className="text-yellow-400 fill-current" size={16} />
                    </div>
                  </div>

                  {/* Certificate icon */}
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryColors[cert.category as keyof typeof categoryColors]} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <Award className="text-white" size={28} />
                    </div>
                  </div>

                  {/* Certificate details */}
                  <div className="flex-1 text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-purple-600 font-medium text-sm mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      Issued in {cert.date}
                    </p>
                  </div>

                  {/* Download button */}
                  <motion.button
                    className={`w-full py-3 px-4 bg-gradient-to-r ${categoryColors[cert.category as keyof typeof categoryColors]} text-white rounded-xl flex items-center justify-center gap-2 font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-xl`}
                    initial={{ y: 20 }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(cert.downloadUrl, cert.title);
                    }}
                  >
                    <Download size={18} />
                    Download Certificate
                  </motion.button>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/0 via-purple-400/5 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom decorative text */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-purple-600/60 font-medium">
            ✨ Hover over certificates to download • {certificates.length} Professional Certifications ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificateCarousel;