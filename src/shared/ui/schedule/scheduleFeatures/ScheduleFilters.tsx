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
  classrooms: Classroom[];
  selectedTeacherId: string | undefined;
  selectedGroupId: string | undefined;
  selectedClassroomId: string | undefined;
  setSelectedTeacherId: (id: string | undefined) => void;
  setSelectedGroupId: (id: string | undefined) => void;
  setSelectedClassroomId: (id: string | undefined) => void;
  resetFilters: () => void;
}

export const ScheduleFilters: React.FC<ScheduleFiltersProps> = ({
  weekType,
  setWeekType,
  teachers,
  groups,
  classrooms,
  selectedTeacherId,
  selectedGroupId,
  selectedClassroomId,
  setSelectedTeacherId,
  setSelectedGroupId,
  setSelectedClassroomId,
  resetFilters,
}) => {
  const hasActiveFilters =
    selectedTeacherId ||
    selectedGroupId ||
    selectedClassroomId ||
    weekType !== "Обе";

  return (
    <div className="bg-white p-4 rounded-lg shadow-card mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="w-48">
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

        <div className="w-64">
          <Select
            label="Преподаватель"
            options={teachers.map((teacher) => ({
              value: teacher.id,
              label: teacher.name,
            }))}
            value={selectedTeacherId || ""}
            onChange={(value) => setSelectedTeacherId(value || undefined)}
          />
        </div>

        <div className="w-48">
          <Select
            label="Группа"
            options={groups.map((group) => ({
              value: group.id,
              label: group.name,
            }))}
            value={selectedGroupId || groups[0]?.id || ""}
            onChange={(value) => setSelectedGroupId(value || undefined)}
            hideEmptyOption
          />
        </div>

        <div className="w-48">
          <Select
            label="Аудитория"
            options={classrooms.map((classroom) => ({
              value: classroom.id,
              label: classroom.name,
            }))}
            value={selectedClassroomId || ""}
            onChange={(value) => setSelectedClassroomId(value || undefined)}
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            icon={<FilterX size={16} />}
          >
            Сбросить фильтры
          </Button>
        )}
      </div>
    </div>
  );
};
