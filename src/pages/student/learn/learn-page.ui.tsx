import { Title } from '@/shared/ui/title';
import { Album, Book, ChartBar, Search } from 'lucide-react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState, useMemo } from 'react';
import { getSubjectsStudent } from '@/entities/subject/subject.api';
import { CourseCard } from '@/widgets/course-card';
import { Chart } from '@/widgets/chart';

export const LearnPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getSubjectsStudent().then((res) => setSubjects(res));
  }, []);

  const filteredSubjects = useMemo(() => {
    if (!searchText) return subjects?.data ?? [];
    return (subjects?.data ?? []).filter((subj) =>
      subj.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [subjects, searchText]);

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <Title Icon={Book} title="Дисциплины" />

      <div className="w-full max-w-md mb-1">
        <div className="relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Поиск дисциплины..."
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <Swiper
        className="w-[100%] pb-[40px] default-slider"
        modules={[Pagination]}
        grabCursor
        pagination={{ clickable: true }}
        spaceBetween={20}
      >
        {filteredSubjects.map((subj) => (
          <SwiperSlide key={subj.id}>
            <CourseCard
              id={subj.id}
              name={subj.name}
              makalaboxUrl={subj.makalaboxUrl}
              createdAt={subj.createdAt}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Title Icon={ChartBar} title="Успеваемость" />
      <Chart />
    </div>
  );
};
