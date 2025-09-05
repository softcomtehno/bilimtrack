import { Card } from "@heroui/react";

const events = [
  {
    title: "Математика",
    room: "305",
    groups: ["IT-21", "IT-22"],
    start: new Date(2025, 7, 18, 9, 0), // Пн 9:00
    end: new Date(2025, 7, 18, 10, 30),
  },
  {
    title: "Программирование информационных систем",
    room: "210",
    groups: ["DS-22", "DS-23", "DS-24"],
    start: new Date(2025, 7, 20, 11, 0), // Ср 11:00
    end: new Date(2025, 7, 20, 12, 30),
  },
  {
    title: "Маркетинг",
    room: "101",
    groups: ["MKT-23"],
    start: new Date(2025, 7, 22, 14, 0), // Пт 14:00
    end: new Date(2025, 7, 22, 15, 30),
  },
];

// Дни недели (только Пн–Пт)
const days = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8:00–18:00

export function Timetablepage() {
  return (
    <div className="p-4 overflow-x-auto">
      <div className="grid grid-cols-6 border rounded-xl">
        {/* Заголовки дней */}
        <div className="border p-2 font-bold text-center bg-gray-100">Время</div>
        {days.map((day, i) => (
          <div key={i} className="border p-2 font-bold text-center bg-gray-100">
            {day}
          </div>
        ))}

        {/* Сетка времени */}
        {hours.map((hour, rowIdx) => (
          <>
            {/* Левая колонка с часами */}
            <div
              key={`hour-${rowIdx}`}
              className="border p-2 text-sm text-center bg-gray-50"
            >
              {hour}:00
            </div>

            {/* Ячейки по дням */}
            {days.map((_, colIdx) => {
              const cellEvents = events.filter((ev) => {
                const day = ev.start.getDay(); // 1=Пн ... 5=Пт
                const eventHour = ev.start.getHours();
                return day === colIdx + 1 && eventHour === hour;
              });

              return (
                <div
                  key={`cell-${rowIdx}-${colIdx}`}
                  className="border relative min-h-[60px]"
                >
                  {cellEvents.map((ev, i) => {
                    const durationHours =
                      (ev.end.getTime() - ev.start.getTime()) / (1000 * 60 * 60);

                    return (
                      <Card
                        key={i}
                        className="absolute left-1 right-1 p-2 text-xs rounded-xl shadow bg-blue-100"
                        style={{
                          top: 2,
                          height: `${durationHours * 60}px`, // масштаб по длительности
                        }}
                      >
                        <p className="font-semibold">{ev.title}</p>
                        <p className="text-gray-600">
                          {ev.start.toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          –{" "}
                          {ev.end.toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-gray-500">Ауд. {ev.room}</p>
                      </Card>
                    );
                  })}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}

