import { Card, CardBody, CardHeader,  } from '@heroui/react'
import { Link } from 'react-router-dom'

export function CourseCard({ id, name, }) {
  return (
    <Card className="w-full shadow-none border p-3">
      <CardHeader className=" flex items-start gap-1 p-0 mt-1">
        <h2 className='text-[18px] font-semibold leading-[22px]'>{name}</h2>
      </CardHeader>
      <CardBody className='p-0 mt-4'>
        <Link
          className="bg-sky-500 flex items-center justify-center rounded-md my-2 text-white py-1"
          to={`/student/subject/${id}`}
        >
          Перейти
        </Link>
      </CardBody>
    </Card>
  )
}
