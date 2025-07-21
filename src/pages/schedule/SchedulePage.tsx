import React, { useState, useEffect } from "react";
import { Plus, Calendar, AlertTriangle } from "lucide-react";
import { WeekType, ScheduleItem } from "@/shared/types";
import {
  Button,
  Card,
  Dialog,
  ScheduleExport,
  ScheduleFilters,
  ScheduleForm,
  ScheduleGrid,
} from "@/shared/ui/schedule";
import { useAppStore } from "@/app/store";
import {
  schedulesQueries,
  schedulesTeachersQueries,
  schedulesGroupsQueries,
  schedulesRoomsQueryes,
} from "@/entities/schedule";
import { DAYS_OF_WEEK } from "@/shared/lib/utils";
import type { Teachers } from "@/entities/schedule/teachers/teachers.types";
import type { Teacher } from "@/shared/types";
import type { Groups as ApiGroup } from "@/entities/schedule/groups/groups.types";
import type { Group } from "@/shared/types";
import type { Rooms } from "@/entities/schedule/rooms/rooms.types";
import type { Classroom } from "@/shared/types";
import {
  usePatchScheduleMutation,
  useDeleteScheduleMutation,
  useGetLessonTimes,
  useGetLessonTypes,
} from "@/entities/schedule/schedules/schedules.queries";
import { toast } from "react-toastify";

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
  const { data: shedulesTeachers } =
    schedulesTeachersQueries.useGetSchedulesTeachers();
  const { data: schedulesGroups } =
    schedulesGroupsQueries.useGetSchedulesGroups();
  const { data: schedulesRooms } = schedulesRoomsQueryes.useGetSchedulesRooms();
  const { data: lessonTimes } = useGetLessonTimes();
  const { data: lessonTypes } = useGetLessonTypes();
  const patchScheduleMutation = usePatchScheduleMutation();
  const deleteScheduleMutation = useDeleteScheduleMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<ScheduleItem | undefined>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [weekType, setWeekType] = useState<WeekType | "Обе">(
    activeFilters.weekType || "Обе"
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

  // Преобразование API-данных
  const apiGroups: Group[] =
    (schedulesGroups as ApiGroup[] | undefined)?.map((g) => ({
      id: String(g.id),
      name: g.name,
      students: 0,
      subjects: [],
    })) || [];
  const apiClassrooms: Classroom[] =
    (schedulesRooms as Rooms[] | undefined)?.map((r) => ({
      id: String(r.id),
      name: `${r.number} (${r.building})`,
      type: "Стандартная",
      capacity: 0,
      features: [],
    })) || [];
  const apiTeachers: Teacher[] =
    (shedulesTeachers as Teachers[] | undefined)?.map((t) => ({
      id: String(t.id),
      name: t.fullName,
      subjects: [],
      availability: [],
      preferences: [],
    })) || [];

  // Синхронизация фильтров
  useEffect(() => {
    setActiveFilters({
      weekType: weekType !== "Обе" ? (weekType as WeekType) : undefined,
      teacherId: selectedTeacherId,
      groupId: selectedGroupId,
      classroomId: selectedClassroomId,
    });
  }, [
    weekType,
    selectedTeacherId,
    selectedGroupId,
    selectedClassroomId,
    setActiveFilters,
  ]);

  useEffect(() => {
    if (!selectedGroupId && apiGroups.length > 0)
      setSelectedGroupId(apiGroups[0].id);
  }, [selectedGroupId, apiGroups]);

  // Преобразование данных расписания
  const mapWeekType = (apiType: string): WeekType =>
    apiType === "weekly"
      ? "Обе"
      : apiType === "top"
        ? "Числитель"
        : apiType === "bottom"
          ? "Знаменатель"
          : (apiType as WeekType);
  const transformedSchedule: ScheduleItem[] = (schedulesData || []).map(
    (item: any) => {
      const timeSlot =
        item.lessonTime?.startTime && item.lessonTime?.endTime
          ? `${item.lessonTime.startTime} - ${item.lessonTime.endTime}`
          : "";
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
        day: DAYS_OF_WEEK[item.dayOfWeek],
        timeSlot,
        weekType: mapWeekType(item.weekType),
        groupIds,
        teacherId: String(item.teacher.id),
        classroomId: String(item.room.id),
        subjectId: String(item.subject.id),
        lessonType: item.lessonType?.name ?? "",
        subjectName: item.subject.name,
        teacherName: item.teacher.fullName,
        groupNames,
        classroomName: `${item.room.number} (${item.room.building})`,
      };
    }
  );

  // Фильтрация и сортировка расписания
  const weekTypeOrder = { Числитель: 0, Знаменатель: 1, Обе: 2 };
  const filteredSchedule = transformedSchedule
    .filter(
      (item) =>
        (weekType === "Обе" || item.weekType === weekType) &&
        (!selectedTeacherId ||
          String(item.teacherId) === String(selectedTeacherId)) &&
        (!selectedGroupId || item.groupIds.includes(selectedGroupId)) &&
        (!selectedClassroomId ||
          String(item.classroomId) === String(selectedClassroomId))
    )
    .sort(
      (a, b) =>
        (weekTypeOrder[a.weekType] ?? 99) - (weekTypeOrder[b.weekType] ?? 99)
    );

  // Обработчики
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
    await deleteScheduleMutation.mutateAsync(itemToDelete);
    await refetchSchedules();
    toast.success("Занятие успешно удалено!");
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };
  const weekTypeToApi = (weekType: string) =>
    weekType === "Числитель"
      ? "top"
      : weekType === "Знаменатель"
        ? "bottom"
        : weekType === "Обе"
          ? "weekly"
          : weekType;
  const handleFormSubmit = async (data: ScheduleItem) => {
    if (editItem) {
      if (!lessonTimes)
        return toast.error(
          "Данные о времени занятий ещё не загружены. Попробуйте позже."
        );
      if (!lessonTypes)
        return toast.error(
          "Данные о типах занятий ещё не загружены. Попробуйте позже."
        );
      const lessonTimeId = lessonTimes.find(
        (time: any) => `${time.startTime} - ${time.endTime}` === data.timeSlot
      )?.id;
      const lessonTypeId = lessonTypes.find(
        (type: any) =>
          type.name === data.lessonType || type.label === data.lessonType
      )?.id;
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
      await refetchSchedules();
      toast.success("Занятие успешно изменено!");
    } else {
      addScheduleItem(data);
    }
    setIsFormOpen(false);
    setEditItem(undefined);
  };
  const handleResetFilters = () => {
    setWeekType("Обе");
    setSelectedTeacherId(undefined);
    setSelectedGroupId(undefined);
    setSelectedClassroomId(undefined);
    resetFilters();
  };

  if (schedulesLoading)
    return <div className="text-center py-10 text-gray-500">Загрузка...</div>;
  if (schedulesError)
    return (
      <div className="text-center py-10 text-red-600">
        Ошибка при загрузке расписания
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Расписание занятий</h1>
          <p className="text-gray-600">
            Просмотр и редактирование текущего расписания занятий
          </p>
        </div>
        <div className="flex space-x-3">
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
        classrooms={apiClassrooms}
        selectedTeacherId={selectedTeacherId}
        selectedGroupId={selectedGroupId}
        selectedClassroomId={selectedClassroomId}
        setSelectedTeacherId={setSelectedTeacherId}
        setSelectedGroupId={setSelectedGroupId}
        setSelectedClassroomId={setSelectedClassroomId}
        resetFilters={handleResetFilters}
      />
      {transformedSchedule.length === 0 ? (
        <Card className="text-center py-12">
          <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">Расписание пока пусто</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Добавьте занятия вручную или с помощью автоматического генератора.
          </p>
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
            className="hover:text-black hover:bg-transparent border bg-red-500 text-white"
            onClick={confirmDelete}
          >
            Удалить
          </Button>
          <Button
            className="hover:text-black hover:bg-transparent border bg-gray-500 text-white"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Отмена
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
