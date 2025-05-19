import CourseCard from '@/entities/course/ui/card'
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
import { Title } from '@/shared/ui/title'
import { Schedule } from '@/widgets/schedule'
import { Dashboard } from '@/widgets/dashboard'
import { EventCard } from '@/entities/event/ui/card'
// import { TopBar } from '@/widgets/top-bar'
import GradeTable from '@/widgets/test.ui'
import 'swiper/css'
import 'swiper/css/pagination'
import { GradeBook } from '@/widgets/grade-book'

export const MentorHomePage = () => {
  return (
    <>
      <Card>
        <CardBody>
          <Title title="Предметы" Icon={Album} />
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
          <Title title="Расписание" Icon={CalendarCheck2} />
          <Schedule />
          <Title title="Лидерборд" Icon={ChartNoAxesCombined} />
          <Dashboard />
          <Title title="Мероприятия" Icon={BookImage} />
          <EventCard />
          <Title title="Тематические статьи" Icon={Newspaper} />
          <EventCard />
          <Title title="Новости" Icon={Newspaper} />
          <EventCard />
          <GradeBook />
        </CardBody>
      </Card>
    </>
  )
}
