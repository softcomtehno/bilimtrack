import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  Chip,
  Select,
  SelectItem,
  Button,
  Input,
} from "@heroui/react";
import { userQueries } from "@/entities/user";
import { ratingQueries } from "@/entities/rating";

type Category = "group" | "groups";

// 🔹 Таблица для студентов
function StudentsTable({ items }: { items: any[] }) {
  return (
    <Table aria-label="Рейтинг студентов">
      <TableHeader>
        <TableColumn>Рейтинг</TableColumn>
        <TableColumn>ФИО и группа</TableColumn>
        <TableColumn>Баллы</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.username}>
            <TableCell>
              <Chip color="primary" size="sm" variant="flat">
                {item.rating}
              </Chip>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-bold text-sm">
                  {item.firstName} {item.lastName}
                </p>
                <p className="text-xs text-gray-500">
                  Группа: {item.group?.name}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-bold text-sm">{item.points}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

// 🔹 Таблица для групп
function GroupsTable({ items }: { items: any[] }) {
  return (
    <Table aria-label="Рейтинг групп">
      <TableHeader>
        <TableColumn>Рейтинг</TableColumn>
        <TableColumn>Группа</TableColumn>
        <TableColumn>Баллы</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Chip color="primary" size="sm" variant="flat">
                {item.rating}
              </Chip>
            </TableCell>
            <TableCell className="text-bold text-sm">{item.name}</TableCell>
            <TableCell className="text-bold text-sm">{item.points}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

// 🔹 Основной Dashboard
export function Dashboard() {
  const { data: userData, isLoading, isError } =
    userQueries.useLoginUserQuery();

  const [selectedCategory, setSelectedCategory] =
    useState<Category>("groups");

  const [category, setCategory] = useState<Category>("groups");
  const [search, setSearch] = useState("");

  const groupId = category === "group" ? userData?.group?.id || null : null;

  // 🔹 Рейтинг студентов
  const {
    data: ratingsUsers,
    isLoading: loadingUsers,
    refetch: refetchUsers,
  } = ratingQueries.useGetRatingByUsers({ groupId });

  // 🔹 Рейтинг групп
  const {
    data: ratingsGroups,
    isLoading: loadingGroups,
    refetch: refetchGroups,
  } = ratingQueries.useGetRatingByGroups();

  if (isLoading) return <div>Загрузка пользователя...</div>;
  if (isError) return <div>Ошибка при получении пользователя</div>;

  const handleApply = () => {
    setCategory(selectedCategory);
    if (selectedCategory === "groups") refetchGroups();
    else refetchUsers();
  };

  // 🔹 Подготовка данных
  let sortedItems: any[] = [];
  if (category === "groups") {
    const data = ratingsGroups?.data || ratingsGroups || [];
    sortedItems = data
      .sort((a: any, b: any) => b.points - a.points)
      .map((g: any, index: number) => ({
        ...g,
        rating: index + 1,
      }));
  } else {
    const data = ratingsUsers?.data || ratingsUsers || [];
    sortedItems = data
      .sort((a: any, b: any) => b.points - a.points)
      .map((s: any, index: number) => ({
        ...s,
        rating: index + 1,
      }));
  }

  // 🔹 Фильтрация по поиску
  const filteredItems = sortedItems.filter((item) => {
    const query = search.toLowerCase();
    if (category === "groups") {
      return item.name.toLowerCase().includes(query);
    } else {
      return (
        `${item.firstName} ${item.lastName}`.toLowerCase().includes(query) ||
        item.group?.name?.toLowerCase().includes(query)
      );
    }
  });

  const isLoadingRatings =
    category === "groups" ? loadingGroups : loadingUsers;

  return (
    <div className="flex w-full flex-col gap-4">
      {/* 🔹 Фильтры */}
      <div className="flex gap-2">
        <Select
          aria-label="Выбор категории рейтинга"
          selectedKeys={new Set([selectedCategory])}
          onSelectionChange={(keys) =>
            setSelectedCategory(Array.from(keys)[0] as Category)
          }
        >
          <SelectItem key="group">По студентам</SelectItem>
          <SelectItem key="groups">По группам</SelectItem>
        </Select>

        <Button color="primary" onPress={handleApply}>
          Применить 
        </Button>
      </div>

      {/* 🔹 Поиск */}
      <Input
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Card className="w-full shadow-none border">
        <CardBody className="p-0">
          {isLoadingRatings ? (
            <div className="p-4 text-center text-gray-500">
              Загрузка рейтинга...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Нет данных для отображения
            </div>
          ) : category === "groups" ? (
            <GroupsTable items={filteredItems} />
          ) : (
            <StudentsTable items={filteredItems} />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
