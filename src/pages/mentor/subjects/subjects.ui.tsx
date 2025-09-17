import { subjectQueries } from '@/entities/subject';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@heroui/react';
import { Skeleton } from '@heroui/react';
import { Book, LibraryBig } from 'lucide-react';

export const SubjectsPage = () => {
  const {
    data: subjectsData,
    isLoading: isSubjectsLoading,
    isError: isSubjectsError,
    isSuccess: isSubjectSuccess,
  } = subjectQueries.useGetSubjectsMentor();

  if (isSubjectsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="rounded-xl h-20 w-full" />
        ))}
      </div>
    );
  }

  if (isSubjectsError) {
    return (
      <div className="p-4 text-red-500">Ошибка при загрузке предметов</div>
    );
  }

  // Группируем предметы по курсам
  const groupedSubjects = subjectsData?.data?.reduce((acc, subject) => {
    const courseNumber = subject.course.number;
    if (!acc[courseNumber]) acc[courseNumber] = [];
    acc[courseNumber].push(subject);
    return acc;
  }, {} as Record<number, typeof subjectsData.data[0][]>);

  // Сортируем номера курсов по возрастанию
  const sortedCourseNumbers = Object.keys(groupedSubjects || {})
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="p-4">
      <h2 className="px-5 flex items-center gap-2 py-4 font-bold text-2xl">
        <LibraryBig />
        Дисциплины:
      </h2>

      {sortedCourseNumbers.map((courseNumber) => (
        <div key={courseNumber} className="mb-8">
          <h3 className="px-5 font-semibold text-lg mb-4">{courseNumber} курс</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {groupedSubjects[courseNumber].map((subject) => (
              <Link to={`/mentor/subjects/${subject.id}`} key={subject.id}>
                <Card
                  isHoverable
                  isPressable
                  className="w-full border rounded-2xl shadow-md hover:shadow-xl p-3 py-8 transition-all duration-300"
                >
                  <p className="text-lg flex items-center gap-2 font-semibold break-words">
                    <div className="border border-slate-200 rounded-md p-2">
                      <Book />
                    </div>
                    {subject.name}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
