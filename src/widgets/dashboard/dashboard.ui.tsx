import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Card,
  CardBody,
  TableCell,
  Chip,
  Select,
  SelectItem,
} from "@heroui/react";

export const columns = [
  { name: "Рейтинг", uid: "rating" },
  { name: "ФИО и группа", uid: "fio" },
  { name: "Баллы", uid: "points" },
];

// База студентов (20 человек)
// ⚡ вместо rating в students оставляем только fio, group, direction, subject, points
export const students = [
  { id: 1, fio: "Tony Reichert", points: 95, group: "1A", direction: "Программирование", subject: "Математика" },
  { id: 2, fio: "Zoey Lang", points: 92, group: "1A", direction: "Программирование", subject: "Информатика" },
  { id: 3, fio: "Jane Fisher", points: 90, group: "1B", direction: "Программирование", subject: "Информатика" },
  { id: 4, fio: "William Howard", points: 89, group: "1B", direction: "Программирование", subject: "Математика" },
  { id: 5, fio: "Kristen Copper", points: 87, group: "2A", direction: "Дизайн", subject: "История" },
  { id: 6, fio: "Michael Green", points: 86, group: "2A", direction: "Дизайн", subject: "Философия" },
  { id: 7, fio: "Sophia Turner", points: 85, group: "2B", direction: "Дизайн", subject: "История" },
  { id: 8, fio: "James Lee", points: 83, group: "2B", direction: "Дизайн", subject: "Философия" },
  { id: 9, fio: "Emma Davis", points: 82, group: "3A", direction: "Экономика", subject: "Физика" },
  { id: 10, fio: "Liam Carter", points: 81, group: "3A", direction: "Экономика", subject: "Математика" },
  { id: 11, fio: "Olivia Brown", points: 80, group: "3B", direction: "Экономика", subject: "История" },
  { id: 12, fio: "Noah Wilson", points: 79, group: "3B", direction: "Экономика", subject: "Философия" },
  { id: 13, fio: "Ava Johnson", points: 77, group: "1A", direction: "Программирование", subject: "Физика" },
  { id: 14, fio: "Ethan Miller", points: 75, group: "1B", direction: "Программирование", subject: "Информатика" },
  { id: 15, fio: "Isabella White", points: 74, group: "2A", direction: "Дизайн", subject: "История" },
  { id: 16, fio: "Mason Harris", points: 73, group: "2B", direction: "Дизайн", subject: "Философия" },
  { id: 17, fio: "Mia Clark", points: 71, group: "3A", direction: "Экономика", subject: "Физика" },
  { id: 18, fio: "Lucas Walker", points: 70, group: "3B", direction: "Экономика", subject: "История" },
  { id: 19, fio: "Charlotte Hall", points: 69, group: "1A", direction: "Программирование", subject: "Математика" },
  { id: 20, fio: "Benjamin Allen", points: 67, group: "1B", direction: "Программирование", subject: "Информатика" },
];


// Универсальная таблица
export function Groups({ items }) {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "fio":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{user.fio}</p>
            <p className="text-xs text-gray-500">Группа: {user.group}</p>
          </div>
        );
      case "rating":
        return (
          <Chip className="capitalize" color="primary" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "points":
        return <p className="text-bold text-sm">{cellValue}</p>;
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Рейтинг студентов">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align="start">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id} className="cursor-pointer">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export function Dashboard() {
  const [category, setCategory] = React.useState("groups");
  const [subject, setSubject] = React.useState("");
  const [direction, setDirection] = React.useState("");

  // уникальные значения
  const subjects = [...new Set(students.map((s) => s.subject))];
  const directions = [...new Set(students.map((s) => s.direction))];

  // допустим, текущий студент = Tony Reichert (группа 1A)
  const currentUserGroup = "1A";

// фильтрация + сортировка + рейтинг
const getFilteredData = () => {
  let filtered: typeof students = [];

  switch (category) {
    case "group":
      filtered = students.filter((s) => s.group === currentUserGroup);
      break;
    case "subject":
      filtered = subject ? students.filter((s) => s.subject === subject) : students;
      break;
    case "direction":
      filtered = direction ? students.filter((s) => s.direction === direction) : students;
      break;
    case "groups":
    default:
      filtered = students;
      break;
  }


  return filtered
    .sort((a, b) => b.points - a.points)
    .map((s, index) => ({ ...s, rating: index + 1 }));
};


  return (
    <div className="flex w-full flex-col gap-4">
      <Select
        aria-label="Выбор категории рейтинга"
        selectedKeys={[category]}
        onSelectionChange={(keys) => setCategory(Array.from(keys)[0] as string)}
      >
        <SelectItem key="group">В группе</SelectItem>
        <SelectItem key="groups">Среди всех групп</SelectItem>
        <SelectItem key="subject">По предмету</SelectItem>
      </Select>
      {category === "subject" && (
        <Select
          aria-label="Выбор предмета"
          selectedKeys={subject ? [subject] : []}
          onSelectionChange={(keys) => setSubject(Array.from(keys)[0] as string)}
        >
          {subjects.map((subj) => (
            <SelectItem key={subj}>{subj}</SelectItem>
          ))}
        </Select>
      )}
      <Card className="w-full shadow-none border">
        <CardBody className="p-0">
          <Groups items={getFilteredData()} />
        </CardBody>
      </Card>
    </div>
  );
}
