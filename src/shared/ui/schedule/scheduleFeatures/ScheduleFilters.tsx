import React from "react";
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
  courses: { id: number; number: number }[];
  selectedTeacherId: string | undefined;
  selectedGroupId: string | undefined;
  selectedClassroomId: string | undefined;
  selectedCourseId: string;
  setSelectedTeacherId: (id: string | undefined) => void;
  setSelectedGroupId: (id: string | undefined) => void;
  setSelectedClassroomId: (id: string | undefined) => void;
  setSelectedCourseId: (id: string) => void;
  resetFilters: () => void;
  teachersLoading?: boolean;
  groupsLoading?: boolean;
  classroomsLoading?: boolean;
  coursesLoading?: boolean;
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
  teachersLoading = false,
  groupsLoading = false,
  classroomsLoading = false,
  coursesLoading = false,
}) => {
  const hasActiveFilters =
    selectedTeacherId ||
    selectedGroupId ||
    selectedClassroomId ||
    weekType !== "Обе";

  const displayGroups = selectedCourseId ? filteredGroups : groups;

  React.useEffect(() => {
    if (selectedCourseId && selectedGroupId) {
      const groupExists = filteredGroups.some((g) => g.id === selectedGroupId);
      if (!groupExists) {
        setSelectedGroupId(filteredGroups[0]?.id || undefined);
      }
    }
  }, [selectedCourseId, filteredGroups, selectedGroupId, setSelectedGroupId]);

  return (
    <div
      role="region"
      aria-label="Фильтры расписания"
      className="bg-white p-4 rounded-lg shadow-card mb-6"
    >
      <div className="flex flex-wrap gap-4 items-end">
        <div className="w-full sm:w-48 flex">
          <Select
            label="Курс"
            options={courses.map((course) => ({
              value: String(course.id),
              label: `${course.number} курс`,
            }))}
            value={selectedCourseId}
            onChange={(value) => {
              setSelectedCourseId(value);
              const newFilteredGroups = groups.filter(
                (g) => g.course?.id?.toString() === value
              );
              setSelectedGroupId(newFilteredGroups[0]?.id || undefined);
            }}
            isLoading={coursesLoading}
            hideEmptyOption
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            label="Группа"
            options={displayGroups.map((group) => ({
              value: group.id,
              label: group.name,
            }))}
            value={selectedGroupId || displayGroups[0]?.id || ""}
            onChange={(value) => setSelectedGroupId(value || undefined)}
            hideEmptyOption
            isLoading={groupsLoading}
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
            options={teachers.map((teacher) => ({
              value: teacher.id,
              label: teacher.name,
            }))}
            value={selectedTeacherId || ""}
            onChange={(value) => setSelectedTeacherId(value || undefined)}
            isSearchable
            isLoading={teachersLoading}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            label="Аудитория"
            options={classrooms.map((classroom) => ({
              value: classroom.id,
              label: classroom.name,
            }))}
            value={selectedClassroomId || ""}
            onChange={(value) => setSelectedClassroomId(value || undefined)}
            isLoading={classroomsLoading}
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
