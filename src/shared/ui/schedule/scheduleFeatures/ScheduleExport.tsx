import React from "react";
import { Button } from "../ui/Button";
import { FileDown } from "lucide-react";
import { exportToPDF, exportToExcel } from "@/shared/lib/utils";
import { ScheduleItem } from "@/shared/types";

interface ScheduleExportProps {
  schedule: ScheduleItem[];
}

export const ScheduleExport: React.FC<ScheduleExportProps> = ({ schedule }) => {
  const handleExportPDF = async () => {
    await exportToPDF("schedule-grid", "Расписание");
  };

  const handleExportExcel = async () => {
    // Преобразуем данные расписания в формат для Excel
    const excelData = schedule.map((item) => ({
      Предмет: item.subjectName,
      "Тип занятия": item.lessonType,
      Преподаватель: item.teacherName,
      Аудитория: item.classroomName,
      Группы: item.groupNames.join(", "),
      День: item.day,
      Время: item.timeSlot,
      Неделя: item.weekType,
    }));

    await exportToExcel(excelData, "Расписание");
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportPDF}
        icon={<FileDown size={16} />}
      >
        Экспорт в PDF
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportExcel}
        icon={<FileDown size={16} />}
      >
        Экспорт в Excel
      </Button>
    </div>
  );
};
