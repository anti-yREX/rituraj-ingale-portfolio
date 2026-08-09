
import React, { useState } from 'react';
import NavBar from './components/nav/NavBar';
import Hero from './components/hero/Hero';
import About from './components/sections/About';
import FeatureGrid from './components/sections/FeatureGrid';
import Contact from './components/sections/Contact';
import TetrisEasterEgg from './components/tetris/TetrisEasterEgg';

const App: React.FC = () => {
  const [tetrisOpen, setTetrisOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] font-sans antialiased">
      <NavBar onPlayTetris={() => setTetrisOpen(true)} />
      <main>
        <Hero />
        <About />
        <FeatureGrid />
        <Contact />
      </main>
      <TetrisEasterEgg open={tetrisOpen} onClose={() => setTetrisOpen(false)} />
    </div>
  );
};

export default App;
