import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Code, Palette, Database, Smartphone, Zap } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  avatar: string;
  skills: string[];
  icon: React.ReactNode;
}

const Team: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Асанов Курманбек',
      role: 'Backend Developer',
      specialization: 'Python, Django, UI/UX',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      icon: <Code className="w-5 h-5" />
    },
    {
      id: '2',
      name: 'Каныбеков Максат',
      role: 'Product Manager & Frontend Developer',
      specialization: 'Typescript, React.js, Node.js',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      skills: ['Node.js', 'Typescript', 'React.js', 'Agile'],
      icon: <Database className="w-5 h-5" />
    },
    {
      id: '3',
      name: 'Малабакиев Рамзан',
      role: 'Frontend Developer',
      specialization: '',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      skills: ['Typescript', "React.js", "UI/UX"],
      icon: <Palette className="w-5 h-5" />
    },
    {
      id: '4',
      name: 'Сартов    Ахмед ',
      role: 'Frontend Developer',
      specialization: 'React Native, Flutter',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      id: '5',
      name: 'Кыдырмышев Акай',
      role: 'Стажер',
      specialization: 'Cloud Infrastructure, CI/CD',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
      icon: <Zap className="w-5 h-5" />
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(teamMembers.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(teamMembers.length / 3)) % Math.ceil(teamMembers.length / 3));
  };

  const visibleMembers = teamMembers.slice(currentSlide * 5, (currentSlide * 5) + 5);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-cyan-100/20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Наша команда</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Команда{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              OurEra Soft
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Талантливые разработчики, дизайнеры и инженеры, которые создают будущее образовательных технологий.
          </p>
        </div>
        
        <div className="relative">
          <div className="flex justify-between">
            {visibleMembers.map((member) => (
              <div
                key={member.id}
                className="w-[250px] group bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      {member.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-2">{member.role}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3">Технологии:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* <div className="flex items-center justify-center space-x-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Team;