import { useMemo, useState } from 'react';
import { MakalaboxCard } from '@/entities/makalabox/ui/card';
import { Title } from '@/shared/ui/title';
import { Newspaper } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper/modules';
import { Button } from '@heroui/button';
import { makalaboxQueries } from '@/entities/makalabox';
import { Loading } from '@/shared/ui/loading';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type Category = {
  id: number;
  name: string;
  photo: string;
  children?: Category[];
};

export function MakalaboxList() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | number>('all');

  const { data: categoryData } = makalaboxQueries.useGetCategories();
  const { data: makalaData, isLoading, isError } = makalaboxQueries.useGetMakalas();

  const categories: Category[] = categoryData?.data ?? [];

  const selectedIds: number[] | null = useMemo(() => {
    if (selectedCategory === 'all') return null;

    const idSet: number[] = [];
    const root = categories.find((c) => c.id === selectedCategory);
    if (!root) return [];

    const stack: Category[] = [root];
    while (stack.length) {
      const current = stack.pop()!;
      idSet.push(current.id);
      if (current.children?.length) stack.push(...current.children);
    }

    return idSet;
  }, [selectedCategory, categories]);

  const filteredMakala = useMemo(() => {
    const allArticles = makalaData?.data.results ?? [];
    if (!selectedIds) return allArticles;

    return allArticles.filter(
      (article: { categoriesId?: number[] }) =>
        Array.isArray(article.categoriesId) &&
        article.categoriesId.some((id) => selectedIds.includes(id))
    );
  }, [makalaData, selectedIds]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching data.</div>;

  return (
    <div className="flex flex-col">
      <Title Icon={Newspaper} title="Тематические статьи" />

      {/* Свайпер для категорий */}

<Swiper
  className="w-full category-swiper py-3"
  spaceBetween={12}
  slidesPerView="auto"
     grabCursor={true}
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

  {categories.map((cat) => (
    <SwiperSlide key={cat.id} className="!w-auto">
      <Button
        size="sm"
        color={selectedCategory === cat.id ? 'primary' : 'default'}
        variant="ghost"
        onClick={() => setSelectedCategory(cat.id)}
      >
        {cat.name}
      </Button>
    </SwiperSlide>
  ))}
</Swiper>
      {filteredMakala.length > 0 ? (
        <Swiper
          className="w-[100%] pb-[40px] default-slider"
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
                    breakpoints={{
    640: { 
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 3,
    },
  }}
        >
          {filteredMakala.slice(0, 7).map((subj: any) => (
            <SwiperSlide key={subj.id}>
              <MakalaboxCard id={subj.id} title={subj.title} photo={subj.photo} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Нет статей на эту категорию
        </div>
      )}
    </div>
  );
}
