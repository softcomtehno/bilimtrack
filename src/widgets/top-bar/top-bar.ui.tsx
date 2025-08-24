import { userQueries } from '@/entities/user';
import { CardHeader } from '@heroui/card';
import { Avatar, Divider } from '@heroui/react';
import { Link } from 'react-router-dom';

export function TopBar() {
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
  console.log('userData', userData);

  return (
    <>
      <CardHeader className="flex justify-between items-center gap-2">
        <div className="flex flex-col">
          <p className="text-sm font-bold text-default-500">
            {userData?.data.organization?.name}
          </p>
        </div>
        <Link className="cursor-pointer" to="/profile">
          <Avatar
            className="w-12 h-12"
            src={userData?.data.organization?.logo}
          />
        </Link>
      </CardHeader>
      <Divider />
    </>
  );
}
