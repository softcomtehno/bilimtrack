import React, { useEffect } from "react";
import { WeekType, Teacher, Group, Classroom } from "@/shared/types";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { FilterX } from "lucide-react";

interface ScheduleFiltersProps {
  weekType: WeekType | "Обе";
  setWeekType: (weekType: WeekType | "Обе") => void;
  teachers: Teacher[];
  groups: Group[];
  filteredGroups: Group[];
  classrooms: Classroom[];
  courses: { id: number; number: number; educationLevel?: string | number }[];
  selectedTeacherId: string | undefined;
  selectedGroupId: string | undefined;
  selectedClassroomId: string | undefined;
  selectedCourseId: string;
  setSelectedTeacherId: (id: string | undefined) => void;
  setSelectedGroupId: (id: string | undefined) => void;
  setSelectedClassroomId: (id: string | undefined) => void;
  setSelectedCourseId: (id: string) => void;
  resetFilters: () => void;

  // 🔥 новый пропс
  eduLevelsData: { id: string; name: string }[];
  selectedEduLevelId?: string;
  setSelectedEduLevelId?: (id: string | undefined) => void;
}

export const ScheduleFilters: React.FC<ScheduleFiltersProps> = ({
  weekType,
  setWeekType,
  teachers,
  groups,
  filteredGroups,
  classrooms,
  selectedCourseId,
  selectedTeacherId,
  selectedGroupId,
  selectedClassroomId,
  setSelectedCourseId,
  setSelectedTeacherId,
  setSelectedGroupId,
  setSelectedClassroomId,
  resetFilters,
  courses,
  selectedEduLevelId,
  setSelectedEduLevelId,
  eduLevelsData,
}) => {
  const hasActiveFilters =
    selectedTeacherId ||
    selectedGroupId ||
    selectedClassroomId ||
    weekType !== "Обе";

  const displayGroups = selectedCourseId ? filteredGroups : groups;

  useEffect(() => {
    if (selectedCourseId && selectedGroupId) {
      const groupExists = filteredGroups.some((g) => g.id === selectedGroupId);
      if (!groupExists) {
        setSelectedGroupId(filteredGroups[0]?.id || undefined);
      }
    }
  }, [selectedCourseId, filteredGroups, selectedGroupId, setSelectedGroupId]);

  // Сброс курса и группы при очистке уровня образования
  useEffect(() => {
    if (!selectedEduLevelId) {
      setSelectedCourseId("");
      setSelectedGroupId(undefined);
    }
  }, [selectedEduLevelId, setSelectedCourseId, setSelectedGroupId]);

  // Фильтруем курсы по выбранному уровню образования
  const filteredCourses = React.useMemo(() => {
    if (!selectedEduLevelId) return [] as typeof courses;
    return (courses || []).filter(
      (course) => String(course.educationLevel) === selectedEduLevelId
    );
  }, [courses, selectedEduLevelId]);

  // При изменении курса, обновляем также группы
  const handleCourseChange = (value: string) => {
    setSelectedCourseId(value);
    const newFilteredGroups = groups.filter(
      (g) => g.course?.id?.toString() === value
    );
    setSelectedGroupId(newFilteredGroups[0]?.id || undefined);
  };

  const isEduLevelSelected = Boolean(selectedEduLevelId);

  return (
    <div
      role="region"
      aria-label="Фильтры расписания"
      className="bg-white p-4 rounded-lg shadow-card mb-6"
    >
      <div className="flex flex-wrap gap-4 items-end">
        {eduLevelsData?.length > 0 && (
          <div className="w-full sm:w-48 flex">
            <Select
              label="Уровни образования"
              options={(eduLevelsData || []).map((lvl) => ({
                value: lvl.id,
                label: lvl.name,
              }))}
              value={selectedEduLevelId || ""}
              onChange={(value) => setSelectedEduLevelId?.(value || undefined)}
              // hideEmptyOption
            />
          </div>
        )}

        <div className="w-full sm:w-48 flex">
          <Select
            label="Курс"
            options={filteredCourses.map((course) => ({
              value: String(course.id),
              label: `${course.number} курс`,
            }))}
            value={isEduLevelSelected ? selectedCourseId : ""}
            onChange={handleCourseChange}
            // hideEmptyOption
            disabled={!isEduLevelSelected}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            label="Группа"
            options={(displayGroups || []).map((group) => ({
              value: group.id,
              label: group.name,
            }))}
            value={
              isEduLevelSelected
                ? selectedGroupId || displayGroups[0]?.id || ""
                : ""
            }
            onChange={(value) => setSelectedGroupId(value || undefined)}
            disabled={!isEduLevelSelected}
            // hideEmptyOption
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            label="Тип недели"
            options={[
              { value: "Обе", label: "Все недели" },
              { value: "Числитель", label: "Числитель" },
              { value: "Знаменатель", label: "Знаменатель" },
            ]}
            value={weekType}
            onChange={(value) => setWeekType((value as WeekType) || "Обе")}
            hideEmptyOption
          />
        </div>

        <div className="w-full sm:w-64">
          <Select
            label="Преподаватель"
            options={(teachers || []).map((teacher) => ({
              value: teacher.id,
              label: teacher.name,
            }))}
            value={selectedTeacherId || ""}
            onChange={(value) => setSelectedTeacherId(value || undefined)}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            label="Аудитория"
            options={(classrooms || []).map((classroom) => ({
              value: classroom.id,
              label: classroom.name,
            }))}
            value={selectedClassroomId || ""}
            onChange={(value) => setSelectedClassroomId(value || undefined)}
          />
        </div>

        {hasActiveFilters && (
          <div className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              icon={<FilterX size={16} />}
              className="w-full sm:w-auto"
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
