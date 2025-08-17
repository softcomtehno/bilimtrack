import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus, Calendar, AlertTriangle, Filter } from 'lucide-react';
import { WeekType, ScheduleItem } from '@/shared/types';
import {
  Button,
  Card,
  Dialog,
  ScheduleExport,
  ScheduleFilters,
  ScheduleForm,
  ScheduleGrid,
} from '@/shared/ui/schedule';
import { useAppStore } from '@/app/store';
import {
  schedulesQueries,
  schedulesTeachersQueries,
  schedulesGroupsQueries,
  schedulesRoomsQueryes,
} from '@/entities/schedule';
import { DAYS_OF_WEEK } from '@/shared/lib/utils';
import type { Teachers } from '@/entities/schedule/teachers/teachers.types';
import type { Teacher } from '@/shared/types';
import type { Groups as ApiGroup } from '@/entities/schedule/groups/groups.types';
import type { Group } from '@/shared/types';
import type { Rooms } from '@/entities/schedule/rooms/rooms.types';
import type { Classroom } from '@/shared/types';
import {
  usePatchScheduleMutation,
  useDeleteScheduleMutation,
  useGetLessonTimes,
  useGetLessonTypes,
  useAddScheduleMutation,
  useGetCourses,
} from '@/entities/schedule/schedules/schedules.queries';
import { toast } from 'react-toastify';

export const SchedulePage: React.FC = () => {
  const {
    teachers,
    groups,
    classrooms,
    subjects,
    addScheduleItem,
    activeFilters,
    setActiveFilters,
    resetFilters,
  } = useAppStore();

  const {
    data: schedulesData,
    isError: schedulesError,
    isLoading: schedulesLoading,
    refetch: refetchSchedules,
  } = schedulesQueries.useGetSchedules();
  const { data: schedulesTeachers, isLoading: teachersLoading } =
    schedulesTeachersQueries.useGetSchedulesTeachers();
  const { data: schedulesGroups, isLoading: groupsLoading } =
    schedulesGroupsQueries.useGetSchedulesGroups();
  const { data: schedulesRooms, isLoading: classroomsLoading } =
    schedulesRoomsQueryes.useGetSchedulesRooms();
  const { data: lessonTimes } = useGetLessonTimes();
  const { data: lessonTypes } = useGetLessonTypes();
  const { data: courses, isLoading: coursesLoading } = useGetCourses();

  const patchScheduleMutation = usePatchScheduleMutation();
  const addScheduleMutation = useAddScheduleMutation();
  const deleteScheduleMutation = useDeleteScheduleMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<ScheduleItem | undefined>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [weekType, setWeekType] = useState<WeekType | 'Обе'>(
    activeFilters.weekType || 'Обе'
  );
  const [selectedTeacherId, setSelectedTeacherId] = useState<
    string | undefined
  >(activeFilters.teacherId);
  const [selectedGroupId, setSelectedGroupId] = useState<string | undefined>(
    activeFilters.groupId
  );
  const [selectedClassroomId, setSelectedClassroomId] = useState<
    string | undefined
  >(activeFilters.classroomId);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    activeFilters.courseId || (courses?.[0]?.id ? String(courses[0].id) : '')
  );

  const getDefaultCourseId = useCallback(() => {
    return courses?.[0]?.id ? String(courses[0].id) : '';
  }, [courses]);

  // При загрузке курсов
  useEffect(() => {
    if (courses?.length && !selectedCourseId) {
      setSelectedCourseId(getDefaultCourseId());
    }
  }, [courses, selectedCourseId, getDefaultCourseId]);

  // Load saved filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('scheduleFilters');
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters);
        setWeekType(parsed.weekType || 'Обе');
        setSelectedTeacherId(parsed.teacherId);
        setSelectedGroupId(parsed.groupId);
        setSelectedClassroomId(parsed.classroomId);
        setSelectedCourseId(parsed.courseId || getDefaultCourseId());
      } catch (e) {
        console.error('Ошибка при чтении фильтров из localStorage', e);
      }
    }
  }, [getDefaultCourseId]);

  // Save filters to localStorage
  useEffect(() => {
    const filters = {
      weekType,
      teacherId: selectedTeacherId,
      groupId: selectedGroupId,
      classroomId: selectedClassroomId,
      courseId: selectedCourseId,
    };

    try {
      localStorage.setItem('scheduleFilters', JSON.stringify(filters));
    } catch (e) {
      console.error('Ошибка при сохранении фильтров', e);
    }

    setActiveFilters({
      weekType: weekType !== 'Обе' ? (weekType as WeekType) : undefined,
      teacherId: selectedTeacherId,
      groupId: selectedGroupId,
      classroomId: selectedClassroomId,
      courseId: selectedCourseId,
    });
  }, [
    weekType,
    selectedTeacherId,
    selectedGroupId,
    selectedClassroomId,
    selectedCourseId,
    setActiveFilters,
  ]);

  const apiGroups: Group[] = useMemo(() => {
    return (
      (schedulesGroups as ApiGroup[] | undefined)?.map((g) => ({
        id: String(g.id),
        name: g.name,
        students: 0,
        subjects: [],
        course: g.course,
      })) || []
    );
  }, [schedulesGroups]);

  const filteredGroups = useMemo(() => {
    if (!selectedCourseId) return apiGroups;
    return apiGroups.filter(
      (group) => group.course?.id?.toString() === selectedCourseId
    );
  }, [apiGroups, selectedCourseId]);

  const apiClassrooms: Classroom[] = useMemo(() => {
    return (
      (schedulesRooms as Rooms[] | undefined)?.map((r) => ({
        id: String(r.id),
        name: `${r.number} (${r.building})`,
        type: 'Стандартная',
        capacity: 0,
        features: [],
      })) || []
    );
  }, [schedulesRooms]);

  const apiTeachers: Teacher[] = useMemo(() => {
    return (
      (schedulesTeachers as Teachers[] | undefined)?.map((t) => ({
        id: String(t.id),
        name: t.fullName,
        subjects: [],
        availability: [],
        preferences: [],
      })) || []
    );
  }, [schedulesTeachers]);

  const mapWeekType = (apiType: string): WeekType => {
    return apiType === 'weekly'
      ? 'Обе'
      : apiType === 'top'
        ? 'Числитель'
        : apiType === 'bottom'
          ? 'Знаменатель'
          : (apiType as WeekType);
  };

  const transformedSchedule: ScheduleItem[] = useMemo(() => {
    if (!schedulesData) return [];

    return schedulesData.map((item: any) => {
      const timeSlot =
        item.lessonTime?.startTime && item.lessonTime?.endTime
          ? `${item.lessonTime.startTime} - ${item.lessonTime.endTime}`
          : '';

      const groupIds = Array.isArray(item.groups)
        ? item.groups.map((g: any) => String(g.id))
        : item.group
          ? [String(item.group.id)]
          : [];

      const groupNames = Array.isArray(item.groups)
        ? item.groups.map((g: any) => g.name)
        : item.group
          ? [item.group.name]
          : [];

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
      };
    });
  }, [schedulesData]);

  const weekTypeOrder = { Числитель: 0, Знаменатель: 1, Обе: 2 };
  const filteredSchedule = useMemo(() => {
    return transformedSchedule
      .filter((item) => {
        const weekTypeMatch = weekType === 'Обе' || item.weekType === weekType;
        const teacherMatch =
          !selectedTeacherId ||
          String(item.teacherId) === String(selectedTeacherId);
        const groupMatch =
          !selectedGroupId || item.groupIds.includes(selectedGroupId);
        const classroomMatch =
          !selectedClassroomId ||
          String(item.classroomId) === String(selectedClassroomId);
        const courseMatch =
          !selectedCourseId ||
          item.groupIds.some((groupId) => {
            const group = schedulesGroups?.find(
              (g) => String(g.id) === groupId
            );
            return group?.course?.id?.toString() === selectedCourseId;
          });

        return (
          weekTypeMatch &&
          teacherMatch &&
          groupMatch &&
          classroomMatch &&
          courseMatch
        );
      })
      .sort(
        (a, b) =>
          (weekTypeOrder[a.weekType] ?? 99) - (weekTypeOrder[b.weekType] ?? 99)
      );
  }, [
    transformedSchedule,
    weekType,
    selectedTeacherId,
    selectedGroupId,
    selectedClassroomId,
    selectedCourseId,
    schedulesGroups,
  ]);

  const handleAddItem = () => {
    setEditItem(undefined);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: ScheduleItem) => {
    setEditItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteScheduleMutation.mutateAsync(itemToDelete);
      await refetchSchedules();
      toast.success('Занятие успешно удалено!');
    } catch (error) {
      toast.error('Не удалось удалить занятие');
    } finally {
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const weekTypeToApi = (weekType: string) => {
    return weekType === 'Числитель'
      ? 'top'
      : weekType === 'Знаменатель'
        ? 'bottom'
        : 'weekly';
  };

  const handleFormSubmit = async (data: ScheduleItem) => {
    if (!lessonTimes || !lessonTypes) {
      return toast.error('Не загружены данные для формы. Повторите позже.');
    }

    const lessonTimeId = lessonTimes.find(
      (time: any) => `${time.startTime} - ${time.endTime}` === data.timeSlot
    )?.id;

    const lessonTypeId = lessonTypes.find(
      (type: any) =>
        type.name === data.lessonType || type.label === data.lessonType
    )?.id;

    try {
      if (editItem) {
        const patchData = {
          id: Number(data.id),
          groups: data.groupIds.filter(Boolean).map(Number),
          subject: Number(data.subjectId),
          teacher: Number(data.teacherId),
          room: Number(data.classroomId),
          lessonType: lessonTypeId,
          lessonTime: lessonTimeId,
          dayOfWeek: DAYS_OF_WEEK.indexOf(data.day),
          weekType: weekTypeToApi(data.weekType),
        };
        await patchScheduleMutation.mutateAsync({
          id: patchData.id,
          data: patchData,
        });
        toast.success('Занятие успешно изменено!');
      } else {
        const postData = {
          groups: data.groupIds.filter(Boolean).map(Number),
          subject: Number(data.subjectId),
          teacher: Number(data.teacherId),
          room: Number(data.classroomId),
          lessonType: lessonTypeId,
          lessonTime: lessonTimeId,
          dayOfWeek: DAYS_OF_WEEK.indexOf(data.day),
          weekType: weekTypeToApi(data.weekType),
        };
        await addScheduleMutation.mutateAsync(postData);
        toast.success('Занятие успешно добавлено!');
      }
      await refetchSchedules();
      setIsFormOpen(false);
      setEditItem(undefined);
    } catch (error) {
      toast.error('Произошла ошибка при сохранении');
    }
  };

  const handleResetFilters = () => {
    setWeekType('Обе');
    setSelectedTeacherId(undefined);
    setSelectedGroupId(undefined);
    setSelectedClassroomId(undefined);
    setSelectedCourseId(getDefaultCourseId());
    resetFilters();

    try {
      localStorage.removeItem('scheduleFilters');
    } catch (e) {
      console.error('Ошибка при очистке фильтров', e);
    }
  };

  if (schedulesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center py-10 text-gray-500">Загрузка...</div>
      </div>
    );
  }

  if (schedulesError) {
    return (
      <Card className="text-center py-10">
        <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
        <h2 className="text-xl font-semibold mb-2 text-red-600">
          Ошибка при загрузке расписания
        </h2>
        <p className="text-gray-600 mb-4">
          Не удалось загрузить данные расписания. Пожалуйста, попробуйте позже.
        </p>
        <Button onClick={refetchSchedules} variant="outline">
          Попробовать снова
        </Button>
      </Card>
    );
  }

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
          <Button onClick={handleAddItem} icon={<Plus size={16} />}>
            Добавить занятие
          </Button>
        </div>
      </div>

      <ScheduleFilters
        weekType={weekType}
        setWeekType={setWeekType}
        teachers={apiTeachers}
        groups={apiGroups}
        filteredGroups={filteredGroups}
        classrooms={apiClassrooms}
        selectedTeacherId={selectedTeacherId}
        selectedGroupId={selectedGroupId}
        selectedClassroomId={selectedClassroomId}
        selectedCourseId={selectedCourseId}
        setSelectedTeacherId={setSelectedTeacherId}
        setSelectedGroupId={setSelectedGroupId}
        setSelectedClassroomId={setSelectedClassroomId}
        setSelectedCourseId={setSelectedCourseId}
        courses={courses ?? []}
        resetFilters={handleResetFilters}
        teachersLoading={teachersLoading}
        groupsLoading={groupsLoading}
        classroomsLoading={classroomsLoading}
        coursesLoading={coursesLoading}
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
                Добавьте занятия вручную или с помощью автоматического
                генератора.
              </p>
            </>
          ) : (
            <>
              <Filter size={48} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">Ничего не найдено</h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Попробуйте изменить параметры фильтрации.
              </p>
            </>
          )}
          <Button onClick={handleAddItem} icon={<Plus size={16} />}>
            Добавить занятие
          </Button>
        </Card>
      ) : (
        <Card>
          <ScheduleGrid
            schedule={filteredSchedule}
            weekType={weekType}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            filteredGroupId={selectedGroupId}
            filteredTeacherId={selectedTeacherId}
            filteredClassroomId={selectedClassroomId}
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
      />

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Подтверждение удаления"
      >
        <div className="mb-6">
          <div className="flex items-center text-warning-600 mb-3">
            <AlertTriangle color="red" size={24} className="mr-2" />
            <p className="font-medium text-red-500">
              Вы уверены, что хотите удалить это занятие?
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            Это действие нельзя будет отменить. Занятие будет удалено из
            расписания.
          </p>
        </div>
        <div className="flex justify-center space-x-3">
          <Button
            className="border bg-red-500 text-white hover:bg-red-600"
            onClick={confirmDelete}
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
  );
};
