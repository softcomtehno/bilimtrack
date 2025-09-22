import React from 'react';
import { BookOpen, Users, Zap, Target, Award, Rocket } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Образовательные технологии",
      description: "Создаем инновационные решения для современного образования"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Командная работа",
      description: "Объединяем лучших специалистов для достижения общих целей"
    },
    {
      icon: <Zap className="w-8 h-8 text-cyan-600" />,
      title: "Инновационный подход",
      description: "Применяем передовые технологии в разработке продуктов"
    }
  ];

  const stats = [
    { number: "5+", label: "Активных проектов" },
    { number: "10+", label: "Участников команды" },
    { number: "3", label: "Года развития" },
    { number: "1000+", label: "Пользователей" }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">О нашем центре</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Что такое Центр инноваций и{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              программных разработок?
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Это место, где рождаются инновации в сфере образования. Мы создаем технологические 
            решения, которые делают обучение более эффективным, доступным и увлекательным.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <Award className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Наши достижения</h3>
            <p className="text-blue-100 text-lg opacity-90">
              Результаты работы нашей команды говорят сами за себя
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-white bg-clip-text text-transparent bg-opacity-90">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;