import { Title } from '@/shared/ui/title';
import { Album, ChartBar } from 'lucide-react';
import { Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { getSubjectsStudent } from '@/entities/subject/subject.api';
import { CourseCard } from '@/widgets/course-card';
import { Divider } from '@heroui/react';
import { Chart } from '@/widgets/chart';

export const LearnPage = () => {
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    getSubjectsStudent().then((res) => setSubjects(res))
  }, [])
  console.log('subjects', subjects)

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <Swiper
        className="w-[100%] pb-[40px] default-slider"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
      >
        {subjects?.data?.map((subj) => (
          <SwiperSlide key={subj.id}>
            <CourseCard {...subj} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Divider />
      <Title Icon={ChartBar} title="Успеваемость" />
      <Chart />
    </div>
  );
};
