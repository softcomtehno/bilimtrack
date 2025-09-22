import React, { useState } from 'react';
import { ExternalLink, X, Monitor, FileText, GraduationCap, Building, Star } from 'lucide-react';
import ProductModal from './ProductModal';

interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  icon: React.ReactNode;
  color: string;
  url: string;
  features: string[];
  position: string;
}

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: 'bilimtrack',
      name: 'BilimTrack',
      description: 'Электронная система учёта и мотивации студентов',
      fullDescription: 'BilimTrack - это комплексная система управления образовательным процессом, которая позволяет отслеживать успеваемость студентов, их активность и мотивировать к обучению.',
      icon: <Monitor className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      url: 'https://bilimtrack.example.com',
      features: ['Учет успеваемости', 'Система мотивации', 'Аналитика прогресса', 'Интеграция с LMS'],
      position: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    },
    {
      id: 'makalabox',
      name: 'Makalabox.com',
      description: 'Платформа для публикаций и научных статей',
      fullDescription: 'Makalabox.com - специализированная платформа для публикации научных статей, рецензирования и обмена научными знаниями в академическом сообществе.',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      url: 'https://makalabox.com',
      features: ['Публикация статей', 'Система рецензирования', 'Поиск по базе', 'Цитирование'],
      position: 'top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2'
    },
    {
      id: 'intuit',
      name: 'Intuit.kg',
      description: 'Образовательная онлайн-платформа',
      fullDescription: 'Intuit.kg - современная образовательная платформа, предоставляющая доступ к качественным курсам и образовательным материалам для студентов и преподавателей.',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
      url: 'https://intuit.kg',
      features: ['Онлайн курсы', 'Интерактивные задания', 'Сертификация', 'Прогресс-трекинг'],
      position: 'top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2'
    },
    {
      id: 'comtehno',
      name: 'ComTehno.kg',
      description: 'Официальный сайт колледжа',
      fullDescription: 'ComTehno.kg - официальный веб-сайт колледжа, предоставляющий информацию о программах обучения, новостях и возможностях для абитуриентов и студентов.',
      icon: <Building className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      url: 'https://comtehno.kg',
      features: ['Информация о программах', 'Новости колледжа', 'Онлайн-подача заявок', 'Контакты'],
      position: 'bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2'
    },
    {
      id: 'ratingpps',
      name: 'RatingPPS',
      description: 'Система рейтинга преподавателей',
      fullDescription: 'RatingPPS - инновационная система для оценки и рейтинга преподавателей, основанная на отзывах студентов и академических достижениях.',
      icon: <Star className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-600',
      url: 'https://ratingpps.example.com',
      features: ['Рейтинг преподавателей', 'Отзывы студентов', 'Аналитика', 'Статистика'],
      position: 'bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Monitor className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-200">Наши продукты</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Экосистема{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              образовательных решений
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Интерактивная карта наших продуктов. Нажмите на любой элемент для подробной информации.
          </p>
        </div>
        
        <div className="relative w-full max-w-6xl mx-auto" style={{ height: '600px' }}>
          {/* Central hub - BilimTrack */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => setSelectedProduct(products[0])}
              className="group relative"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-3xl">
                <Monitor className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <h3 className="text-lg font-semibold text-white mb-1">BilimTrack</h3>
                <p className="text-sm text-slate-300 w-48">Центральная система управления</p>
              </div>
            </button>
          </div>
          
          {/* Connected products */}
          {products.slice(1).map((product, index) => (
            <div key={product.id} className={`absolute ${product.position} z-10`}>
              <button
                onClick={() => setSelectedProduct(product)}
                className="group relative"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${product.color} rounded-xl shadow-xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-2xl text-white`}>
                  {product.icon}
                </div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                  <h4 className="text-sm font-semibold text-white">{product.name}</h4>
                </div>
              </button>
            </div>
          ))}
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Lines from center to each product */}
            <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          </svg>
        </div>
      </div>
      
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
};

export default Products;