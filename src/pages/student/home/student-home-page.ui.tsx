import { CardBody } from '@heroui/react';
import { BookImage, CalendarCheck2, Newspaper } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Title } from '@/shared/ui/title';
import { Schedule } from '@/widgets/schedule';
import { MakalaboxList } from '@/widgets/makalabox-list';
import { EventsList } from '@/widgets/events-list';
import { userQueries } from '@/entities/user';
import { NewsList } from '@/widgets/news-list';

export const StudentHomePage = () => {
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
    <>
      <CardBody>
        {/* <Title Icon={CalendarCheck2} title="Расписание" /> */}
        {/* <Schedule /> */}
        <NewsList endpoint={userData?.data?.organization?.newsApi} />
        <EventsList endpoint={userData?.data?.organization?.eventsApi} />
        <MakalaboxList />
      </CardBody>
    </>
  );
};
