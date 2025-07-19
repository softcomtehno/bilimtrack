// Типы занятий
export type LessonType = "Лекция" | "Практика" | "Лаборатория";

// Типы аудиторий
export type ClassroomType = "Стандартная" | "Лекционная" | "Компьютерная";

// Тип недели
export type WeekType = "Числитель" | "Знаменатель" | "Обе";

// Преподаватель
export interface Teacher {
  id: string;
  name: string;
  subjects: string[]; // ID предметов, которые преподает
  availability: {
    day: string;
    timeSlots: string[];
  }[];
  preferences: {
    type: "Предпочтение" | "Ограничение";
    description: string;
  }[];
}

// Группа
export interface Group {
  id: string;
  name: string;
  students: number;
  subjects: string[]; // ID предметов для группы
}

// Аудитория
export interface Classroom {
  id: string;
  name: string;
  type: ClassroomType;
  capacity: number;
  features: string[];
}

// Предмет
export interface Subject {
  id: string;
  name: string;
  lessonTypes: LessonType[];
  duration: number; // в минутах
  frequency: number; // количество занятий в неделю
}

// Элемент расписания
export interface ScheduleItem {
  id: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  classroomId: string;
  classroomName: string;
  groupIds: string[];
  groupNames: string[];
  lessonType: LessonType;
  day: string;
  timeSlot: string;
  weekType: WeekType;
  lessonTime?: string;
}

// Состояние приложения
export interface AppState {
  teachers: Teacher[];
  groups: Group[];
  classrooms: Classroom[];
  subjects: Subject[];
  schedule: ScheduleItem[];
  activeFilters: {
    teacherId?: string;
    groupId?: string;
    classroomId?: string;
    weekType?: WeekType;
  };
}

// Параметры генерации расписания
export interface ScheduleGenerationParams {
  maxHoursPerDay: number;
  preferConsecutiveLessons: boolean;
  avoidLateEveningClasses: boolean;
  balanceWeekLoad: boolean;
  respectTeacherPreferences: boolean;
}
