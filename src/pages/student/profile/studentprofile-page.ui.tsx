import { Card, Avatar, Button, Chip, Divider } from '@heroui/react';
import { Mail, ShieldUser, UsersRound } from 'lucide-react';
import { Chart } from '@/widgets/chart';
import { userQueries } from '@/entities/user';

export const StudentProfilePage = () => {
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

  const user = userData?.data;

  return (
    <div className="flex flex-col gap-4 w-full">
      <Card className="w-full rounded-none p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <Avatar
            src={user?.avatarUrl || '/default-avatar.png'}
            alt={`${user?.firstName} ${user?.lastName}`}
            size="lg"
            className="border"
          />

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShieldUser size={16} />
              <span>Логин: @{user?.username}</span>
            </div>
            {user?.group && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UsersRound size={16} />
                <span>Группа: {user.group.name}</span>
              </div>
            )}
            {user?.email && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
            )}
          </div>
        </div>
        <Divider className="my-4" />
      </Card>
    </div>
  );
};
