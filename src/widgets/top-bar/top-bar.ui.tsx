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

  return (
    <>
      <CardHeader className="flex justify-between items-center gap-2">
        <div className="flex flex-col">
          <p className="md:text-md text-xs font-bold text-default-500">
            {userData?.data.organization?.name}
          </p>
        </div>

        <img className="md:w-10 md:h-10 w-7 h-7 rounded-full" src={userData?.data.organization?.logo} />
      </CardHeader>
      <Divider />
    </>
  );
}
