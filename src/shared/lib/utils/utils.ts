import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Функция для генерации временных слотов
export function generateTimeSlots(
  startHour: number,
  endHour: number,
  intervalMinutes: number = 90
): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const startTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const endHourCalc = hour + Math.floor((minute + intervalMinutes) / 60);
      const endMinuteCalc = (minute + intervalMinutes) % 60;
      const endTime = `${endHourCalc.toString().padStart(2, "0")}:${endMinuteCalc.toString().padStart(2, "0")}`;
      slots.push(`${startTime} - ${endTime}`);
    }
  }
  return slots;
}

// Стандартные временные слоты для расписания
export const DEFAULT_TIME_SLOTS = [
  "07:30 - 08:50",
  "09:00 - 10:20",
  "10:30 - 11:50",
  "12:10 - 13:30",
  "13:40 - 15:00",
  "15:10 - 16:30",
  "16:40 - 18:00",
];

export const DAYS_OF_WEEK = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  // "Суббота",
];

export function getDayIndex(day: string): number {
  return DAYS_OF_WEEK.findIndex((d) => d === day);
}

// Функция для проверки конфликтов в расписании
export function checkScheduleConflicts(
  schedule: ScheduleItem[],
  newItem: ScheduleItem
): string[] {
  const conflicts: string[] = [];

  const sameTimeSlots = schedule.filter(
    (item) =>
      item.day === newItem.day &&
      item.timeSlot === newItem.timeSlot &&
      (item.weekType === newItem.weekType ||
        item.weekType === "Обе" ||
        newItem.weekType === "Обе")
  );

  // Проверка на конфликты по преподавателю
  const teacherConflicts = sameTimeSlots.filter(
    (item) => item.teacherId === newItem.teacherId
  );
  if (teacherConflicts.length > 0) {
    conflicts.push(
      `Преподаватель "${newItem.teacherName}" уже занят в это время`
    );
  }

  // Проверка на конфликты по аудитории
  const classroomConflicts = sameTimeSlots.filter(
    (item) => item.classroomId === newItem.classroomId
  );
  if (classroomConflicts.length > 0) {
    conflicts.push(
      `Аудитория "${newItem.classroomName}" уже занята в это время`
    );
  }

  // Проверка на конфликты по группам
  const newItemGroups = new Set(newItem.groupIds);
  sameTimeSlots.forEach((item) => {
    const itemGroups = new Set(item.groupIds);
    const hasIntersection = [...newItemGroups].some((id) => itemGroups.has(id));
    if (hasIntersection) {
      conflicts.push(`Одна или несколько групп уже имеют занятия в это время`);
    }
  });

  return conflicts;
}

// Функция для экспорта в PDF
export async function exportToPDF(elementId: string, filename: string) {
  const { default: html2canvas } = await import("html2canvas");
  const { default: jsPDF } = await import("jspdf");

  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/jpeg", 1.0);
  const pdf = new jsPDF("l", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

  const imgX = (pdfWidth - imgWidth * ratio) / 2;
  const imgY = 30;

  pdf.addImage(
    imgData,
    "JPEG",
    imgX,
    imgY,
    imgWidth * ratio,
    imgHeight * ratio
  );
  pdf.save(`${filename}.pdf`);
}

// Функция для экспорта в Excel
export async function exportToExcel(data: any[], filename: string) {
  const { utils, writeFile } = await import("xlsx");

  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Расписание");

  writeFile(workbook, `${filename}.xlsx`);
}
