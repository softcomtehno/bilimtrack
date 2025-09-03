import { Title } from '@/shared/ui/title';
import { Newspaper } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { NewsCard } from './ui/card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loading } from '@/shared/ui/loading';

type Event = {
  id: number;
  title: string;
  date: string;
  image: string;
  description?: string;
};

interface EventsListProps {
  endpoint: string;
}

export function NewsList({ endpoint }: EventsListProps) {
  const { data, isLoading, isError } = useQuery<Event[]>({
    queryKey: ['events', endpoint],
    queryFn: async () => {
      const res = await axios.get(endpoint);
      return res.data;
    },
  });
  
 if (isLoading) return <Loading/>;
  if (isError) return <div>Ошибка при загрузке мероприятий</div>;

  return (
    <div className="flex flex-col">
      <Title Icon={Newspaper} title="Новости" />
      <Swiper
        className="w-[100%] pb-[40px] default-slider"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
      >
        {data?.slice(0,7).map((event) => (
          <SwiperSlide key={event.id}>
            <NewsCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
