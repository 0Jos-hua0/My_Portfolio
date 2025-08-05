import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Pause, Play } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  downloadUrl: string;
}

const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf'
  },
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf'
  },
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf'
  },
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf'
  },
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf'
  },
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf'
  },
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf'
  },
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf'
  },
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf'
  },
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf'
  },
  {
    id: '1',
    title: 'Machine Learning Certification',
    downloadUrl: '/certificates/ml-cert.pdf'
  },
  
  // ... other certificates
];

const CertificateCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const speed = 0.1;

  const handleDownload = (url: string) => {
    console.log('Downloading:', url);
    // Actual download implementation would go here
  };

  // Auto-scroll animation with pause/resume
  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      if (lastTimestamp === 0) lastTimestamp = timestamp;
      
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isPaused && containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth / 2;
        const containerWidth = containerRef.current.clientWidth;
        const maxScroll = scrollWidth - containerWidth;
        
        const progress = (scrollProgress + (deltaTime * speed) / 1000) % 1;
        setScrollProgress(progress);
        
        const scrollPosition = progress * maxScroll;
        
        if (scrollPosition >= maxScroll - 1) {
          containerRef.current.scrollLeft = 0;
          setScrollProgress(0);
        } else {
          containerRef.current.scrollLeft = scrollPosition;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, scrollProgress, speed]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center mb-6 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 text-center">
                <span className="relative z-10">My Certifications</span>
              </h2>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="absolute bottom-[-12px] left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform origin-left "
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 ">
            <span className="text-sm text-slate-600 hidden md:inline">
              Pause to scroll manually
            </span>
            <button
              onClick={togglePause}
              className="p-2 rounded-full bg-white shadow-md hover:bg-slate-100 transition-colors"
              aria-label={isPaused ? "Play animation" : "Pause animation"}
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
            </button>
          </div>
        </div>
        
        <div 
          ref={containerRef}
          className="relative h-72 overflow-x-auto "
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <style>
            {`.overflow-x-auto::-webkit-scrollbar {
                display: none;
              }`
            }
          </style>
          
          <div className="flex gap-8 w-max ">
            {[...certificates, ...certificates].map((cert, index) => (
              <motion.div
                key={`${cert.id}-${index}`}
                className="w-64 h-64 bg-white rounded-xl shadow-lg flex-shrink-0 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 opacity-80  " />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                  <h3 className="text-lg font-semibold text-center text-slate-800 mb-2">
                    {cert.title}
                  </h3>
                  <div className="w-full h-32 bg-slate-200 rounded-lg mb-4 flex items-center justify-center text-slate-500">
                    Certificate Preview
                  </div>
                  <motion.button
                    className="px-4 py-2 bg-blue-600 text-white rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(cert.downloadUrl);
                    }}
                  >
                    <Download size={16} />
                    Download
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateCarousel;