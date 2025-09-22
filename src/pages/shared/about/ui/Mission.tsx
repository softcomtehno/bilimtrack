import React from 'react';
import { Target, Rocket, Globe, TrendingUp, Calendar, MapPin } from 'lucide-react';

const Mission: React.FC = () => {
  const goals = [
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      title: "Цифровая трансформация",
      description: "Внедрение современных технологий в образовательный процесс"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      title: "Масштабирование",
      description: "Расширение экосистемы образовательных продуктов"
    },
    {
      icon: <MapPin className="w-6 h-6 text-cyan-600" />,
      title: "Интеграция",
      description: "Объединение университетов и колледжей в единую сеть"
    }
  ];

  const futureProjects = [
    {
      title: "AI-ассистент для студентов",
      description: "Интеллектуальный помощник для персонализированного обучения",
      timeline: "Q2 2024",
      status: "В разработке",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Мобильное приложение",
      description: "Единое приложение для доступа ко всем образовательным сервисам",
      timeline: "Q3 2024",
      status: "Планирование",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "VR/AR обучение",
      description: "Виртуальные лаборатории и интерактивные учебные материалы",
      timeline: "Q4 2024",
      status: "Исследование",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-6">
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Миссия и цели</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Создаем{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              будущее образования
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Наша миссия — развитие образовательных технологий и создание инновационной 
            экосистемы для современного образования. Мы стремимся сделать обучение более 
            доступным, эффективным и увлекательным для всех участников образовательного процесса.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {goal.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{goal.title}</h3>
              <p className="text-slate-600 leading-relaxed">{goal.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <Rocket className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Будущие проекты</h3>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              Инновационные решения, которые мы планируем реализовать в ближайшее время
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {futureProjects.map((project, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 bg-gradient-to-r ${project.color} rounded-full text-xs font-medium`}>
                    {project.status}
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.timeline}
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3">{project.title}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                
                <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${project.color} rounded-full transition-all duration-1000 group-hover:w-full`}
                    style={{ 
                      width: project.status === 'В разработке' ? '60%' : 
                             project.status === 'Планирование' ? '30%' : '10%' 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;