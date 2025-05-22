import CourseCard from '@/entities/course/ui/card';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Avatar,
  Button,
  Chip,
  user,
} from '@heroui/react';
import { Album, CheckIcon, CircleEllipsis, Star, Trophy, UserRound, UsersRound } from 'lucide-react';

import "swiper/css";
import "swiper/css/pagination";

import 'swiper/css';
import 'swiper/css/pagination';
import { Chart } from '@/widgets/chart';
import { userQueries } from '@/entities/user';

export const ProfilePage = () => {
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <>
      <Card className="w-full rounded-none p-3">
        <div className="flex gap-3 items-center">
          <div>
            <h3 className="flex gap-2 ">
              {' '}
              <span>{userData?.data.firstName}</span>
              {userData?.data.lastName}
            </h3>
            <h6>@{userData?.data.username}</h6>
          </div>
        </div>

        <div className="p-0 my -4 flex flex-wrap gap-2">
          <div className="">
            <Chip
              color="success"
              startContent={

                <UserRound className="bg-success/40 rounded-full" size={18}/>
           
              }
              variant="faded"
            >
              Группа: IT-23
            </Chip>
          </div>
          <div className="">
            <Chip
              color="success"
              startContent={
                <Star className="bg-success/40 rounded-full" size={18} />
              }
              variant="faded"
            >
              Рейтинг: 85
            </Chip>
          </div>
          <div className="">
            <Chip
              color="success"
              startContent={
                <CircleEllipsis  className="bg-success/40 rounded-full" size={18} />
              }
              variant="faded"
            >
              Баллы: 85
            </Chip>
          </div>
          <div className="">
            <Chip
              color="success"
              startContent={
                <Trophy className="bg-success/40 p-[3px] rounded-full" size={18}  />
              }
              variant="faded"
              className=''
            >
              Достижения: 15
            </Chip>
          </div>
        </div>
        <Chart />
      </Card>
    </>
  );
};
