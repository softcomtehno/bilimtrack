import { userQueries } from '@/entities/user';
import { useLogout } from '@/entities/user/user.queries';

import {
  Button,
  Card,
  CardHeader,
  Image,
  Listbox,
  ListboxItem,
} from '@heroui/react';
import {
  BookCopy,
  Box,
  ChevronRight,
  LogOut,
  MessageCircle,
  Settings,
  StickyNote,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ListboxWrapper = ({ children }) => (
  <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export const MorePage = () => {
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  const logout = useLogout();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  const user = userData?.data;
  const navigate = useNavigate();

  const handleSettings = () => {
    navigate(`/mentor/settings`);
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <Link to="/mentor/profile" className="w-full">
        <Card className="w-full shadow-none border">
          <CardHeader className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <Image
                alt="heroui logo"
                height={40}
                radius="full"
                src={user?.photo || '/default-avatar.png'}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">Профиль</p>
                <p className="text-xs text-default-500">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
            </div>
            <ChevronRight />
          </CardHeader>
        </Card>
      </Link>

      <ListboxWrapper>
        <Listbox aria-label="Listbox menu with descriptions" variant="faded">
          <ListboxItem
            key="makalabox"
            description="Платформа тематических статей"
            startContent={<Box />}
            endContent={<ChevronRight />}
            onClick={() => window.open('https://makalabox.com', '_blank')}
          >
            Makalabox
          </ListboxItem>
          <ListboxItem
            key="new"
            description="Электронная библиотека"
            startContent={<BookCopy />}
            endContent={<ChevronRight />}
            onClick={() => window.open('https://lib-intuit.online/', '_blank')}
          >
            Lib Intuit
          </ListboxItem>
          <ListboxItem
            key="new"
            description="Сайт учебного заведения"
            startContent={<StickyNote />}
            endContent={<ChevronRight />}
            onClick={() => window.open(user.organization?.website, '_blank')}
          >
            {user.organization?.website}
          </ListboxItem>
        </Listbox>
      </ListboxWrapper>

      <ListboxWrapper>
        <Listbox aria-label="Listbox menu with descriptions" variant="faded">
          <ListboxItem
            key="new"
            startContent={<MessageCircle />}
            endContent={<ChevronRight />}
          >
            Тех Поддержка
          </ListboxItem>
          <ListboxItem
            key="new"
            startContent={<Settings />}
            endContent={<ChevronRight />}
            onClick={handleSettings}
          >
            Настройки
          </ListboxItem>
        </Listbox>
      </ListboxWrapper>
      <Card className="w-full shadow-none border cursor-pointer">
        <CardHeader
          onClick={logout}
          className="flex justify-between items-center"
        >
          <div className="flex gap-3 items-center">
            <div className="w-[40px] h-[40px] flex items-center justify-center bg-danger-200 rounded-full">
              <LogOut className="text-danger-500" />
            </div>
            <div className="flex flex-col">
              <p className="text-md">Выйти</p>
            </div>
          </div>
          <ChevronRight />
        </CardHeader>
      </Card>
    </div>
  );
};
