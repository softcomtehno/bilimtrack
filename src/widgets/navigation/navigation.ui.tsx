import { CardFooter } from '@heroui/card';
import {
  BookCopy,
  Bubbles,
  ChartNoAxesCombined,
  Home,
  ScanBarcode,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const [active, setActive] = useState('home');

  const items = [
    {
      id: 'home',
      icon: <Home className="h-6 w-6" />,
      label: 'Главная',
      path: '/student',
    },
    {
      id: 'learn',
      icon: <BookCopy className="h-6 w-6" />,
      label: 'Обучение',
      path: 'student/learn',
    },
    {
      id: 'scaner',
      icon: (
        <ScanBarcode className="h-8 w-8 mt-[-4px] text-black/70 border rounded-md border-black" />
      ),
      label: '',
      path: '/student/scanner',
    },
    {
      id: 'rating',
      icon: <ChartNoAxesCombined className="h-6 w-6" />,
      label: 'Рейтинг',
      path: '/student/rating',
    },
    {
      id: 'more',
      icon: <Bubbles className=' h-6 w-6' />,
      label: 'Еще',
      path: '/student/more',
    },
  ];

  return (
    <div className="fixed z-50 bottom-0 left-0 right-0">
      <CardFooter className=" bg-white border-t shadow-md flex items-start justify-around py-2">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setActive(item.id)}
            className={`flex flex-col items-center text-sm ${
              active === item.id ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            {item.icon}
            <span className="text-[12px]">{item.label}</span>
          </Link>
        ))}
      </CardFooter>
    </div>
  );
}
