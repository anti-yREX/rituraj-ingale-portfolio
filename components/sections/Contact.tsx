
import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { EASE_DECEL } from '../../constants/theme';

const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { contact } = portfolioData.footer;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative max-w-2xl mx-auto px-4 py-24 md:py-32 text-center"
      style={{
        transition: `opacity 900ms ${EASE_DECEL}, transform 900ms ${EASE_DECEL}`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <h2 className="font-mono text-xs tracking-widest text-cyan-300/80 uppercase mb-4">Contact</h2>
      <p className="text-lg text-gray-200/90 mb-8">Let's build something calm and resilient together.</p>
      <div className="flex flex-row flex-wrap gap-4 justify-center font-mono text-sm">
        <a
          href={`https://github.com/${contact.github}`}
          className="px-4 py-2 rounded-full border border-white/10 text-gray-300 hover:text-cyan-200 hover:border-cyan-400/40 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)] transition-all duration-500"
        >
          GitHub
        </a>
        <a
          href={`https://www.linkedin.com/in/${contact.linkedin}`}
          className="px-4 py-2 rounded-full border border-white/10 text-gray-300 hover:text-cyan-200 hover:border-cyan-400/40 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)] transition-all duration-500"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="px-4 py-2 rounded-full border border-white/10 text-gray-300 hover:text-cyan-200 hover:border-cyan-400/40 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)] transition-all duration-500"
        >
          Email
        </a>
      </div>
    </section>
  );
};

export default Contact;
