
import React, { useState } from 'react';
import { portfolioData } from './data/portfolioData';
import TetrisCanvas from './components/TetrisCanvas';
import { COLOR_SCHEMES, getColorScheme } from './constants';

const App: React.FC = () => {
  const [score, setScore] = useState(0);
  const [styleVariant, setStyleVariant] = useState(0);

  const handleScoreChange = (newScore: number) => {
    if (newScore > score) {
      setScore(newScore);
      setStyleVariant(prev => (prev + 1) % COLOR_SCHEMES.length);
    }
  };

  const currentScheme = getColorScheme(styleVariant);

  return (
    <div className="relative min-h-screen font-mono antialiased">
      <TetrisCanvas onScoreChange={handleScoreChange} colorSchemeIndex={styleVariant} />
      
      <main className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-8">
        <div className={`w-full max-w-4xl p-6 md:p-10 space-y-8 md:space-y-12 ${currentScheme.mainContent.bg} backdrop-blur-md rounded-lg border ${currentScheme.mainContent.border} shadow-2xl shadow-purple-900/10 transition-all duration-500`}>
          
          <header className="text-center">
            <h1 className={`text-4xl md:text-6xl font-bold ${currentScheme.mainContent.text} tracking-wider transition-all duration-500`}>
              {portfolioData.name}
            </h1>
            <p className={`mt-2 text-lg md:text-xl ${currentScheme.mainContent.accent} transition-all duration-500`}>
              {portfolioData.title}
            </p>
          </header>

          <section id="about">
            <h2 className={`text-2xl font-semibold ${currentScheme.mainContent.text} border-b-2 ${currentScheme.mainContent.sectionBorder} pb-2 mb-4 transition-all duration-500`}>
              About Me
            </h2>
            <p className={`${currentScheme.mainContent.text} opacity-80 leading-relaxed transition-all duration-500`}>
              {portfolioData.about}
            </p>
          </section>

          <section id="skills">
            <h2 className={`text-2xl font-semibold ${currentScheme.mainContent.text} border-b-2 ${currentScheme.mainContent.sectionBorder} pb-2 mb-4 transition-all duration-500`}>
              Core Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.map((skill) => (
                <span 
                  key={skill} 
                  className={`px-3 py-1 bg-gray-800/50 ${currentScheme.mainContent.accent} text-sm rounded-full border ${currentScheme.mainContent.border} hover:bg-opacity-70 hover:text-white transition-all duration-300`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <footer className={`text-center pt-4 border-t ${currentScheme.mainContent.border} transition-all duration-500`}>
            <p className={`text-sm ${currentScheme.mainContent.text} opacity-60 transition-all duration-500`}>
              {portfolioData.footer.note}
            </p>
             <p className={`text-xs ${currentScheme.mainContent.text} opacity-50 mt-2 transition-all duration-500`}>
              <div className="flex flex-row gap-2 justify-center">
                <a href={`https://github.com/${portfolioData.footer.contact.github}`}>GitHub</a>
                <a href={`https://www.linkedin.com/in/${portfolioData.footer.contact.linkedin}`}>LinkedIn</a>
                <a href={`mailto:${portfolioData.footer.contact.email}`}>Email</a>
              </div>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
