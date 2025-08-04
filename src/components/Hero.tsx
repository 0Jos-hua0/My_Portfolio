import React from 'react';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const gradients = [
    'from-blue-500 to-purple-500',
    'from-purple-500 to-orange-500',
    'from-orange-500 to-blue-500',
  ];
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
  id="hero"
  className="min-h-screen flex items-center justify-center bg-cover bg-center text-white relative overflow-hidden"
  style={{ backgroundImage: `url('/assets/herobg.jpeg')` }}
>

<div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
  {Array.from({ length: 20 }).map((_, i) => {
    const gradient = gradients[Math.floor(Math.random() * gradients.length)];
    return (
      <div
        key={i}
        className={`absolute w-1 h-10 bg-gradient-to-t ${gradient} rounded-sm animate-line opacity-0 translate-y-full drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]`}

        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${(i * 0.5) % 3}s`,
        }}
      />
    );
  })}
</div>



      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradientX" style={{ backgroundImage: 'linear-gradient(90deg, #3b82f6, #ec4899, #f97316, #3b82f6)' }}>
              𝙹𝚘𝚜𝚑𝚞𝚊 𝙶𝚒𝚐𝚘 𝙿𝚎𝚝𝚎𝚛
</span>


            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 font-light">
              Machine Learning Engineer
            </p>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-[#f9a602] drop-shadow-[0_0_10px_#f9a602] font-bold italic">
            Transforming data into intelligent solutions. Building ML models that solve real-world problems 
            with cutting-edge algorithms and scalable architectures.
            </p>



          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
          href="/assets/Resume.pdf"
          download="Resume.pdf"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl flex items-center space-x-2">
              <Download size={20} />
              <span>Download Resume</span>
            </a>
            
          </div>
<br></br>
          <div className="flex items-center justify-center space-x-6 pt-8">
            <a href="https://github.com/0Jos-hua0/0Jos-hua0/tree/main" target="_blank" rel="noopener noreferrer"
            className="text-purple-500 hover:text-orange-500 transition-colors hover:transform hover:scale-110">
              <Github size={50} />
            </a>
            <a href="https://www.linkedin.com/in/joshua-gigo-peter-261272274/" target="_blank" rel="noopener noreferrer"
            className="text-purple-500 hover:text-orange-500 transition-colors hover:transform hover:scale-110">
              <Linkedin size={50} />
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=joshuagigofnaf@gmail.com&su=Hello&body=Hi%20there,%20I%20visited%20your%20portfolio!"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:text-orange-500 transition-colors hover:transform hover:scale-110">
              <Mail size={50} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;