import React, { useState } from 'react';
import NavBar from './components/nav/NavBar';
import Hero from './components/hero/Hero';
import Ticker from './components/sections/Ticker';
import About from './components/sections/About';
import Stack from './components/sections/Stack';
import Contact from './components/sections/Contact';
import TitleBlock from './components/layout/TitleBlock';
import TetrisEasterEgg from './components/tetris/TetrisEasterEgg';

const App: React.FC = () => {
  const [tetrisOpen, setTetrisOpen] = useState(false);

  return (
    <div className="concrete">
      <NavBar onPlayTetris={() => setTetrisOpen(true)} />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Stack />
        <Contact />
      </main>
      <TitleBlock />
      <TetrisEasterEgg open={tetrisOpen} onClose={() => setTetrisOpen(false)} />
    </div>
  );
};

export default App;
