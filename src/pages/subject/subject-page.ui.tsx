import { groupQueries } from '@/entities/group'
import { subjectQueries, subjectTypes } from '@/entities/subject'
import { Title } from '@/shared/ui/title'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import CourseCard from '@/entities/course/ui/card'
import { Pagination } from 'swiper/modules'
import { Album } from 'lucide-react'
import { Group } from '@/shared/types'

export const SubjectPage = () => {
  const { id } = useParams()

  // Получаем все предметы
  const {
    data: subjectsData,
    isLoading: isSubjectLoading,
    isError: isSubjectError,
  } = subjectQueries.useGetSubjectsMentor()

  // Находим нужный предмет по id (без useState/useEffect)
  const subject = useMemo(() => {
    if (!subjectsData?.data || !id) return undefined
    return subjectsData.data.find(
      (subject: subjectTypes.Subject) => String(subject.id) === id
    )
  }, [subjectsData, id])

  // Получаем группы по subjectId, если subject найден
  const {
    data: groupData,
    isLoading: isGroupLoading,
    isError: isGroupError,
  } = groupQueries.useGetMentorGroups(subject?.id, {
    enabled: !!subject?.id, // не запускать, пока нет id
  })

  if (isSubjectLoading || isGroupLoading) {
    return <div>Загрузка...</div>
  }

  // Ошибки
  if (isSubjectError || isGroupError) {
    return <div>Произошла ошибка при загрузке</div>
  }

  // Не найден предмет
  if (!subject) {
    return <div>Предмет не найден</div>
  }
  console.log(groupData)
  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">{subject.name}</h1>

      <Title Icon={Album} title="Группы" />
      <Swiper
        className="w-[100%] pb-[40px] default-slider"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={4}
      >
        {groupData?.data.map((group: Group, i) => (
          <SwiperSlide key={group.id}>
            <CourseCard name={group.name} id={group.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
