import { subjectQueries } from '@/entities/subject'
import { Link } from 'react-router-dom'
import { Card, CardBody } from '@heroui/react'
import { Skeleton } from '@heroui/react'

export const SubjectsPage = () => {
  const {
    data: subjectsData,
    isLoading: isSubjectsLoading,
    isError: isSubjectsError,
    isSuccess: isSubjectSuccess,
  } = subjectQueries.useGetSubjectsMentor()


  if (isSubjectsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="rounded-xl h-20 w-full" />
        ))}
      </div>
    )
  }

  if (isSubjectsError) {
    return <div className="p-4 text-red-500">Ошибка при загрузке предметов</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {subjectsData?.data?.map((subject) => (
        <Link to={`/mentor/subjects/${subject.id}`} key={subject.id}>
          <Card
            isHoverable
            isPressable
            className="w-full  h-52 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <CardBody className="flex items-center justify-center text-center">
              <p className="text-base font-semibold whitespace-normal break-words">
                {subject.name}
              </p>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  )
}
