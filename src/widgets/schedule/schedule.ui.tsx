import {
  Card,
  CardBody,
  Listbox,
  ListboxItem,
  Tab,
  Tabs,
  cn,
} from "@heroui/react";
import { Link } from "react-router-dom";

export const IconWrapper = ({ children, className }) => (
  <div
    className={cn(
      className,
      "flex items-center rounded-small justify-center w-7 h-7",
    )}
  >
    {children}
  </div>
);

export const ItemCounter = ({ number }) => (
  <div className="flex items-center gap-1 text-default-400">
    <span className="text-small">{number}</span>
  </div>
);

export function Schedule() {
  return (
    <div className="flex flex-col">
      <Tabs aria-label="Options" className="w-full shadow-none">
        <Tab key="today" className="w-full" title="Сегодня">
          <Card className="w-full shadow-none border">
            <CardBody className="p-0">
              <Listbox
                aria-label="User Menu"
                className="p-0 gap-0 border max-w-full overflow-visible shadow-none rounded-medium"
                itemClasses={{
                  base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
                onAction={(key) => alert(key)}
              >
                <ListboxItem
                  key="issues"
                  endContent={<ItemCounter number={"07:30-08:40"} />}
                  startContent={
                    <IconWrapper className="!w-[50px] !h-[30px] bg-success/10 text-success">
                      <p className="text-sm">406</p>
                    </IconWrapper>
                  }
                >
                  Front-end Разработка
                </ListboxItem>
                <ListboxItem
                  key="discussions"
                  endContent={<ItemCounter number={"08:50-10:00"} />}
                  startContent={
                    <IconWrapper className=" !w-[50px] !h-[30px] bg-secondary/10 text-secondary">
                      <p className="text-sm">406</p>
                    </IconWrapper>
                  }
                >
                  Кураторский час
                </ListboxItem>
                <ListboxItem
                  key="contributors"
                  endContent={<ItemCounter number={"10:10-11:20"} />}
                  startContent={
                    <IconWrapper className=" !w-[50px] !h-[30px] bg-warning/10 text-warning">
                      <p className="text-sm">406</p>
                    </IconWrapper>
                  }
                >
                  Человек и общество
                </ListboxItem>
                <ListboxItem
                  key="license"
                  endContent={<ItemCounter number={"11:30-12:40"} />}
                  startContent={
                    <IconWrapper className="bg-danger/10 !w-[50px] !h-[30px] text-danger dark:text-danger-500">
                      <p className="text-sm">202/2</p>
                    </IconWrapper>
                  }
                >
                  Кыргыз Адабият
                </ListboxItem>
              </Listbox>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="tomorrow" className="w-full" title="На завтра">
          <Card className="w-full shadow-none border">
            <CardBody className="p-0">
              <Listbox
                aria-label="User Menu"
                className="p-0 gap-0 border max-w-full overflow-visible shadow-none rounded-medium"
                itemClasses={{
                  base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
                onAction={(key) => alert(key)}
              >
                <ListboxItem
                  key="issues"
                  endContent={<ItemCounter number={"07:30-08:40"} />}
                  startContent={
                    <IconWrapper className="!w-[50px] !h-[30px] bg-success/10 text-success">
                      <p className="text-sm">402</p>
                    </IconWrapper>
                  }
                >
                  Back-end Разработка
                </ListboxItem>
                <ListboxItem
                  key="discussions"
                  endContent={<ItemCounter number={"08:50-10:00"} />}
                  startContent={
                    <IconWrapper className=" !w-[50px] !h-[30px] bg-secondary/10 text-secondary">
                      <p className="text-sm">413</p>
                    </IconWrapper>
                  }
                >
                  Культура речи
                </ListboxItem>
                <ListboxItem
                  key="contributors"
                  endContent={<ItemCounter number={"10:10-11:20"} />}
                  startContent={
                    <IconWrapper className=" !w-[50px] !h-[30px] bg-warning/10 text-warning">
                      <p className="text-sm">411</p>
                    </IconWrapper>
                  }
                >
                  География
                </ListboxItem>
                <ListboxItem
                  key="license"
                  endContent={<ItemCounter number={"11:30-12:40"} />}
                  startContent={
                    <IconWrapper className="bg-danger/10 !w-[50px] !h-[30px] text-danger dark:text-danger-500">
                      <p className="text-sm">407</p>
                    </IconWrapper>
                  }
                >
                  Теория вероятности
                </ListboxItem>
              </Listbox>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="week" className="w-full" title="Послезавтра">
          <Card className="w-full shadow-none border">
            <CardBody className="p-0">
              <Listbox
                aria-label="User Menu"
                className="p-0 gap-0 border max-w-full overflow-visible shadow-none rounded-medium"
                itemClasses={{
                  base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
                onAction={(key) => alert(key)}
              >
                <ListboxItem
                  key="issues"
                  endContent={<ItemCounter number={"07:30-08:40"} />}
                  startContent={
                    <IconWrapper className="!w-[50px] !h-[30px] bg-success/10 text-success">
                      <p className="text-sm">406</p>
                    </IconWrapper>
                  }
                >
                  Front-end Разработка
                </ListboxItem>

                <ListboxItem
                  key="contributors"
                  endContent={<ItemCounter number={"10:10-11:20"} />}
                  startContent={
                    <IconWrapper className=" !w-[50px] !h-[30px] bg-warning/10 text-warning">
                      <p className="text-sm">406</p>
                    </IconWrapper>
                  }
                >
                  Человек и общество
                </ListboxItem>
                <ListboxItem
                  key="license"
                  endContent={<ItemCounter number={"11:30-12:40"} />}
                  startContent={
                    <IconWrapper className="bg-danger/10 !w-[50px] !h-[30px] text-danger dark:text-danger-500">
                      <p className="text-sm">202/2</p>
                    </IconWrapper>
                  }
                >
                  Кыргыз Адабият
                </ListboxItem>
              </Listbox>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="all" className="w-full" title="Полное Расписание">
          <Card className="w-full shadow-none border">
            <CardBody className="p-0">
              <Listbox
                aria-label="User Menu"
                className="p-0 gap-0 border max-w-full overflow-visible shadow-none rounded-medium"
                itemClasses={{
                  base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
                onAction={(key) => alert(key)}
              >
                <ListboxItem
                  key="issues"
                  endContent={<ItemCounter number={"07:30-08:40"} />}
                  startContent={
                    <IconWrapper className="!w-[50px] !h-[30px] bg-success/10 text-success">
                      <p className="text-sm">406</p>
                    </IconWrapper>
                  }
                >
                  Front-end Разработка
                </ListboxItem>
                <ListboxItem
                  key="discussions"
                  endContent={<ItemCounter number={"08:50-10:00"} />}
                  startContent={
                    <IconWrapper className=" !w-[50px] !h-[30px] bg-secondary/10 text-secondary">
                      <p className="text-sm">406</p>
                    </IconWrapper>
                  }
                >
                  Кураторский час
                </ListboxItem>
                <ListboxItem
                  key="contributors"
                  endContent={<ItemCounter number={"10:10-11:20"} />}
                  startContent={
                    <IconWrapper className=" !w-[50px] !h-[30px] bg-warning/10 text-warning">
                      <p className="text-sm">406</p>
                    </IconWrapper>
                  }
                >
                  Человек и общество
                </ListboxItem>
                <ListboxItem
                  key="license"
                  endContent={<ItemCounter number={"11:30-12:40"} />}
                  startContent={
                    <IconWrapper className="bg-danger/10 !w-[50px] !h-[30px] text-danger dark:text-danger-500">
                      <p className="text-sm">202/2</p>
                    </IconWrapper>
                  }
                >
                  Кыргыз Адабият
                </ListboxItem>
              </Listbox>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      <Link
        className="self-end mt-[-10px] underline text-sky-700"
        to="/schedule"
      >
        Полное расписание
      </Link>
    </div>
  );
}
