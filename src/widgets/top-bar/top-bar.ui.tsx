import { CardHeader } from '@heroui/card';
import { Avatar, Divider } from '@heroui/react';
import { Link } from 'react-router-dom';

export function TopBar() {
  return (
    <>
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-md">BilimTrack LMS</p>
          <p className="text-small text-default-500">
            Образовательная экосистема УК МУИТ
          </p>
        </div>
        <Link to="/profile" className="cursor-pointer">
          <Avatar
            size="md"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
        </Link>
      </CardHeader>
      <Divider />
    </>
  );
}
