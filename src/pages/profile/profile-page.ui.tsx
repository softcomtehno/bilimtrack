import { Card, CardBody, Avatar, Chip } from "@heroui/react";
import { CheckIcon } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

import "swiper/css";
import "swiper/css/pagination";
import { Chart } from "@/widgets/chart";

export const ProfilePage = () => {
  return (
    <>
      <Card className="w-full rounded-none p-3">
        <div className="flex gap-3 items-center">
          <Avatar
            alt="User Photo"
            className=""
            size="lg"
            src="/path-to-photo.jpg"
          />
          <div>
            <h3>Максат Жусупов</h3>
            <h6>@maksat-povt1</h6>
          </div>
        </div>

        <CardBody className="p-0 mt-4">
          <span className="text-gray-600">Группа: IT-23</span>
          <div className="mb-2">
            <Chip
              color="success"
              startContent={
                <CheckIcon className="bg-success/40 rounded-full" size={18} />
              }
              variant="faded"
            >
              Рейтинг: 85
            </Chip>
          </div>
          <div className="mb-2">
            <strong>Баллы:</strong> 1200
          </div>
          <div className="mb-2">
            <strong>Количество достижений:</strong> 15
          </div>
        </CardBody>
        <Chart />
      </Card>
    </>
  );
};
("");
