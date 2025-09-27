import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor,
  FileText,
  GraduationCap,
  Building,
  Star,
  ExternalLink,
} from 'lucide-react';
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
}

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lines, setLines] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bilimRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const products: Product[] = [
    {
      id: 'bilimtrack',
      name: 'BilimTrack',
      description: 'Электронная система учёта и мотивации студентов',
      fullDescription:
        'BilimTrack - это комплексная система управления образовательным процессом, которая позволяет отслеживать успеваемость студентов, их активность и мотивировать к обучению.',
      icon: <Monitor className="w-10 h-10" />,
      color: 'from-blue-500 to-blue-600',
      url: 'https://bilimtrack.makalabox.com',
      features: [
        'Учет успеваемости',
        'Система мотивации',
        'Аналитика прогресса',
        'Интеграция с LMS',
      ],
    },
    {
      id: 'makalabox',
      name: 'Makalabox.com',
      description: 'Платформа для публикаций и научных статей',
      fullDescription:
        'Makalabox.com - специализированная платформа для публикации научных статей, рецензирования и обмена знаниями.',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      url: 'https://makalabox.com',
      features: [
        'Публикация статей',
        'Система рецензирования',
        'Поиск по базе',
        'Цитирование',
      ],
    },
    {
      id: 'intuit',
      name: 'Intuit.kg',
      description: 'Официальный сайт "Международного Университета Инновационных Технологий"',
      fullDescription:
        'Intuit.kg - современная образовательная платформа, предоставляющая доступ к качественным курсам и материалам.',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'from-cyan-500 to-cyan-600',
      url: 'https://intuit.kg',
      features: [
        'Онлайн курсы',
        'Интерактивные задания',
        'Сертификация',
        'Прогресс-трекинг',
      ],
    },
    {
      id: 'comtehno',
      name: 'Comtehno.kg',
      description: 'Официальный сайт "Бишкекского Колледжа Компьютерных Систем и Технологий"',
      fullDescription:
        'Comtehno.kg - официальный веб-сайт колледжа, предоставляющий информацию о программах обучения, новостях и возможностях.',
      icon: <Building className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      url: 'https://comtehno.kg',
      features: [
        'Информация о программах',
        'Новости колледжа',
        'Онлайн-заявки',
        'Контакты',
      ],
    },
    {
      id: 'ratingpps',
      name: 'RatingPPS',
      description: 'Система рейтинга преподавателей',
      fullDescription:
        'RatingPPS - инновационная система для оценки преподавателей, основанная на отзывах студентов и академических достижениях.',
      icon: <Star className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-600',
      url: 'https://ratingpps.example.com',
      features: [
        'Рейтинг преподавателей',
        'Отзывы студентов',
        'Аналитика',
        'Статистика',
      ],
    },
  ];

  useEffect(() => {
    const updateLines = () => {
      if (!bilimRef.current || !containerRef.current) return;
      const bRect = bilimRef.current.getBoundingClientRect();
      const cRect = containerRef.current.getBoundingClientRect();

      const x1 = bRect.left + bRect.width / 2 - cRect.left;
      const y1 = bRect.top + bRect.height / 2 - cRect.top;

      const newLines = cardRefs.current.map((el) => {
        if (!el) return { x1, y1, x2: x1, y2: y1 };
        const r = el.getBoundingClientRect();
        const x2 = r.left + r.width / 2 - cRect.left;
        const y2 = r.top + r.height / 2 - cRect.top;
        return { x1, y1, x2, y2 };
      });

      setLines(newLines);
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden"
    >
      {/* линии */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <defs>
          <linearGradient
            id="line-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="url(#line-gradient)"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Экосистема{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              образовательных решений
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Наша платформа объединяет ключевые продукты в сфере образования
          </p>
        </div>

        {/* BilimTrack */}
        <div className="flex justify-center mb-16">
          <div
            ref={bilimRef}
            onClick={() => setSelectedProduct(products[0])}
            className="cursor-pointer bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-8 w-full md:w-2/3 text-center transform transition hover:scale-105 hover:shadow-3xl"
          >
            <div className="flex justify-center mb-4 text-white">
              {products[0].icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {products[0].name}
            </h3>
            <p className="text-slate-200 mb-4">{products[0].description}</p>
            <button onClick={() => setSelectedProduct(products[0])}
              
              className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30"
            >
              Подробнее <ExternalLink className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        <div className="flex gap-7">
          {products.slice(1).map((product, idx) => (
            <div
              key={product.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className={`cursor-pointer bg-gradient-to-br ${product.color} rounded-xl shadow-xl p-6 transform transition hover:scale-105 flex flex-col items-center w-[300px] hover:shadow-2xl`}
            >
              <div className="flex items-center mb-4 text-white">
                {product.icon}
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">
                {product.name}
              </h4>
              <p className="text-slate-100 mb-4 text-center text-[16px] min-h-[70px] max-h-[70px]">
                {product.description}
              </p>
              <button
                onClick={() => setSelectedProduct(product)}
                className="inline-flex items-center px-3 py-1 bg-white/20 rounded-lg text-white hover:bg-white/30 text-sm"
              >
                Подробнее  <ExternalLink className="w-4 h-4 ml-1" />
              </button>
            </div>
          ))}
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
