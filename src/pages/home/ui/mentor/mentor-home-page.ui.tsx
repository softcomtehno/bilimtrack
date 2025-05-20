import { Card, CardBody } from '@heroui/react'
import {
  Album,
  BookImage,
  CalendarCheck2,
  ChartNoAxesCombined,
  Newspaper,
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import CourseCard from '@/entities/course/ui/card'
import { Title } from '@/shared/ui/title'
import { Schedule } from '@/widgets/schedule'
import { Dashboard } from '@/widgets/dashboard'
import { EventCard } from '@/entities/event/ui/card'
// import { TopBar } from '@/widgets/top-bar'
import 'swiper/css'
import 'swiper/css/pagination'
import { GradeBook } from '@/widgets/grade-book'
import { FullSchedule } from '@/widgets/full-schedule'

export const MentorHomePage = () => {
  return (
    <>
      <Card>
        <CardBody>
          <Title Icon={Album} title="Предметы" />
          <Swiper
            className="w-[100%] pb-[40px] default-slider"
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
          >
            <SwiperSlide>
              <CourseCard />
            </SwiperSlide>
            <SwiperSlide>
              <CourseCard />
            </SwiperSlide>
            <SwiperSlide>
              <CourseCard />
            </SwiperSlide>
          </Swiper>
          <Title Icon={CalendarCheck2} title="Расписание" />
          <Schedule />
          <Title Icon={ChartNoAxesCombined} title="Лидерборд" />
          <Dashboard />
          <Title Icon={BookImage} title="Мероприятия" />
          <EventCard />
          <Title Icon={Newspaper} title="Тематические статьи" />
          <EventCard />
          <Title Icon={Newspaper} title="Новости" />
          <EventCard />
          <GradeBook />
          <FullSchedule />
          {/* <GradeBook2 /> */}
        </CardBody>
      </Card>
    </>
  )
}
