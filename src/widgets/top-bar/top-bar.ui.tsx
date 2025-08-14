import { CardHeader } from "@heroui/card";
import { Avatar, Divider } from "@heroui/react";
import { Link } from "react-router-dom";

export function TopBar() {
  return (
    <>
      <CardHeader className="flex justify-between items-center gap-2">
        <div className="flex flex-col">
          <p className="text-sm font-bold text-default-500">
           Бишкекский колледж компьтерных систем и технологий
          </p>
        </div>
        <Link className="cursor-pointer" to="/profile">
          <Avatar
            className="w-12 h-12"
            src="https://comtehno.kg/assets/comtehno-BPTncSJr.png"
          />
        </Link>
      </CardHeader>
      <Divider />
    </>
  );
}
