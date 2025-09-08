import React from 'react';
import {
  Clock,
  MapPin,
  BookOpen,
  Calendar,
  CalendarClock,
} from 'lucide-react';
import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import { ScheduleData, Teacher } from './type';
import { getSubjectColor } from './type';

export const schedule: ScheduleData = {
  monday: [
    { subject: 'Математика', startTime: '09:00', endTime: '10:30', room: 'Ауд. 305', instructor: 'Иванова А.С.', type: 'Лекция', duration: 90 },
    { subject: 'Физика', startTime: '11:00', endTime: '12:30', room: 'Ауд. 201', instructor: 'Иванова А.С.', type: 'Лабораторная', duration: 90 }
  ],
  tuesday: [
    { subject: 'Английский язык', startTime: '10:00', endTime: '11:30', room: 'Ауд. 102', instructor: 'Иванова А.С.', type: 'Практика', duration: 90 },
    { subject: 'Математика', startTime: '13:00', endTime: '14:30', room: 'Ауд. 305', instructor: 'Иванова А.С.', type: 'Практика', duration: 90 }
  ],
  wednesday: [
    { subject: 'Программирование', startTime: '11:00', endTime: '12:30', room: 'Ауд. 210', instructor: 'Петров В.И.', type: 'Практика', duration: 90 },
    { subject: 'Программирование', startTime: '14:00', endTime: '15:30', room: 'Ауд. 210', instructor: 'Петров В.И.', type: 'Лабораторная', duration: 90 }
  ],
  thursday: [
    { subject: 'Физика', startTime: '09:00', endTime: '10:30', room: 'Ауд. 201', instructor: 'Козлов Д.А.', type: 'Лекция', duration: 90 },
    { subject: 'Английский язык', startTime: '15:00', endTime: '16:30', room: 'Ауд. 102', instructor: 'Смирнова Е.В.', type: 'Семинар', duration: 90 }
  ],
  friday: [
    { subject: 'Маркетинг', startTime: '14:00', endTime: '15:30', room: 'Ауд. 101', instructor: 'Сидорова М.П.', type: 'Семинар', duration: 90 },
    { subject: 'Маркетинг', startTime: '16:00', endTime: '17:30', room: 'Ауд. 101', instructor: 'Сидорова М.П.', type: 'Практика', duration: 90 }
  ]
};

export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Иванова А.С.',
    department: 'Бишкекский колледж компьютерных систем и технологий',
    email: 'ivanova@college.edu',
    phone: '+996 555 123 456',
    subjects: ['Математика'],
  },
];

export const Timetablepage: React.FC = () => {
  const teacher = teachers[0];

  const days = [
    { key: 'monday', label: 'Понедельник' },
    { key: 'tuesday', label: 'Вторник' },
    { key: 'wednesday', label: 'Среда' },
    { key: 'thursday', label: 'Четверг' },
    { key: 'friday', label: 'Пятница' },
  ];

  const jsDay = new Date().getDay();
  let defaultTab = jsDay >= 1 && jsDay <= 5 ? days[jsDay - 1].key : 'weekend';

  const teacherClasses = Object.entries(schedule)
    .filter(([day, classes]) =>
      classes.some(c => c.instructor === teacher.name)
    )
    .map(([day, classes]) => ({
      day,
      classes: classes.filter(c => c.instructor === teacher.name),
    }));

  const totalClasses = teacherClasses.reduce((sum, d) => sum + d.classes.length, 0);
  const totalHours = teacherClasses.reduce(
    (sum, d) => sum + d.classes.reduce((s, c) => s + (c.duration || 90), 0),
    0
  ) / 60;

  const allClasses = teacherClasses.flatMap(d => d.classes);
  const earliestClass = allClasses.sort((a, b) => a.startTime.localeCompare(b.startTime))[0];
  const latestClass = allClasses.sort((a, b) => b.endTime.localeCompare(a.endTime))[0];

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-sky-500 to-blue-700 px-6 py-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <CalendarClock className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">График работы</h2>
            <p className="text-indigo-100 text-sm">Система подсчёта часов</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-4 border-b border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-900">{totalClasses}</div>
            <div className="text-xs text-slate-600">Занятий в неделю</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{totalHours.toFixed(1)}</div>
            <div className="text-xs text-slate-600">Часов в неделю</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{earliestClass?.startTime || '--:--'}</div>
            <div className="text-xs text-slate-600">Начало работы</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{latestClass?.endTime || '--:--'}</div>
            <div className="text-xs text-slate-600">Конец работы</div>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <Tabs defaultValue={defaultTab} color="primary" variant="underlined">
          {days.map(({ key, label }) => (
            <Tab key={key} title={label}>
              {schedule[key]?.length ? (
                <div className="space-y-4 mt-4">
                  {schedule[key].map((classItem, i) => {
                    const colors = getSubjectColor(classItem.subject);
                    return (
                      <Card key={i} className={`${colors.bg} ${colors.border} ${colors.text} shadow-none`}>
                        <CardBody>
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h4 className="font-semibold">{classItem.subject}</h4>
                              <span className={`inline-block px-2 py-1 rounded text-xs ${colors.badge}`}>
                                {classItem.type}
                              </span>
                            </div>
                            <div className="text-right text-sm mt-2 sm:mt-0">
                              {classItem.startTime} — {classItem.endTime}
                              <div className="text-xs opacity-75">{classItem.duration} мин</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-between mt-2 text-sm opacity-75">
                            <div className="flex gap-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" /> {classItem.room}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {(classItem.duration / 60).toFixed(1)} ч
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" /> Аудиторное занятие
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Calendar className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                  Занятий нет
                </div>
              )}
            </Tab>
          ))}

          <Tab key="weekend" title="Выходной">
            <div className="text-center py-12 text-slate-500">
              <Calendar className="w-12 h-12 mx-auto mb-2 text-slate-400" />
              Сегодня выходной
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
