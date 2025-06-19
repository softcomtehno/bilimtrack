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
import { schedulesQueries } from "@/entities/schedules";

export const SchedulePage: React.FC = () => {
  const {
    teachers,
    groups,
    classrooms,
    subjects,
    addScheduleItem,
    updateScheduleItem,
    deleteScheduleItem,
    activeFilters,
    setActiveFilters,
    resetFilters,
  } = useAppStore();

  const {
    data: schedulesData,
    isError: schedulesError,
    isLoading: schedulesLoading,
  } = schedulesQueries.useGetSchedules();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<ScheduleItem | undefined>(undefined);
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

  // Синхронизация фильтров с хранилищем
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

  // Преобразование данных
  const transformedSchedule: ScheduleItem[] = (schedulesData || []).map(
    (item) => ({
      id: String(item.id),
      dayOfWeek: item.dayOfWeek,
      weekType: item.weekType === "weekly" ? "Обе" : item.weekType, // если нужно перевести
      groupIds: [String(item.group.id)],
      teacherId: String(item.teacher.id),
      classroomId: String(item.room.id),
      subjectId: String(item.subject.id),
      lessonTime: {
        id: item.lessonTime.id,
        startTime: item.lessonTime.startTime,
        endTime: item.lessonTime.endTime,
      },
      lessonType: item.lessonType?.name ?? "",

      // 👇 поля для отображения (в ScheduleCell)
      subjectName: item.subject.name,
      teacherName: item.teacher.fullName,
      groupNames: [item.group.name],
      classroomName: `${item.room.number} (${item.room.building})`,
    })
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

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteScheduleItem(itemToDelete);
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleFormSubmit = (data: ScheduleItem) => {
    if (editItem) {
      updateScheduleItem(data);
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

  if (schedulesLoading) {
    return <div className="text-center py-10 text-gray-500">Загрузка...</div>;
  }

  if (schedulesError) {
    return (
      <div className="text-center py-10 text-red-600">
        Ошибка при загрузке расписания
      </div>
    );
  }

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
        teachers={teachers}
        groups={groups}
        classrooms={classrooms}
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
            schedule={transformedSchedule}
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
        teachers={teachers}
        groups={groups}
        classrooms={classrooms}
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
            <AlertTriangle size={24} className="mr-2" />
            <p className="font-medium">
              Вы уверены, что хотите удалить это занятие?
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            Это действие нельзя будет отменить. Занятие будет удалено из
            расписания.
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Отмена
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Удалить
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
