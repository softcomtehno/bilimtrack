import CourseCard from '@/entities/course/ui/card';
import { Card, CardHeader, CardBody, CardFooter, Divider, Avatar } from '@heroui/react';
import {
  Album,
  Book,
  BookImage,
  CalendarCheck2,
  Captions,
  ChartNoAxesCombined,
  List,
  Newspaper,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Title } from '@/shared/ui/title';
import { Schedule } from '@/widgets/schedule';
import { Dashboard } from '@/widgets/dashboard';
import { EventCard } from '@/entities/event/ui/card';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {
  return (
    <div className="my-5">
      <Card className="max-w-[400px] border rounded-md">
        <CardHeader className="flex justify-between items-center"> 

          <div className="flex flex-col">
            <p className="text-md">BilimTech LMS</p>
            <p className="text-small text-default-500">
              Образовательнпя экосистема УК МУИТ
            </p>
          </div>
          <Link to="/profile" className='cursor-pointer'>
          <Avatar  size="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          </Link>
        </CardHeader>
        <Divider />
        <CardBody>
          <Title title="Профиль" Icon={Album} />
        </CardBody>
      </Card>
    </div>
  );
};
