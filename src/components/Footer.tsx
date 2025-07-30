import React from 'react';
import { Brain, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Brain className="text-blue-400 mr-2" size={24} />
              <h3 className="text-xl font-bold">ML Portfolio</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Machine Learning Engineer passionate about building intelligent systems 
              that solve real-world problems through data-driven solutions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-slate-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#projects" className="text-slate-300 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#game" className="text-slate-300 hover:text-white transition-colors">Game</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Expertise</h4>
            <ul className="space-y-2 text-slate-300">
              <li>Machine Learning</li>
              <li>Deep Learning</li>
              <li>Computer Vision</li>
              <li>Natural Language Processing</li>
              <li>MLOps & Deployment</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-300 mb-4 md:mb-0">
              © {currentYear} ML Portfolio. Built with React, TypeScript & Phaser.js
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;