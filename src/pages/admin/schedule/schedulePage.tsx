import React, { useState, useMemo, useCallback } from 'react'
import { Plus, Calendar, AlertTriangle, Filter } from 'lucide-react'
import {
  Button,
  Card,
  Dialog,
  ScheduleExport,
  ScheduleFilters,
  ScheduleForm,
  ScheduleGrid,
} from '@/shared/ui/schedule'
import { useAppStore } from '@/app/store'
import {
  schedulesQueries,
  schedulesTeachersQueries,
  schedulesGroupsQueries,
  schedulesRoomsQueryes,
  useScheduleFilters,
  useFilteredSchedule,
} from '@/entities/schedule'
import { DAYS_OF_WEEK } from '@/shared/lib/utils'
import {
  usePatchScheduleMutation,
  useDeleteScheduleMutation,
  useGetLessonTimes,
  useGetLessonTypes,
  useAddScheduleMutation,
  useGetCourses,
} from '@/entities/schedule/schedules/schedules.queries'
import { toast } from 'react-toastify'
import type {
  Teacher,
  Classroom,
  Group,
  ScheduleItem,
  WeekType,
} from '@/shared/types'

export const SchedulePage: React.FC = () => {
  const { teachers, groups, classrooms, subjects, addScheduleItem } =
    useAppStore()

  // API data
  const {
    data: schedulesData,
    isLoading,
    isError,
    refetch,
  } = schedulesQueries.useGetSchedules()
  const { data: schedulesTeachers } =
    schedulesTeachersQueries.useGetSchedulesTeachers()
  const { data: schedulesGroups } =
    schedulesGroupsQueries.useGetSchedulesGroups();
  const { data: schedulesRooms } = schedulesRoomsQueryes.useGetSchedulesRooms();
  const { data: lessonTimes } = useGetLessonTimes();
  const { data: lessonTypes } = useGetLessonTypes();
  const { data: courses } = useGetCourses();
  const { data: eduLevelsData } = schedulesQueries.useGetEducationLevels();

  const patchScheduleMutation = usePatchState<string | null>(null);
  const [selectedEduLevelId, setSelectedEduLevelId] = React.useState<
    string | undefined
  >(undefined);

  const getDefaultCoucheduleMutation();
  const addScheduleMutation = useAddScheduleMutation();
  const deleteScheduleMutation = useDeleteScheduleMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<ScheduleItem | undefined>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useSrseId = useCallback(
    () => courses?.[0]?.id?.toString() || "",
    [courses]
  );

  const [weekType, setWeekType] = useState<WeekType | "Обе">(
    activeFilters.weekType || "Обе"
  );
  const [selectedTeacherId, setSelectedTeacherId] = useState<
    string | undefined
  >(eduLevelId)

  // Transform API data
  const apiGroups: Group[] = useMemo(
    () =>
      schedulesGroups?.map((g) => ({
        id: String(g.id),
        name: g.name,
        students: 0,
        subjects: [],
        course: g.course,
      })) || [],
    [schedulesGroups]
  )

  const filteredGroups: Group[] = useMemo(() => {
    return courseId
      ? apiGroups.filter((g) => String(g.course?.id) === courseId)
      : apiGroups
  }, [apiGroups, courseId])

  const apiClassrooms: Classroom[] = useMemo(
    () =>
      schedulesRooms?.map((r) => ({
        id: String(r.id),
        name: `${r.number} (${r.building})`,
        type: 'Стандартная',
        capacity: 0,
        features: [],
      })) || [],
    [schedulesRooms]
  )

  const apiTeachers: Teacher[] = useMemo(
    () =>
      schedulesTeachers?.map((t) => ({
        id: String(t.id),
        name: t.fullName,
        subjects: [],
        availability: [],
        preferences: [],
      })) || [],
    [schedulesTeachers]
  )

  const mapWeekType = useCallback(
    (type: string): WeekType =>
      type === 'weekly'
        ? 'Обе'
        : type === 'top'
          ? 'Числитель'
          : type === 'bottom'
            ? 'Знаменатель'
            : (type as WeekType),
    []
  )

  const transformedSchedule: ScheduleItem[] = useMemo(
    () =>
      schedulesData?.map((item: any) => {
        const timeSlot = item.lessonTime
          ? `${item.lessonTime.startTime} - ${item.lessonTime.endTime}`
          : ''
        const groupIds = Array.isArray(item.groups)
          ? item.groups.map((g: any) => String(g.id))
          : item.group
            ? [String(item.group.id)]
            : []
        const groupNames = Array.isArray(item.groups)
          ? item.groups.map((g: any) => g.name)
          : item.group
            ? [item.group.name]
            : []
        return {
          id: String(item.id),
          day: DAYS_OF_WEEK[item.dayOfWeek] || DAYS_OF_WEEK[0],
          timeSlot,
          weekType: mapWeekType(item.weekType),
          groupIds,
          teacherId: String(item.teacher?.id || ''),
          classroomId: String(item.room?.id || ''),
          subjectId: String(item.subject?.id || ''),
          lessonType: item.lessonType?.name || '',
          subjectName: item.subject?.name || '',
          teacherName: item.teacher?.fullName || '',
          groupNames,
          classroomName: item.room
            ? `${item.room.number} (${item.room.building})`
            : '',
        }
      }) || [],
    [schedulesData, mapWeekType]
  )
  console.log(transformedSchedule)

  // Filtered schedule using Zustand filters
  const filteredSchedule = useFilteredSchedule(
    transformedSchedule,
    schedulesGroups
  )
  console.log(filteredSchedule)

  // Helpers
  const weekTypeOrder = { Числитель: 0, Знаменатель: 1, Обе: 2 }

  const weekTypeToApi = useCallback(
    (week: string) =>
      week === 'Числитель'
        ? 'top'
        : week === 'Знаменатель'
          ? 'bottom'
          : 'weekly',
    []
  )

  const handleFormSubmit = async (
    data: ScheduleItem & { courseId?: string; educationLevelId?: string }
  ) => {
    if (!lessonTimes || !lessonTypes)
      return toast.error('Данные формы не загружены')

    const lessonTimeId = lessonTimes.find(
      (t) => `${t.startTime} - ${t.endTime}` === data.timeSlot
    )?.id
    const lessonTypeId = lessonTypes.find(
      (t) => t.name === data.lessonType || t.label === data.lessonType
    )?.id

    try {
      const payload: any = {
        groups: data.groupIds.filter(Boolean).map(Number),
        subject: Number(data.subjectId),
        teacher: Number(data.teacherId),
        room: Number(data.classroomId),
        lessonType: lessonTypeId,
        lessonTime: lessonTimeId,
        dayOfWeek: DAYS_OF_WEEK.indexOf(data.day),
        weekType: weekTypeToApi(data.weekType),
      }

      if (data.educationLevelId)
        payload.educationLevel = Number(data.educationLevelId)
      if (data.courseId) payload.course = Number(data.courseId)

      if (editItem)
        await patchScheduleMutation.mutateAsync({
          id: Number(data.id),
          data: payload,
        })
      else await addScheduleMutation.mutateAsync(payload)

      toast.success(`Занятие успешно ${editItem ? 'изменено' : 'добавлено'}!`)
      refetch()
      setIsFormOpen(false)
      setEditItem(undefined)
    } catch {
      toast.error('Ошибка при сохранении занятия')
    }
  }

  const handleDelete = async () => {
    if (!itemToDelete) return
    try {
      await deleteScheduleMutation.mutateAsync(itemToDelete)
      refetch()
      toast.success('Занятие успешно удалено!')
    } catch {
      toast.error('Не удалось удалить занятие')
    } finally {
      setIsDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  const handleResetFilters = () => {
    reset()
    setSelectedEduLevelId(undefined)
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Загрузка...
      </div>
    )
  if (isError)
    return (
      <Card className="text-center py-10">
        <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
        <h2 className="text-xl font-semibold mb-2 text-red-600">
          Ошибка при загрузке расписания
        </h2>
        <p className="text-gray-600 mb-4">
          Не удалось загрузить данные. Попробуйте позже.
        </p>
        <Button onClick={refetch} variant="outline">
          Попробовать снова
        </Button>
      </Card>
    )

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Расписание занятий</h1>
          <p className="text-gray-600">
            Просмотр и редактирование текущего расписания занятий
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ScheduleExport schedule={transformedSchedule} />
          <Button
            onClick={() => {
              setEditItem(undefined)
              setIsFormOpen(true)
            }}
            icon={<Plus size={16} />}
          >
            Добавить занятие
          </Button>
        </div>
      </div>

      <ScheduleFilters
        eduLevelsData={eduLevelsData}
        selectedEduLevelId={selectedEduLevelId}
        setSelectedEduLevelId={(v) => {
          setSelectedEduLevelId(v)
          setEduLevel(v)
        }}
        weekType={weekType}
        setWeekType={setWeekType}
        teachers={apiTeachers}
        groups={apiGroups}
        filteredGroups={filteredGroups}
        classrooms={apiClassrooms}
        selectedTeacherId={teacherId}
        selectedGroupId={groupId}
        selectedClassroomId={classroomId}
        selectedCourseId={courseId || ''}
        setSelectedTeacherId={setTeacher}
        setSelectedGroupId={setGroup}
        setSelectedClassroomId={setClassroom}
        setSelectedCourseId={setCourse}
        courses={courses ?? []}
        resetFilters={handleResetFilters}
      />

      {filteredSchedule.length === 0 ? (
        <Card className="text-center py-12">
          {transformedSchedule.length === 0 ? (
            <>
              <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">
                Расписание пока пусто
              </h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Добавьте занятия вручную или с помощью генератора.
              </p>
            </>
          ) : (
            <>
              <Filter size={48} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">Ничего не найдено</h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Попробуйте изменить фильтры.
              </p>
            </>
          )}
          <Button
            onClick={() => {
              setEditItem(undefined)
              setIsFormOpen(true)
            }}
            icon={<Plus size={16} />}
          >
            Добавить занятие
          </Button>
        </Card>
      ) : (
        <Card>
          <ScheduleGrid
            schedule={filteredSchedule}
            weekType={weekType}
            onEditItem={(item) => {
              setEditItem(item)
              setIsFormOpen(true)
            }}
            onDeleteItem={setItemToDelete as any}
            filteredGroupId={groupId}
            filteredTeacherId={teacherId}
            filteredClassroomId={classroomId}
          />
        </Card>
      )}

      <ScheduleForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editItem={editItem}
        teachers={apiTeachers}
        groups={apiGroups}
        classrooms={apiClassrooms}
        subjects={subjects}
        schedule={transformedSchedule}
        courses={courses ?? []}
        eduLevelsData={eduLevelsData}
      />

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Подтверждение удаления"
      >
        <div className="mb-6 flex items-center text-warning-600 gap-2">
          <AlertTriangle color="red" size={24} />
          <p className="font-medium text-red-500">
            Вы уверены, что хотите удалить это занятие?
          </p>
        </div>
        <p className="text-gray-600 text-sm mb-6">
          Это действие нельзя будет отменить.
        </p>
        <div className="flex justify-center space-x-3">
          <Button
            className="border bg-red-500 text-white hover:bg-red-600"
            onClick={handleDelete}
          >
            Удалить
          </Button>
          <Button
            className="border bg-gray-500 text-white hover:bg-gray-600"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Отмена
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
