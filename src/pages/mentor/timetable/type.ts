export interface Teacher {
  id: string;
  name: string;
  department: string;
  email?: string;
  phone?: string;
  subjects: string[];
}

export interface TeacherSchedule {
  teacher: Teacher;
  workingHours: {
    start: string;
    end: string;
  };
  totalHours: number;
  classesPerWeek: number;
}

export interface Class {
  subject: string;
  startTime: string;
  endTime: string;
  room: string;
  instructor?: string;
  type?: 'Лекция' | 'Практика' | 'Семинар' | 'Лабораторная';
  duration?: number; // in minutes
}

export interface ScheduleData {
  monday: Class[];
  tuesday: Class[];
  wednesday: Class[];
  thursday: Class[];
  friday: Class[];
}

interface SubjectColors {
  bg: string;
  text: string;
  border: string;
  badge: string;
}

const subjectColorMap: Record<string, SubjectColors> = {
  'Математика': {
    bg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    text: 'text-blue-900',
    border: 'border-blue-400',
    badge: 'bg-blue-200 text-blue-800'
  },
  'Программирование информационных систем': {
    bg: 'bg-gradient-to-br from-emerald-50 to-teal-100',
    text: 'text-emerald-900',
    border: 'border-emerald-400',
    badge: 'bg-emerald-200 text-emerald-800'
  },
  'Маркетинг': {
    bg: 'bg-gradient-to-br from-orange-50 to-amber-100',
    text: 'text-orange-900',
    border: 'border-orange-400',
    badge: 'bg-orange-200 text-orange-800'
  },
  'Физика': {
    bg: 'bg-gradient-to-br from-purple-50 to-violet-100',
    text: 'text-purple-900',
    border: 'border-purple-400',
    badge: 'bg-purple-200 text-purple-800'
  },
  'Английский язык': {
    bg: 'bg-gradient-to-br from-rose-50 to-pink-100',
    text: 'text-rose-900',
    border: 'border-rose-400',
    badge: 'bg-rose-200 text-rose-800'
  },
  'Физика': {
    bg: 'bg-gradient-to-br from-purple-50 to-violet-100',
    text: 'text-purple-900',
    border: 'border-purple-400',
    badge: 'bg-purple-200 text-purple-800'
  }
};

const defaultColors: SubjectColors = {
  bg: 'bg-gradient-to-br from-slate-50 to-gray-100',
  text: 'text-slate-900',
  border: 'border-slate-400',
  badge: 'bg-slate-200 text-slate-800'
};

export const getSubjectColor = (subject: string): SubjectColors => {
  return subjectColorMap[subject] || defaultColors;
};

export const getAllSubjects = (): string[] => {
  return Object.keys(subjectColorMap);
};