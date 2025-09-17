import React from 'react';
import { Clock, MapPin, BookOpen, Calendar, CalendarClock } from 'lucide-react';
import { Tabs, Tab, Card, CardBody, Skeleton } from '@heroui/react';
import { schedulesQueries } from '@/entities/schedule';


export const Timetablepage: React.FC = () => {
  const { data, isLoading, isError } = schedulesQueries.useGetMentorSchedule();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="rounded-xl h-20 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500">Ошибка при загрузке предметов</div>
    );
  }

  console.log(data, 'fok');

  const { stats, days } = data;

  const dayLabels: Record<number, { short: string; full: string }> = {
    0: { short: 'ПН', full: 'Понедельник' },
    1: { short: 'ВТ', full: 'Вторник' },
    2: { short: 'СР', full: 'Среда' },
    3: { short: 'ЧТ', full: 'Четверг' },
    4: { short: 'ПТ', full: 'Пятница' },
    5: { short: 'СБ', full: 'Суббота' },
    6: { short: 'ВС', full: 'Воскресенье' },
  };

  const jsDay = new Date().getDay();
  let defaultTab = days[jsDay] ? String(jsDay) : 'weekend';

  return (
    <div className="bg-white overflow-y-auto">
      <div className="bg-gradient-to-r from-sky-500  to-blue-700 px-6 py-6">
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
        <div className="flex flex-wrap justify-around gap-1 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.totalClasses}
            </div>
            <div className="text-xs text-slate-600">Занятий в неделю</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.totalHours}
            </div>
            <div className="text-xs text-slate-600">Часов в неделю</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.todayStart || '--:--'}
            </div>
            <div className="text-xs text-slate-600">Начало работы</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.todayEnd || '--:--'}
            </div>
            <div className="text-xs text-slate-600">Конец работы</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {data.weekType === 'top'
                ? 'Числитель'
                : data.weekType === 'bottom'
                  ? 'Знаменатель'
                  : data.weekType}
            </div>
            <div className="text-xs text-slate-600">Неделя</div>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <Tabs>
          {Object.keys(dayLabels).map((key) => (
            <Tab
              key={key}
              title={
                <>
                  <span className="block sm:hidden">
                    {dayLabels[Number(key)].short}
                  </span>
                  <span className="hidden sm:block">
                    {dayLabels[Number(key)].full}
                  </span>
                </>
              }
            >
              {days[key]?.length ? (
                <div className="space-y-4 mt-4">
                  {days[key].map((classItem) => (
                    <Card
                      key={classItem.id}
                      className=" shadow-sm border"
                    >
                      <CardBody>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h4 className="font-semibold">
                              {classItem.subject.name}
                            </h4>
                            <span className="inline-block px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                              {classItem.lessonType.name}
                            </span>
                          </div>
                          <div className="text-right text-sm mt-2 sm:mt-0">
                            {classItem.lessonTime.startTime} —{' '}
                            {classItem.lessonTime.endTime}
                            <div className="text-xs opacity-75">
                              {classItem.durationMinutes} мин
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-between mt-2 text-sm opacity-75">
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />{' '}
                              {classItem.room.number} (корп.{' '}
                              {classItem.room.building})
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />{' '}
                              {(classItem.durationMinutes / 60).toFixed(1)} ч
                            </div>
                          </div>
                          <div className="flex items-center gap-1 font-bold">
                            <BookOpen className="w-4  h-4" />{' '}
                            {classItem.lessonType.name}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Calendar className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                  Занятий нет
                </div>
              )}
            </Tab>
          ))}
        </Tabs>
      </div>

    </div>
  );
};
