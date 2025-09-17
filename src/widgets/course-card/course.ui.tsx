import { Card, CardBody, CardHeader,  } from '@heroui/react'
import { Album } from 'lucide-react'
import { Link } from 'react-router-dom'

export function CourseCard({ id, name, }) {
  return (
    <Card className="w-[99%] max-h-[150px]  min-h-[150px] shadow-sm border flex flex-col justify-between rounded-md border-slate-300 py-2 px-3">
     <div className="flex items-center gap-3 mt-2">
        <div className="p-2 bg-sky-100 rounded-full text-sky-600">
          <Album size={20} />
        </div>
        <h2 className="text-[18px] font-semibold leading-tight text-slate-800">
          {name}
        </h2>
      </div>
      <div className=' mt-3'>
        <Link
          className="bg-sky-500 flex items-center justify-center rounded-md my-2 text-white py-1"
          to={`/student/subject/${id}`}
        >
          Перейти
        </Link>
      </div>
    </Card>
  )
}
