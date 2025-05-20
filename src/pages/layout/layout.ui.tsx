import { Card } from "@heroui/card";
import { Navigate, Outlet } from "react-router-dom";

import { Navigation } from "@/widgets/navigation";
import { TopBar } from "@/widgets/top-bar";

export function GenericLayout() {
  return (
    <div className="my-5 mx-auto">
      <Card className="max-w-[400px] mx-auto border rounded-md">
        <TopBar />
        <Outlet />
        <Navigation />
      </Card>
    </div>
  );
}

export function IntroLayout() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen min-w-screen bg-no-repeat bg-cover mx-auto bg-[url('/images/bg.png')]">
      <Outlet />
    </div>
  );
}
export function MentorLayout() {
  return (
    <div className="p-10">
      <Outlet />
    </div>
  );
}

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

export function ProtectedRoute({
  isAuthenticated,
  redirectPath = "/auth",
}: ProtectedRouteProps) {
  return isAuthenticated ? <Outlet /> : <Navigate replace to={redirectPath} />;
}
