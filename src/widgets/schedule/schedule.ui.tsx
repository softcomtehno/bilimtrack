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

          <Card className="w-full shadow-none border">
            <CardBody className="p-0">
              <Listbox
                aria-label="User Menu"
                className="p-0 gap-0 border max-w-full overflow-visible shadow-none rounded-medium"
                itemClasses={{
                  base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
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

      <Link
        className="flex items-center no-underline justify-center my-3 w-full h-[40px] rounded-lg border-2 border-white bg-sky-400  text-white"
        to="/schedule"
      >
        Полное расписание
      </Link>
    </div>
  );
}
