import React from 'react';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Your Name
              </span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 font-light">
              Machine Learning Engineer
            </p>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Transforming data into intelligent solutions. Building ML models that solve real-world problems 
              with cutting-edge algorithms and scalable architectures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl flex items-center space-x-2">
              <Download size={20} />
              <span>Download Resume</span>
            </button>
            <button 
              onClick={scrollToAbout}
              className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/10"
            >
              View My Work
            </button>
          </div>

          <div className="flex items-center justify-center space-x-6 pt-8">
            <a href="#" className="text-slate-300 hover:text-white transition-colors hover:transform hover:scale-110">
              <Github size={28} />
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors hover:transform hover:scale-110">
              <Linkedin size={28} />
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors hover:transform hover:scale-110">
              <Mail size={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;