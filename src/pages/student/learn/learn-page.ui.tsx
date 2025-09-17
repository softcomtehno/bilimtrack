import { Title } from '@/shared/ui/title';
import { Album, Book, ChartBar, Search } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState, useMemo } from 'react';
import { getSubjectsStudent } from '@/entities/subject/subject.api';
import { CourseCard } from '@/widgets/course-card';
import { Chart } from '@/widgets/chart';
import { Pagination } from '@heroui/react';

export const LearnPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    getSubjectsStudent().then((res) => setSubjects(res));
  }, []);

  const filteredSubjects = useMemo(() => {
    if (!searchText) return subjects?.data ?? [];
    return (subjects?.data ?? []).filter((subj) =>
      subj.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [subjects, searchText]);

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredSubjects.slice(start, start + itemsPerPage);
  }, [filteredSubjects, page]);

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <Title Icon={ChartBar} title="Успеваемость" />
      <Chart />
      <Title Icon={Book} title="Дисциплины" />
      <div className="w-full max-w-md mb-1">
        <div className="relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setPage(1);
              setSearchText(e.target.value);
            }}
            placeholder="Поиск дисциплины..."
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {currentItems.map((subj) => (
          <CourseCard key={subj.id} id={subj.id} name={subj.name} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          loop
          showControls
          total={totalPages}
          page={page}
          onChange={setPage}
          className="w-full my-2"
        />
      )}
    </div>
  );
};
