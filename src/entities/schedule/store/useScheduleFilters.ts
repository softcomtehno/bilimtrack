// store/useScheduleFilters.ts
import { create } from 'zustand'
import { WeekType } from '@/shared/types'

interface ScheduleFilterState {
  eduLevelId?: string
  courseId?: string
  groupId?: string
  teacherId?: string
  classroomId?: string
  weekType: WeekType | 'Обе'

  setEduLevel: (id?: string) => void
  setCourse: (id?: string) => void
  setGroup: (id?: string) => void
  setTeacher: (id?: string) => void
  setClassroom: (id?: string) => void
  setWeekType: (week: WeekType | 'Обе') => void
  reset: () => void
}

export const useScheduleFilters = create<ScheduleFilterState>((set) => ({
  eduLevelId: undefined,
  courseId: undefined,
  groupId: undefined,
  teacherId: undefined,
  classroomId: undefined,
  weekType: 'Обе',

  setEduLevel: (id) =>
    set(() => ({
      eduLevelId: id,
      courseId: undefined,
      groupId: undefined,
    })),
  setCourse: (id) => set(() => ({ courseId: id, groupId: undefined })),
  setGroup: (id) => set(() => ({ groupId: id })),
  setTeacher: (id) => set(() => ({ teacherId: id })),
  setClassroom: (id) => set(() => ({ classroomId: id })),
  setWeekType: (week) => set(() => ({ weekType: week })),
  reset: () =>
    set({
      eduLevelId: undefined,
      courseId: undefined,
      groupId: undefined,
      teacherId: undefined,
      classroomId: undefined,
      weekType: 'Обе',
    }),
}))
