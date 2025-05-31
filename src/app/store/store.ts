import { create } from "zustand";
import {
  AppState,
  Group,
  Teacher,
  Classroom,
  Subject,
  ScheduleItem,
  WeekType,
} from "@/shared/types";

// Начальные данные для демонстрации
const initialTeachers: Teacher[] = [
  {
    id: "1",
    name: "Малабакиев Рамзан Камильджанович",
    subjects: ["1", "2"],
    availability: [
      {
        day: "Понедельник",
        timeSlots: ["08:30 - 10:00", "10:10 - 11:40", "11:50 - 13:20"],
      },
      {
        day: "Вторник",
        timeSlots: ["10:10 - 11:40", "11:50 - 13:20", "14:00 - 15:30"],
      },
    ],
    preferences: [
      { type: "Предпочтение", description: "Предпочитает утренние занятия" },
    ],
  },
  {
    id: "2",
    name: "Каныбеков Максат Октябрович",
    subjects: ["3", "4"],
    availability: [
      {
        day: "Среда",
        timeSlots: ["08:30 - 10:00", "10:10 - 11:40", "11:50 - 13:20"],
      },
      {
        day: "Четверг",
        timeSlots: ["14:00 - 15:30", "15:40 - 17:10", "17:20 - 18:50"],
      },
    ],
    preferences: [
      {
        type: "Ограничение",
        description: "Не может проводить занятия в пятницу",
      },
    ],
  },
  {
    id: "3",
    name: "Асанов Курманбек Тыныбекович",
    subjects: ["3", "4"],
    availability: [
      {
        day: "Среда",
        timeSlots: ["08:30 - 10:00", "10:10 - 11:40", "11:50 - 13:20"],
      },
      {
        day: "Четверг",
        timeSlots: ["14:00 - 15:30", "15:40 - 17:10", "17:20 - 18:50"],
      },
    ],
    preferences: [
      {
        type: "Ограничение",
        description: "Не может проводить занятия в пятницу",
      },
    ],
  },
];

const initialGroups: Group[] = [
  { id: "1", name: "ИСТ-101", students: 25, subjects: ["1", "3"] },
  { id: "2", name: "ИСТ-102", students: 23, subjects: ["1", "3"] },
  { id: "3", name: "ЭУМ-201", students: 28, subjects: ["2", "4"] },
];

const initialClassrooms: Classroom[] = [
  { id: "1", name: "101", type: "Стандартная", capacity: 30, features: [] },
  { id: "2", name: "102", type: "Стандартная", capacity: 25, features: [] },
  {
    id: "3",
    name: "201",
    type: "Лекционная",
    capacity: 80,
    features: ["Проектор"],
  },
  {
    id: "4",
    name: "301",
    type: "Компьютерная",
    capacity: 20,
    features: ["Компьютеры", "Проектор"],
  },
];

const initialSubjects: Subject[] = [
  {
    id: "1",
    name: "Математический анализ",
    lessonTypes: ["Лекция", "Практика"],
    duration: 90,
    frequency: 2,
  },
  {
    id: "2",
    name: "Программирование",
    lessonTypes: ["Лекция", "Практика", "Лаборатория"],
    duration: 90,
    frequency: 3,
  },
  {
    id: "3",
    name: "Философия",
    lessonTypes: ["Лекция", "Практика"],
    duration: 90,
    frequency: 1,
  },
  {
    id: "4",
    name: "Базы данных",
    lessonTypes: ["Лекция", "Лаборатория"],
    duration: 90,
    frequency: 2,
  },
];

// Начальное расписание
const initialSchedule: ScheduleItem[] = [
  {
    id: "1",
    subjectId: "1",
    subjectName: "Математический анализ",
    teacherId: "1",
    teacherName: "Малабакиев Рамзан Камильджанович",
    classroomId: "3",
    classroomName: "201",
    groupIds: ["1", "2"],
    groupNames: ["ИСТ-101", "ИСТ-102"],
    lessonType: "Лекция",
    day: "Понедельник",
    timeSlot: "08:30 - 10:00",
    weekType: "Обе",
  },
  {
    id: "2",
    subjectId: "3",
    subjectName: "Философия",
    teacherId: "2",
    teacherName: "Асанов Курманбек Тыныбекович",
    classroomId: "3",
    classroomName: "201",
    groupIds: ["1", "2"],
    groupNames: ["ИСТ-101", "ИСТ-102"],
    lessonType: "Лекция",
    day: "Среда",
    timeSlot: "10:10 - 11:40",
    weekType: "Числитель",
  },
];

// Создание хранилища состояния
export const useAppStore = create<
  AppState & {
    // Действия для преподавателей
    addTeacher: (teacher: Teacher) => void;
    updateTeacher: (teacher: Teacher) => void;
    deleteTeacher: (id: string) => void;

    // Действия для групп
    addGroup: (group: Group) => void;
    updateGroup: (group: Group) => void;
    deleteGroup: (id: string) => void;

    // Действия для аудиторий
    addClassroom: (classroom: Classroom) => void;
    updateClassroom: (classroom: Classroom) => void;
    deleteClassroom: (id: string) => void;

    // Действия для предметов
    addSubject: (subject: Subject) => void;
    updateSubject: (subject: Subject) => void;
    deleteSubject: (id: string) => void;

    // Действия для расписания
    addScheduleItem: (item: ScheduleItem) => void;
    updateScheduleItem: (item: ScheduleItem) => void;
    deleteScheduleItem: (id: string) => void;
    clearSchedule: () => void;

    // Действия для фильтров
    setActiveFilters: (filters: AppState["activeFilters"]) => void;
    resetFilters: () => void;
  }
>((set) => ({
  teachers: initialTeachers,
  groups: initialGroups,
  classrooms: initialClassrooms,
  subjects: initialSubjects,
  schedule: initialSchedule,
  activeFilters: {},

  // Реализация действий для преподавателей
  addTeacher: (teacher) =>
    set((state) => ({
      teachers: [...state.teachers, teacher],
    })),
  updateTeacher: (teacher) =>
    set((state) => ({
      teachers: state.teachers.map((t) => (t.id === teacher.id ? teacher : t)),
    })),
  deleteTeacher: (id) =>
    set((state) => ({
      teachers: state.teachers.filter((t) => t.id !== id),
    })),

  // Реализация действий для групп
  addGroup: (group) =>
    set((state) => ({
      groups: [...state.groups, group],
    })),
  updateGroup: (group) =>
    set((state) => ({
      groups: state.groups.map((g) => (g.id === group.id ? group : g)),
    })),
  deleteGroup: (id) =>
    set((state) => ({
      groups: state.groups.filter((g) => g.id !== id),
    })),

  // Реализация действий для аудиторий
  addClassroom: (classroom) =>
    set((state) => ({
      classrooms: [...state.classrooms, classroom],
    })),
  updateClassroom: (classroom) =>
    set((state) => ({
      classrooms: state.classrooms.map((c) =>
        c.id === classroom.id ? classroom : c
      ),
    })),
  deleteClassroom: (id) =>
    set((state) => ({
      classrooms: state.classrooms.filter((c) => c.id !== id),
    })),

  // Реализация действий для предметов
  addSubject: (subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
    })),
  updateSubject: (subject) =>
    set((state) => ({
      subjects: state.subjects.map((s) => (s.id === subject.id ? subject : s)),
    })),
  deleteSubject: (id) =>
    set((state) => ({
      subjects: state.subjects.filter((s) => s.id !== id),
    })),

  // Реализация действий для расписания
  addScheduleItem: (item) =>
    set((state) => ({
      schedule: [...state.schedule, item],
    })),
  updateScheduleItem: (item) =>
    set((state) => ({
      schedule: state.schedule.map((s) => (s.id === item.id ? item : s)),
    })),
  deleteScheduleItem: (id) =>
    set((state) => ({
      schedule: state.schedule.filter((s) => s.id !== id),
    })),
  clearSchedule: () =>
    set(() => ({
      schedule: [],
    })),

  // Реализация действий для фильтров
  setActiveFilters: (filters) =>
    set((state) => ({
      activeFilters: { ...state.activeFilters, ...filters },
    })),
  resetFilters: () =>
    set(() => ({
      activeFilters: {},
    })),
}));
