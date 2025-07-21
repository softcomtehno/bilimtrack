import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  LessonType,
  WeekType,
  ScheduleItem,
  Teacher,
  Group,
  Classroom,
  Subject,
} from "@/shared/types";
import {
  DAYS_OF_WEEK,
  DEFAULT_TIME_SLOTS,
  checkScheduleConflicts,
} from "@/shared/lib/utils";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Dialog } from "../ui/Dialog";
import {
  useGetSubjects,
  useGetLessonTypes,
} from "@/entities/schedule/schedules/schedules.queries";

interface ScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleItem) => void;
  editItem?: ScheduleItem;
  teachers: Teacher[];
  groups: Group[];
  classrooms: Classroom[];
  subjects: Subject[];
  schedule: ScheduleItem[];
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editItem,
  teachers,
  groups,
  classrooms,
  subjects,
  schedule,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ScheduleItem>({
    defaultValues: editItem || {
      id: "",
      subjectId: "",
      subjectName: "",
      teacherId: "",
      teacherName: "",
      classroomId: "",
      classroomName: "",
      groupIds: [],
      groupNames: [],
      lessonType: "Лекция",
      day: DAYS_OF_WEEK[0],
      timeSlot: DEFAULT_TIME_SLOTS[0],
      weekType: "Обе",
    },
  });

  const [conflicts, setConflicts] = useState<string[]>([]);
  const availableSubjects: Subject[] = useGetSubjects()?.data || [];
  const availableLessonTypes: LessonType[] = useGetLessonTypes()?.data || [];
  const watchedValues = watch();

  // Универсальный useEffect для синхронизации связанных полей
  useEffect(() => {
    // Преподаватель
    const teacher = teachers.find((t) => t.id === watchedValues.teacherId);
    if (teacher) setValue("teacherName", teacher.name);
    // Предмет
    const subject = subjects.find((s) => s.id === watchedValues.subjectId);
    setValue("subjectName", subject ? subject.name : "");
    // Аудитория
    const classroom = classrooms.find(
      (c) => c.id === watchedValues.classroomId
    );
    if (classroom) setValue("classroomName", classroom.name);
    // Группы
    if (watchedValues.groupIds?.length) {
      setValue(
        "groupNames",
        groups
          .filter((g) => watchedValues.groupIds.includes(g.id))
          .map((g) => g.name)
      );
    } else {
      setValue("groupNames", []);
    }
  }, [
    watchedValues.teacherId,
    watchedValues.subjectId,
    watchedValues.classroomId,
    watchedValues.groupIds,
    teachers,
    subjects,
    classrooms,
    groups,
    setValue,
  ]);

  // Проверка конфликтов
  useEffect(() => {
    if (
      watchedValues.teacherId &&
      watchedValues.classroomId &&
      watchedValues.groupIds?.length &&
      watchedValues.day &&
      watchedValues.timeSlot &&
      watchedValues.weekType
    ) {
      const scheduleToCheck = editItem
        ? schedule.filter((item) => item.id !== editItem.id)
        : schedule;
      setConflicts(checkScheduleConflicts(scheduleToCheck, watchedValues));
    } else {
      setConflicts([]);
    }
  }, [
    watchedValues.teacherId,
    watchedValues.classroomId,
    watchedValues.groupIds,
    watchedValues.day,
    watchedValues.timeSlot,
    watchedValues.weekType,
    schedule,
    editItem,
  ]);

  // Сброс формы при открытии/закрытии или изменении редактируемого элемента
  useEffect(() => {
    if (isOpen) {
      reset(
        editItem || {
          id: "",
          subjectId: "",
          subjectName: "",
          teacherId: "",
          teacherName: "",
          classroomId: "",
          classroomName: "",
          groupIds: [],
          groupNames: [],
          lessonType: "Лекция",
          day: DAYS_OF_WEEK[0],
          timeSlot: DEFAULT_TIME_SLOTS[0],
          weekType: "Обе",
        }
      );
    }
  }, [isOpen, editItem, reset]);

  const onFormSubmit = (data: ScheduleItem) => {
    if (!data.id) data.id = crypto.randomUUID();
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={editItem ? "Редактировать занятие" : "Добавить занятие"}
      className="max-w-2xl"
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Controller
              name="teacherId"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  label="Преподаватель"
                  options={teachers.map((teacher) => ({
                    value: teacher.id,
                    label: teacher.name,
                  }))}
                  error={errors.teacherId?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="subjectId"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  label="Предмет"
                  options={availableSubjects.map((subject, idx) => ({
                    value: subject.id,
                    label: subject.name,
                    key: subject.id || String(idx),
                  }))}
                  error={errors.subjectId?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="lessonType"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  label="Тип занятия"
                  options={(availableLessonTypes as any[]).map((type, idx) =>
                    typeof type === "string"
                      ? { value: type, label: type, key: type }
                      : {
                          value: type.value || type.name || String(idx),
                          label: type.label || type.name || String(idx),
                          key: type.value || type.name || String(idx),
                        }
                  )}
                  error={errors.lessonType?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="classroomId"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  label="Аудитория"
                  options={classrooms.map((classroom) => ({
                    value: classroom.id,
                    label: `${classroom.name} (${classroom.type}, ${classroom.capacity} мест)`,
                  }))}
                  error={errors.classroomId?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className="col-span-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="group-checkbox-list"
            >
              Группы
            </label>
            <div
              className="grid grid-cols-3 gap-2 border border-gray-300 rounded-md p-3"
              id="group-checkbox-list"
            >
              {groups.map((group) => (
                <div key={group.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`group-${group.id}`}
                    value={group.id}
                    className="checkbox"
                    {...register("groupIds", {
                      required: "Выберите хотя бы одну группу",
                    })}
                  />
                  <label htmlFor={`group-${group.id}`} className="ml-2 text-sm">
                    {group.name} ({group.students} чел.)
                  </label>
                </div>
              ))}
            </div>
            {errors.groupIds && (
              <p className="mt-1 text-sm text-red-500">
                {errors.groupIds.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="day"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  label="День недели"
                  options={DAYS_OF_WEEK.map((day) => ({
                    value: day,
                    label: day,
                  }))}
                  error={errors.day?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="timeSlot"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  label="Время"
                  options={DEFAULT_TIME_SLOTS.map((slot) => ({
                    value: slot,
                    label: slot,
                  }))}
                  error={errors.timeSlot?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="weekType"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  label="Тип недели"
                  options={[
                    { value: "Числитель", label: "Числитель" },
                    { value: "Знаменатель", label: "Знаменатель" },
                    { value: "Обе", label: "Обе недели" },
                  ]}
                  error={errors.weekType?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div>
        {conflicts.length > 0 && (
          <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-md">
            <h4 className="text-warning-800 font-medium mb-2">
              Обнаружены конфликты:
            </h4>
            <ul className="text-sm text-warning-700 list-disc pl-5 space-y-1">
              {conflicts.map((conflict, index) => (
                <li key={index}>{conflict}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" disabled={conflicts.length > 0}>
            {editItem ? "Сохранить" : "Добавить"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
