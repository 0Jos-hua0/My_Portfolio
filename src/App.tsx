import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import GameSection from './components/GameSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <GameSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;