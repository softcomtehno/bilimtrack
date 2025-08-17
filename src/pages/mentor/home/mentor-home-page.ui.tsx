import { Card, CardBody } from '@heroui/react'
import {
  Album,
  BookImage,
  CalendarCheck2,
  ChartNoAxesCombined,
  Newspaper,
} from 'lucide-react'
import { Title } from '@/shared/ui/title'
import { EventCard } from '@/entities/event/ui/card'
import 'swiper/css'
import 'swiper/css/pagination'

export const MentorHomePage = () => {
  return (
    <>
      <Card className="shadow-none border rounded-md">
        <CardBody>
          <Title Icon={BookImage} title="Мероприятия" />
          <EventCard />
          <Title Icon={Newspaper} title="Новости" />
          <EventCard />
          <Title Icon={Newspaper} title="Тематические статьи" />
          <EventCard />
        </CardBody>
      </Card>
    </>
  )
}
