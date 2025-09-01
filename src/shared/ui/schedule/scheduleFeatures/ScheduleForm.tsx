import React, { useState, useEffect, useCallback } from "react";
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
  onSubmit: (
    data: ScheduleItem & { courseId: string; educationLevelId?: string }
  ) => void;
  editItem?: ScheduleItem;
  teachers: Teacher[];
  groups: Group[];
  classrooms: Classroom[];
  subjects: Subject[];
  schedule: ScheduleItem[];
  courses: { id: number; number: number; educationLevel?: string | number }[];
  eduLevelsData?: { id: string; name: string }[];
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
  courses,
  eduLevelsData,
}) => {
  const getDefaultCourseId = useCallback(() => {
    return courses?.[0]?.id ? String(courses[0].id) : "";
  }, [courses]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ScheduleItem & { courseId: string; educationLevelId?: string }>({
    defaultValues: {
      ...(editItem || {
        id: "",
        subjectId: "",
        subjectName: "",
        teacherId: "",
        teacherName: "",
        classroomId: "",
        classroomName: "",
        groupIds: [],
        groupNames: [],
        lessonType: "Лекция" as LessonType,
        day: DAYS_OF_WEEK[0],
        timeSlot: DEFAULT_TIME_SLOTS[0],
        weekType: "Обе" as WeekType | "Обе",
      }),
      courseId: "",
      educationLevelId: undefined,
    },
  });

  const [conflicts, setConflicts] = useState<string[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups);
  const availableSubjects: Subject[] = useGetSubjects()?.data || [];
  const availableLessonTypes: LessonType[] = useGetLessonTypes()?.data || [];
  const watchedValues = watch();

  // Фильтрация курсов по выбранному уровню образования
  const filteredCourses = React.useMemo(() => {
    const selectedEduLevelId = watchedValues.educationLevelId;
    if (!selectedEduLevelId) return courses || [];
    return (courses || []).filter(
      (course) => String(course.educationLevel) === selectedEduLevelId
    );
  }, [courses, watchedValues.educationLevelId]);

  // Сброс курса и групп при очистке уровня образования
  useEffect(() => {
    if (!watchedValues.educationLevelId) {
      setValue("courseId", "");
      setValue("groupIds", []);
    }
  }, [watchedValues.educationLevelId, setValue]);

  // Фильтрация групп по выбранному курсу
  useEffect(() => {
    if (watchedValues.courseId) {
      const filtered = groups.filter(
        (group) => group.course?.id?.toString() === watchedValues.courseId
      );
      setFilteredGroups(filtered);

      // Сбрасываем выбранные группы, если они не принадлежат новому курсу
      if (watchedValues.groupIds?.length) {
        const validGroups = watchedValues.groupIds.filter((groupId) =>
          filtered.some((g) => g.id === groupId)
        );
        if (validGroups.length !== watchedValues.groupIds.length) {
          setValue("groupIds", validGroups);
        }
      }
    } else {
      setFilteredGroups(groups);
    }
  }, [watchedValues.courseId, groups, setValue, watchedValues.groupIds]);

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
        filteredGroups
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
    filteredGroups,
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
      reset({
        ...(editItem || {
          id: "",
          subjectId: "",
          subjectName: "",
          teacherId: "",
          teacherName: "",
          classroomId: "",
          classroomName: "",
          groupIds: [],
          groupNames: [],
          lessonType: "Лекция" as LessonType,
          day: DAYS_OF_WEEK[0],
          timeSlot: DEFAULT_TIME_SLOTS[0],
          weekType: "Обе" as WeekType | "Обе",
        }),
        courseId: "",
        educationLevelId: undefined,
      });
    }
  }, [isOpen, editItem, reset, getDefaultCourseId]);

  const onFormSubmit = (
    data: ScheduleItem & { courseId: string; educationLevelId?: string }
  ) => {
    if (!data.id) data.id = crypto.randomUUID();
    onSubmit(data);
    onClose();
    window.location.reload();
  };

  const isEduLevelSelected = Boolean(watchedValues.educationLevelId);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={editItem ? "Редактировать занятие" : "Добавить занятие"}
      className="max-w-2xl"
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {/* Уровни образования */}
          {eduLevelsData?.length ? (
            <div>
              <Controller
                name="educationLevelId"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Уровни образования"
                    options={(eduLevelsData || []).map((lvl) => ({
                      value: lvl.id,
                      label: lvl.name,
                    }))}
                    {...field}
                  />
                )}
              />
            </div>
          ) : null}

          {/* Курс */}
          <div>
            <Controller
              name="courseId"
              control={control}
              rules={
                isEduLevelSelected
                  ? { required: "Обязательное поле" }
                  : undefined
              }
              render={({ field }) => (
                <Select
                  label="Курс"
                  options={filteredCourses.map((course) => ({
                    value: String(course.id),
                    label: `${course.number} курс`,
                  }))}
                  error={errors.courseId?.message}
                  value={isEduLevelSelected ? field.value : ""}
                  onChange={field.onChange}
                  // hideEmptyOption
                  disabled={!isEduLevelSelected}
                />
              )}
            />
          </div>

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

        {isEduLevelSelected && watchedValues.courseId ? (
          <div className="col-span-2 mt-4">
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
              {filteredGroups.map((group) => (
                <div key={group.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`group-${group.id}`}
                    value={group.id}
                    className="checkbox"
                    {...register(
                      "groupIds",
                      isEduLevelSelected && Boolean(watchedValues.courseId)
                        ? {
                            required: "Выберите хотя бы одну группу",
                          }
                        : undefined
                    )}
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
        ) : null}

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
