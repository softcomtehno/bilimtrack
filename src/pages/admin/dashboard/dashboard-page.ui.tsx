import { CardBody } from '@heroui/react'
import {
  BookImage,
  CalendarCheck2,
  Newspaper,
} from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Title } from '@/shared/ui/title'
import { Schedule } from '@/widgets/schedule'
import { EventCard } from '@/entities/event/ui/card'


export const StudentHomePage = () => {
  return (
    <>
      <CardBody>
        <Title Icon={CalendarCheck2} title="Расписание" />
        <Schedule />
        <Title Icon={BookImage} title="Мероприятия" />
        <EventCard />
        <Title Icon={Newspaper} title="Тематические статьи" />
        <EventCard />
        <Title Icon={Newspaper} title="Новости" />
        <EventCard />
      </CardBody>
    </>
  )
}
