import { CardFooter } from '@heroui/card';
import { Home, ScanBarcode, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export function Navigation() {
  const [active, setActive] = useState('home');

  const items = [
    { id: 'home', icon: <Home className="h-6 w-6" />, label: 'Home',  path: '/' },
    {
      id: 'settings',
      icon: <ScanBarcode className="h-6 w-6" />, 
      label: 'Scanner',
      path: '/scanner'
    },
    { id: 'profile', icon: <User className="h-6 w-6" />, label: 'Profile',  path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0">
    <CardFooter className=" bg-white border-t shadow-md flex justify-around py-2">
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
          <span>{item.label}</span>
        </Link>
      ))}
    </CardFooter>
    </div>
  );
}
