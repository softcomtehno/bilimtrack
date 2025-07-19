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
  useGetLessonTimes,
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
  // Используем данные с API
  const availableSubjects: Subject[] = useGetSubjects()?.data || [];
  const availableLessonTypes: { id: number; name: string }[] =
    useGetLessonTypes()?.data || [];
  const availableLessonTimes: {
    id: number;
    startTime: string;
    endTime: string;
  }[] = useGetLessonTimes()?.data || [];
  const watchedValues = watch();

  // Обработка изменения преподавателя
  useEffect(() => {
    if (watchedValues.teacherId) {
      const teacher = teachers.find((t) => t.id === watchedValues.teacherId);
      if (teacher) {
        setValue("teacherName", teacher.name);

        // Сбрасываем выбранный предмет, если он недоступен для преподавателя
        if (
          watchedValues.subjectId &&
          !teacher.subjects.includes(watchedValues.subjectId)
        ) {
          setValue("subjectId", "");
          setValue("subjectName", "");
        }
      }
    }
  }, [watchedValues.teacherId, teachers, subjects, setValue]);

  // Обработка изменения предмета
  useEffect(() => {
    if (watchedValues.subjectId) {
      const subject = subjects.find((s) => s.id === watchedValues.subjectId);
      if (subject) {
        setValue("subjectName", subject.name);
      } else {
        setValue("subjectName", "");
      }
    } else {
      setValue("subjectName", "");
    }
  }, [watchedValues.subjectId, subjects, setValue]);

  // Обработка изменения аудитории
  useEffect(() => {
    if (watchedValues.classroomId) {
      const classroom = classrooms.find(
        (c) => c.id === watchedValues.classroomId
      );
      if (classroom) {
        setValue("classroomName", classroom.name);
      }
    }
  }, [watchedValues.classroomId, classrooms, setValue]);

  // Обработка изменения групп
  useEffect(() => {
    if (watchedValues.groupIds && watchedValues.groupIds.length > 0) {
      const selectedGroups = groups.filter((g) =>
        watchedValues.groupIds.includes(g.id)
      );
      setValue(
        "groupNames",
        selectedGroups.map((g) => g.name)
      );
    } else {
      setValue("groupNames", []);
    }
  }, [watchedValues.groupIds, groups, setValue]);

  // Проверка конфликтов при изменении важных полей
  useEffect(() => {
    if (
      watchedValues.teacherId &&
      watchedValues.classroomId &&
      watchedValues.groupIds?.length > 0 &&
      watchedValues.day &&
      watchedValues.timeSlot &&
      watchedValues.weekType
    ) {
      // Исключаем текущий элемент из проверки при редактировании
      const scheduleToCheck = editItem
        ? schedule.filter((item) => item.id !== editItem.id)
        : schedule;

      const conflictMessages = checkScheduleConflicts(
        scheduleToCheck,
        watchedValues
      );
      setConflicts(conflictMessages);
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

  useEffect(() => {
    if (
      isOpen &&
      editItem &&
      availableSubjects.length > 0 &&
      editItem.subjectId
    ) {
      setValue("subjectId", editItem.subjectId);
      const subj = availableSubjects.find((s) => s.id === editItem.subjectId);
      if (subj) setValue("subjectName", subj.name);
    }
  }, [isOpen, editItem, availableSubjects, setValue]);

  const onFormSubmit = (data: ScheduleItem) => {
    // Если это новый элемент, генерируем ID
    if (!data.id) {
      data.id = crypto.randomUUID();
    }

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
          {/* Преподаватель */}
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

          {/* Предмет */}
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

          {/* Тип занятия */}
          <div>
            <Controller
              name="lessonType"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  label="Тип занятия"
                  options={availableLessonTypes.map((type) => ({
                    value: String(type.id),
                    label: type.name,
                    key: String(type.id),
                  }))}
                  error={errors.lessonType?.message}
                  {...field}
                />
              )}
            />
          </div>

          {/* Аудитория */}
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

          {/* Группы */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Группы
            </label>
            <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded-md p-3">
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
              <p className="mt-1 text-sm text-error-600">
                {errors.groupIds.message}
              </p>
            )}
          </div>

          {/* День недели */}
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

          {/* Временной слот */}
          <div>
            <Controller
              name="lessonTime"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  label="Время"
                  options={availableLessonTimes.map((slot) => ({
                    value: String(slot.id),
                    label: `${slot.startTime} - ${slot.endTime}`,
                    key: String(slot.id),
                  }))}
                  error={errors.lessonTime?.message}
                  {...field}
                />
              )}
            />
          </div>

          {/* Тип недели */}
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

        {/* Предупреждения о конфликтах */}
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
