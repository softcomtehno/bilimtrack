import { Title } from '@/shared/ui/title'
import { Album } from 'lucide-react'
import { Pagination } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'
import { getSubjectsStudent } from '@/entities/subject/subject.api'
import { CourseCard } from '@/widgets/course-card'

export const LearnPage = () => {
    const [subjects, setSubjects] = useState([])

  useEffect(() => {
    getSubjectsStudent().then((res) => setSubjects(res))
  }, [])
  console.log('subjects', subjects);
  
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
    <CourseCard
      id={subj.id}
      name={subj.name}
      description={subj.description}
      photo={subj.photo}
      makalaboxUrl={subj.makalaboxUrl}
      createdAt={subj.createdAt}
    />
  </SwiperSlide>
))}

      </Swiper>
    </div>
  )
}
