import { groupQueries } from '@/entities/group'
import { subjectQueries, subjectTypes } from '@/entities/subject'
import { Title } from '@/shared/ui/title'
import { useMemo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import CourseCard from '@/entities/course/ui/card'
import { Pagination } from 'swiper/modules'
import { Album } from 'lucide-react'
import { Group } from '@/shared/types'
import { topicApi } from '@/entities/topic'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'

export const SubjectPage = () => {
  const { id } = useParams()
  const {
    data: subjectsData,
    isLoading: isSubjectLoading,
    isError: isSubjectError,
  } = subjectQueries.useGetSubjectsMentor()

  const subject = useMemo(() => {
    if (!subjectsData?.data || !id) return undefined
    return subjectsData.data.find(
      (subject: subjectTypes.Subject) => String(subject.id) === id
    )
  }, [subjectsData, id])

  const {
    data: groupData,
    isLoading: isGroupLoading,
    isError: isGroupError,
  } = groupQueries.useGetMentorGroups(subject?.id, {
    enabled: !!subject?.id,
  })

  // -------------------- темы --------------------
  const [topics, setTopics] = useState<any[]>([])
  const [newTopic, setNewTopic] = useState('')
  const [editMode, setEditMode] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')

  useEffect(() => {
    if (!subject?.id) return
    loadTopics()
  }, [subject?.id])

  const loadTopics = async () => {
    try {
      const res = await topicApi.getTopics(subject?.id)
      setTopics(res.data) // если backend вернёт {results:[]} → поправь на res.data.results
    } catch (e) {
      console.error('Ошибка загрузки тем:', e)
    } finally {
    }
  }

  const handleAddTopic = async () => {
    if (!newTopic.trim()) return
    try {
      await topicApi.addTopic(subject?.id, newTopic)
      setNewTopic('')
      await loadTopics()
    } catch (e) {
      console.error('Ошибка добавления темы:', e)
    }
  }

  const handleDeleteTopic = async (topicId: number) => {
    try {
      await topicApi.deleteTopic(topicId)
      await loadTopics()
    } catch (e) {
      console.error('Ошибка удаления темы:', e)
    }
  }

  const handleStartEdit = (topic: any) => {
    setEditMode(topic.id)
    setEditTitle(topic.title)
  }

  const handleSaveEdit = async (topicId: number) => {
    try {
      await topicApi.updateTopic(topicId, subject?.id, editTitle)
      setEditMode(null)
      setEditTitle('')
      await loadTopics()
    } catch (e) {
      console.error('Ошибка обновления темы:', e)
    }
  }
  // ------------------------------------------------

  if (isSubjectLoading || isGroupLoading) {
    return <div>Загрузка...</div>
  }

  if (isSubjectError || isGroupError) {
    return <div>Произошла ошибка при загрузке</div>
  }
  if (!subject) {
    return <div>Предмет не найден</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">{subject.name}</h1>

      {/* -------------------- темы -------------------- */}
      {/* ------------------------------------------------ */}

      <Title Icon={Album} title="Группы" />
      <Swiper
        className="w-[100%] pb-[40px] default-slider"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        // slidesPerView={4}
        breakpoints={{
          2500: {
            slidesPerView: 6,
          },
          2000: {
            slidesPerView: 6,
          },
          1400: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 2.5,
          },
          480: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1.5,
          },
        }}
      >
        {groupData?.data.map((group: Group) => (
          <SwiperSlide key={group.id}>
            <CourseCard name={group.name} id={group.id} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Title Icon={Album} title="Темы уроков" />
      <div className="flex gap-2 items-center mb-4">
        <Input
          placeholder="Введите название темы"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          className="max-w-xs"
        />
        <Button color="primary" onPress={handleAddTopic}>
          Добавить
        </Button>
      </div>

      <div className="mb-8 max-w-[420px]">
        {topics.map((t) => (
          <div
            key={t.id}
            className="mt-2 flex items-center  gap-2 justify-between"
          >
            {editMode === t.id ? (
              <>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="max-w-xs"
                />
                <Button
                  size="sm"
                  color="success"
                  onPress={() => handleSaveEdit(t.id)}
                >
                  Сохранить
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => setEditMode(null)}
                >
                  Отмена
                </Button>
              </>
            ) : (
              <>
                <span className="">{t.title}</span>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() => handleStartEdit(t)}
                  >
                    Изменить
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onPress={() => handleDeleteTopic(t.id)}
                  >
                    Удалить
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
