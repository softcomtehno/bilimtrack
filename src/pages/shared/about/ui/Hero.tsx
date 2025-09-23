import React, { useEffect, useState } from 'react';
import { ChevronDown, Code, Cpu, Lightbulb } from 'lucide-react';
import FloatingElements from './FloatingElements';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <FloatingElements />
      
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/80 z-10"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-lg border border-white/20">
          <Cpu className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-slate-700">Инновации в образовании</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
          Центр инноваций и{' '}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            программных разработок
          </span>
          <br />
          <span className="text-4xl md:text-5xl font-semibold text-slate-700">УК МУИТ</span>
        </h1>
        
        <div className="flex justify-center items-center gap-1 my-7 ">
          <img src="images/soft.png" className='h-10 w-10 rounded-full' alt="" />
          <p className='font-medium leading-5'>
          Powered by <br />
          OurEra Soft
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <span className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>Наши проекты</span>
            </span>
          </button>
          
          <button className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full font-semibold text-lg border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:bg-white">
            <span className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>О команде</span>
            </span>
          </button>
        </div>
        
        <div className="animate-bounce">
          <ChevronDown className="w-8 h-8 text-slate-400 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;