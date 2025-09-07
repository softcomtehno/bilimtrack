import { Button, Card, CardBody } from '@heroui/react';
import {
  Album,
  BookImage,
  CalendarCheck2,
  ChartNoAxesCombined,
  Newspaper,
} from 'lucide-react';
import { Title } from '@/shared/ui/title';
import { EventCard } from '@/widgets/events-list/ui/card';
import 'swiper/css';
import 'swiper/css/pagination';
import { NewsList } from '@/widgets/news-list';
import { EventsList } from '@/widgets/events-list';
import { MakalaboxList } from '@/widgets/makalabox-list';
import { userQueries } from '@/entities/user';

export const MentorHomePage = () => {
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <div className="p-4">
          <NewsList endpoint={userData?.data?.organization?.newsApi} />
          <EventsList endpoint={userData?.data?.organization?.eventsApi} />
          <MakalaboxList />
    </div>
  );
};
