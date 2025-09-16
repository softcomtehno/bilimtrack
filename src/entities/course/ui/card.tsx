import { Card, CardHeader, CardBody, CardFooter, Divider } from '@heroui/react'
import { ChartArea } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CourseCard({
  name = 'Основы экономики, менеджмента и маркетинга в IT',
  id,
}) {
  return (
    <Link to={`groups/${id}`}>
      <Card className="min-w-[150px] shadow-none border rounded-md cursor-pointer ">
        <CardHeader className="flex gap-3 items-start">
          <ChartArea />
          <div className="flex flex-col">
            <p className="text-md leading-[100%]">{name}</p>
          </div>
        </CardHeader>

        <Divider />
        <CardFooter>
          <Link to={`groups/${id}`}>Подробнее</Link>
        </CardFooter>
      </Card>
    </Link>
  )
}
