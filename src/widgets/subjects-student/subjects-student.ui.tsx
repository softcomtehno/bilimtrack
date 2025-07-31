import { Title } from '@/shared/ui/title'
import { Album } from 'lucide-react'
import { Pagination } from 'swiper/modules'
import CourseStudentCard from '@/entities/course/ui/student-card'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'
import { getSubjectsStudent } from '@/entities/subject/subject.api'

export const SubjectsStudent = () => {
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    getSubjectsStudent().then((res) => setSubjects(res))
  }, [])
  return (
    <>
      <Title Icon={Album} title="Предметы" />
      <Swiper
        className="w-[100%] pb-[40px] default-slider"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
      >
        {subjects?.data?.map((subj) => (
          <SwiperSlide key={subj.id}>
            <CourseStudentCard id={subj.id} name={subj.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
