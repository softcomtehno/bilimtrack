import React, { useEffect, useMemo } from 'react'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { FilterX } from 'lucide-react'
import { Teacher, Group, Classroom } from '@/shared/types'
import { useScheduleFilters } from '@/entities/schedule'

interface ScheduleFiltersProps {
  teachers: Teacher[]
  groups: Group[]
  classrooms: Classroom[]
  courses: { id: number; number: number; educationLevel?: string | number }[]
  eduLevelsData: { id: string; name: string }[]
}

export const ScheduleFilters: React.FC<ScheduleFiltersProps> = ({
  teachers,
  groups,
  classrooms,
  courses,
  eduLevelsData,
}) => {
  const {
    eduLevelId,
    courseId,
    groupId,
    teacherId,
    classroomId,
    weekType,
    setEduLevel,
    setCourse,
    setGroup,
    setTeacher,
    setClassroom,
    setWeekType,
    reset,
  } = useScheduleFilters()

  const filteredCourses = useMemo(() => {
    if (!eduLevelsData?.length || !eduLevelId) {
      // если нет уровней образования (колледж), показываем все курсы
      return courses
    }
    // иначе фильтруем по выбранному уровню
    return courses.filter((c) => String(c.educationLevel) === eduLevelId)
  }, [courses, eduLevelId, eduLevelsData])

  const displayGroups = useMemo(() => {
    if (!courseId) return groups
    return groups.filter((g) => g.course?.id?.toString() === courseId)
  }, [groups, courseId])
  console.log(displayGroups)

  const hasActiveFilters =
    teacherId || groupId || classroomId || weekType !== 'Обе'

  // При изменении курса — обновляем группу
  useEffect(() => {
    if (courseId && groupId) {
      const exists = displayGroups.some((g) => g.id === groupId)
      if (!exists) setGroup(displayGroups[0]?.id)
    }
  }, [courseId, groupId, displayGroups, setGroup])
  const isCourseDisabled = eduLevelsData?.length > 0 && !eduLevelId
  const isGroupDisabled = eduLevelsData?.length > 0 && !eduLevelId

  return (
    <div className="bg-white p-4 rounded-lg shadow-card mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        {eduLevelsData?.length > 0 && (
          <div className="w-full sm:w-48">
            <Select
              label="Уровни образования"
              options={eduLevelsData.map((lvl) => ({
                value: lvl.id,
                label: lvl.name,
              }))}
              value={eduLevelId || ''}
              onChange={(v) => setEduLevel(v || undefined)}
            />
          </div>
        )}

        <div className="w-full sm:w-48">
          <Select
            label="Курс"
            options={filteredCourses.map((c) => ({
              value: String(c.id),
              label: `${c.number} курс`,
            }))}
            value={courseId || ''}
            onChange={(v) => setCourse(v || undefined)}
            disabled={isCourseDisabled}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            label="Группа"
            options={displayGroups.map((g) => ({
              value: g.id,
              label: g.name,
            }))}
            value={groupId || displayGroups[0]?.id || ''}
            onChange={(v) => setGroup(v || undefined)}
            disabled={isGroupDisabled}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            label="Тип недели"
            options={[
              { value: 'Обе', label: 'Все недели' },
              { value: 'Числитель', label: 'Числитель' },
              { value: 'Знаменатель', label: 'Знаменатель' },
            ]}
            value={weekType}
            onChange={(v) => setWeekType(v as any)}
          />
        </div>

        <div className="w-full sm:w-64">
          <Select
            label="Преподаватель"
            options={teachers.map((t) => ({ value: t.id, label: t.name }))}
            value={teacherId || ''}
            onChange={(v) => setTeacher(v || undefined)}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            label="Аудитория"
            options={classrooms.map((c) => ({ value: c.id, label: c.name }))}
            value={classroomId || ''}
            onChange={(v) => setClassroom(v || undefined)}
          />
        </div>

        {hasActiveFilters && (
          <div className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              icon={<FilterX size={16} />}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
