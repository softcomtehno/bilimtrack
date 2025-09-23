import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  LessonType,
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
import { CustomSelect } from "../ui/CustomSelect";
import { Button } from "../ui/Button";
import { Dialog } from "../ui/Dialog";
import {
  useGetSubjects,
  useGetLessonTypes,
} from "@/entities/schedule/schedules/schedules.queries";

import Select from "react-select";

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
  courses: {
    id: number;
    number: number;
    educationLevel: { id: number; name: string };
  }[];
  eduLevels: { id: number; name: string }[]; // 👈 передаём список уровней
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
  eduLevels,
  setSelectedEduLevelId,
  selectedEduLevelId,
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
  } = useForm<ScheduleItem & { courseId: string }>({
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
        lessonType: "",
        day: DAYS_OF_WEEK[0],
        timeSlot: DEFAULT_TIME_SLOTS[0],
        weekType: "Обе",
      }),
      courseId: getDefaultCourseId(),
      educationLevelId: selectedEduLevelId, // 👈 добавить дефолт
    },
  });

  const [conflicts, setConflicts] = useState<string[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups);
  const availableSubjects: Subject[] = useGetSubjects()?.data || [];
  const availableLessonTypes: LessonType[] = useGetLessonTypes()?.data || [];
  const watchedValues = watch();

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
          lessonType: "",
          day: DAYS_OF_WEEK[0],
          timeSlot: DEFAULT_TIME_SLOTS[0],
          weekType: "Обе",
        }),
        courseId: getDefaultCourseId(),
        educationLevelId: "", // 👈 здесь тоже
      });
    }
  }, [isOpen, editItem, reset, getDefaultCourseId]);

  // state для фильтрованных курсов
  const [filteredCourses, setFilteredCourses] = useState<
    {
      id: number;
      number: number;
      educationLevel: { id: number; name: string };
    }[]
  >(courses);

  // фильтрация курсов по выбранному уровню
  useEffect(() => {
    if (watchedValues.educationLevelId) {
      const filtered = courses.filter(
        (course) =>
          course.educationLevel?.id?.toString() ===
          watchedValues.educationLevelId
      );
      setFilteredCourses(filtered);

      // сброс курса если он не относится к новому уровню
      if (
        watchedValues.courseId &&
        !filtered.some((c) => String(c.id) === watchedValues.courseId)
      ) {
        setValue("courseId", "");
      }
    } else {
      setFilteredCourses(courses);
    }
  }, [
    watchedValues.educationLevelId,
    watchedValues.courseId,
    courses,
    setValue,
  ]);

  const onFormSubmit = (data: ScheduleItem & { courseId: string }) => {
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
          {eduLevels?.length > 0 && (
            <div className="w-full sm:w-48 flex">
              <CustomSelect
                label="Уровни образования"
                options={(eduLevels || []).map((lvl) => ({
                  value: lvl.id,
                  label: lvl.name,
                }))}
                value={selectedEduLevelId || ""}
                onChange={(value) =>
                  setSelectedEduLevelId?.(value || undefined)
                }
              />
            </div>
          )}

          <div>
            <Controller
              name="courseId"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <CustomSelect
                  label="Курс"
                  options={filteredCourses.map((course) => ({
                    value: String(course.id),
                    label: `${course.number} курс`,
                  }))}
                  error={errors.courseId?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div>
            <span>Преподаватель</span>
            <Controller
              name="teacherId"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={teachers.map((teacher) => ({
                    value: teacher.id,
                    label: teacher.name,
                  }))}
                  isSearchable
                  isClearable
                  placeholder="Выберите преподавателя..."
                  className="basic-single-select"
                  classNamePrefix="select"
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption ? selectedOption.value : "");
                  }}
                  value={
                    field.value
                      ? teachers.find((t) => t.id === field.value)
                        ? {
                            value: field.value,
                            label:
                              teachers.find((t) => t.id === field.value)
                                ?.name || "",
                          }
                        : null
                      : null
                  }
                />
              )}
            />
            {errors.teacherId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.teacherId.message}
              </p>
            )}
          </div>

          <div>
            <span>Предмет</span>
            <Controller
              name="subjectId"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={availableSubjects.map((subject) => ({
                    value: subject.id,
                    label: subject.name,
                  }))}
                  isSearchable
                  isClearable
                  placeholder="Выберите предмет..."
                  className="basic-single-select"
                  classNamePrefix="select"
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption ? selectedOption.value : "");
                  }}
                  value={
                    field.value
                      ? availableSubjects.find((s) => s.id === field.value)
                        ? {
                            value: field.value,
                            label:
                              availableSubjects.find(
                                (s) => s.id === field.value
                              )?.name || "",
                          }
                        : null
                      : null
                  }
                />
              )}
            />
            {errors.subjectId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.subjectId.message}
              </p>
            )}
          </div>

          <div>
            <span>Аудитория</span>
            <Controller
              name="classroomId"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={classrooms.map((classroom) => ({
                    value: classroom.id,
                    label: `${classroom.name} (${classroom.type}, ${classroom.capacity} мест)`,
                  }))}
                  isSearchable
                  isClearable
                  placeholder="Выберите аудиторию..."
                  className="basic-single-select"
                  classNamePrefix="select"
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption ? selectedOption.value : "");
                  }}
                  value={
                    field.value
                      ? classrooms.find((c) => c.id === field.value)
                        ? {
                            value: field.value,
                            label: `${classrooms.find((c) => c.id === field.value)?.name} (${classrooms.find((c) => c.id === field.value)?.type}, ${classrooms.find((c) => c.id === field.value)?.capacity} мест)`,
                          }
                        : null
                      : null
                  }
                />
              )}
            />
            {errors.classroomId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.classroomId.message}
              </p>
            )}
          </div>

          <div>
            <Controller
              name="lessonType"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field }) => (
                <CustomSelect
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
                <CustomSelect
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
                <CustomSelect
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
                <CustomSelect
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

        <div className="col-span-2 mt-4 h-44">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="group-select"
          >
            Группы
          </label>
          <Controller
            name="groupIds"
            control={control}
            rules={{
              required: "Выберите хотя бы одну группу",
            }}
            render={({ field }) => (
              <Select
                {...field}
                options={filteredGroups.map((group) => ({
                  value: group.id,
                  label: `${group.name} (${group.students} чел.)`,
                }))}
                isMulti
                isClearable
                placeholder="Выберите группы..."
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) => {
                  const ids = selectedOptions
                    ? selectedOptions.map((option: any) => option.value)
                    : [];
                  field.onChange(ids); // 👈 СИНХРОНИЗИРУЕМ С react-hook-form
                }}
                value={
                  field.value
                    ? filteredGroups
                        .filter((g) => field.value.includes(g.id))
                        .map((g) => ({
                          value: g.id,
                          label: `${g.name} (${g.students} чел.)`,
                        }))
                    : []
                }
              />
            )}
          />
          {errors.groupIds && (
            <p className="mt-1 text-sm text-red-500">
              {errors.groupIds.message}
            </p>
          )}
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
          <Button type="submit">{editItem ? "Сохранить" : "Добавить"}</Button>
        </div>
      </form>
    </Dialog>
  );
};
