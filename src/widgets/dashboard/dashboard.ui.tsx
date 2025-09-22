import { useState, useEffect, useCallback } from "react";
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
  Button,
} from "@heroui/react";
import { userQueries } from "@/entities/user";
import { getSubjectsStudent } from "@/entities/subject/subject.api";
import { ratingQueries } from "@/entities/rating";

export const columns = [
  { name: "Рейтинг", uid: "rating" },
  { name: "ФИО и группа", uid: "fio" },
  { name: "Баллы", uid: "points" },
];

export function Groups({ items }: { items: any[] }) {
  const renderCell = useCallback((user: any, columnKey: string) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "fio":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500">Группа: {user.group?.name}</p>
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
    <TableRow key={item.username} className="cursor-pointer">
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
  const { data: userData, isLoading, isError } =
    userQueries.useLoginUserQuery();

  const [subjects, setSubjects] = useState<any[]>([]);
  useEffect(() => {
    getSubjectsStudent().then((res) => setSubjects(res.data || res));
  }, []);

  // локальные выбранные значения
  const [selectedCategory, setSelectedCategory] = useState<
    "groups" | "group" | "subject"
  >("groups");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // применённые значения (по ним делаем запрос)
  const [category, setCategory] = useState<"groups" | "group" | "subject">(
    "groups"
  );
  const [subject, setSubject] = useState<string | null>(null);

  // вычисляем параметры для API
  const groupId = category === "group" ? userData?.group?.id || null : null;
  const subjectId = category === "subject" && subject ? Number(subject) : null;

  const {
    data: ratingsResponse,
    isLoading: ratingLoading,
    refetch,
  } = ratingQueries.useGetRatingByUsers({ subjectId, groupId });

  if (isLoading) return <div>Loading user...</div>;
  if (isError) return <div>Error fetching user data.</div>;
  if (ratingLoading) return <div>Loading rating...</div>;

  // ✅ получаем массив из response
  const ratingsData = ratingsResponse?.data || ratingsResponse || [];

  // сортируем и добавляем id
  const sortedItems = ratingsData
    .sort((a: any, b: any) => b.points - a.points)
    .map((s: any, index: number) => ({
      ...s,
      id: s.username, // уникальный ключ для TableRow
      fio: `${s.firstName} ${s.lastName}`,
      rating: index + 1,
    }));

  return (
    <div className="flex w-full flex-col gap-4">
      {/* выбор категории */}
      <Select
        aria-label="Выбор категории рейтинга"
        selectedKeys={new Set([selectedCategory])}
        onSelectionChange={(keys) =>
          setSelectedCategory(Array.from(keys)[0] as any)
        }
      >
        <SelectItem key="group">В группе</SelectItem>
        <SelectItem key="groups">Среди всех групп</SelectItem>
        <SelectItem key="subject">По предмету</SelectItem>
      </Select>

      {/* выбор предмета */}
      {selectedCategory === "subject" && (
        <Select
          aria-label="Выбор предмета"
          selectedKeys={selectedSubject ? new Set([selectedSubject]) : new Set()}
          onSelectionChange={(keys) =>
            setSelectedSubject(Array.from(keys)[0] as string)
          }
        >
          {subjects.map((subj) => (
            <SelectItem key={subj.id}>{subj.name}</SelectItem>
          ))}
        </Select>
      )}

      {/* применить фильтр */}
      <Button
        color="primary"
        onPress={() => {
          setCategory(selectedCategory);
          setSubject(selectedSubject);
          refetch();
        }}
      >
        Применить фильтр
      </Button>

      {/* таблица */}
      <Card className="w-full shadow-none border">
        <CardBody className="p-0">
          {sortedItems.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Нет данных для отображения
            </div>
          ) : (
            <Groups items={sortedItems} />
          )}
        </CardBody>
      </Card>
    </div>
  );
}

