import { CardBody } from '@heroui/react';
import { CalendarCheck2 } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Title } from '@/shared/ui/title';


export const DashboardPage = () => {
  return (
    <>
      <CardBody>
        <Title Icon={CalendarCheck2} title="Расписание" />
      </CardBody>
    </>
  );
};
