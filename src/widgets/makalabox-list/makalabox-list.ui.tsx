import { useState } from 'react';
import { MakalaboxCard } from '@/entities/makalabox/ui/card';
import { Title } from '@/shared/ui/title';
import { Newspaper } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Button } from '@heroui/button';
import { makalaboxQueries } from '@/entities/makalabox';
import { Loading } from '@/shared/ui/loading';

export function MakalaboxList() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | number>(
    'all'
  );

  const { data: categoryData } = makalaboxQueries.useGetCategories();
  const {
    data: makalaData,
    isLoading,
    isError,
  } = makalaboxQueries.useGetMakalas();

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching data.</div>;

  const filteredMakala =
    selectedCategory === 'all'
      ? makalaData?.data.results
      : makalaData?.data.results.filter((article) =>
          article.categoriesId?.map(String).includes(String(selectedCategory))
        );

  return (
    <div className="flex flex-col">
      <Title Icon={Newspaper} title="Тематические статьи" />
      <Swiper
        className="w-full category-swiper py-2"
        spaceBetween={8}
        slidesPerView="auto"
      >
        <SwiperSlide key="all" className="!w-auto">
          <Button
            size="sm"
            color={selectedCategory === 'all' ? 'primary' : 'default'}
            variant="ghost"
            onClick={() => setSelectedCategory('all')}
          >
            Все
          </Button>
        </SwiperSlide>
        {categoryData?.data.map((cat) => (
          <SwiperSlide key={cat.id} className="!w-auto">
            <Button
              size="sm"
              color={selectedCategory === cat.id ? 'primary' : 'default'}
              variant="ghost"
              onClick={() => setSelectedCategory(Number(cat.id))}
            >
              {cat.name}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="w-[100%] pb-[40px] default-slider"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
      >
        {filteredMakala?.slice(0, 5).map((subj) => (
          <SwiperSlide key={subj.id}>
            <MakalaboxCard id={subj.id} title={subj.title} photo={subj.photo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
