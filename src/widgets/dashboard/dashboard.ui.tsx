import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Tabs,
  Tab,
  Card,
  CardBody,
  TableCell,
  Chip,
} from "@heroui/react";

export const columns = [
  { name: "Рейтинг", uid: "rating" },
  { name: "ФИО", uid: "fio" },
  { name: "Баллы", uid: "points" },
];

export const users = [
  {
    id: 1,
    rating: 1,
    fio: "Tony Reichert",
    points: 95,
    nickname: "@tony_r",
  },
  {
    id: 2,
    rating: 2,
    fio: "Zoey Lang",
    points: 89,
    nickname: "@zoey_lang",
  },
  {
    id: 3,
    rating: 3,
    fio: "Jane Fisher",
    points: 82,
    nickname: "@jane_f",
  },
  {
    id: 4,
    rating: 4,
    fio: "William Howard",
    points: 78,
    nickname: "@will_howard",
  },
  {
    id: 5,
    rating: 5,
    fio: "Kristen Copper",
    points: 75,
    nickname: "@kristen_c",
  },
];

export function Groups() {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "fio":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
            <p className="text-sm text-blue-500">{user.nickname}</p>
          </div>
        );
      case "rating":
        return (
          <Chip className="capitalize" color="primary" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "points":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align="start">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
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
  return (
    <div className="flex w-[300p] flex-col">
      <Tabs aria-label="Options" className="w-full">
        <Tab key="photos" className="w-[100]" title="В группе">
          <Card className="w-full shadow-none border">
            <CardBody className="p-0">
              <Groups />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" className="w-full" title="Среди групп">
          <Card className="w-full shadow-none border">
            <CardBody className="p-0">
              <Groups />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
