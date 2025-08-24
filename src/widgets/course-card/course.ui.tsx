import { Card, CardBody, CardHeader, Image } from '@heroui/react'
import { Link } from 'react-router-dom'

export function CourseCard({ id, name, description, photo }) {
  return (
    <Card className="w-full shadow-none border">
      <CardHeader className=" font-bold text-lg flex  gap-2 p-0">
        <Image
          src={photo}
          alt={name}
          className="w-full h-4 object-cover"
          radius="none"
        />
        <h2>{name}</h2>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <Link
          className="bg-sky-500 flex items-center justify-center rounded-md my-2 text-white py-1"
          to={`/student/subject/${id}`}
        >
          Подробнее
        </Link>
      </CardBody>
    </Card>
  )
}
