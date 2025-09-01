// hooks/useFilteredSchedule.ts
import { ScheduleItem } from '@/shared/types'
import { useScheduleFilters } from '../store/useScheduleFilters'
// import { useScheduleFilters } from '@/store/useScheduleFilters'

export const useFilteredSchedule = (
  schedule: ScheduleItem[],
  schedulesGroups?: any[]
) => {
  const { weekType, teacherId, groupId, classroomId, courseId } =
    useScheduleFilters()

  return schedule.filter((item) => {
    const weekMatch = weekType === 'Обе' || item.weekType === weekType
    const teacherMatch = !teacherId || item.teacherId === teacherId
    const groupMatch = !groupId || item.groupIds.includes(groupId)
    const classroomMatch = !classroomId || item.classroomId === classroomId
    const courseMatch =
      !courseId ||
      item.groupIds.some((id) =>
        schedulesGroups?.some(
          (g) => String(g.id) === id && g.course?.id?.toString() === courseId
        )
      )

    return (
      weekMatch && teacherMatch && groupMatch && classroomMatch && courseMatch
    )
  })
}
