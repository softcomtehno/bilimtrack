import React from "react";
import { StudentProfilePage } from "./student-profile-page.ui";
import { MentorProfilePage } from "./mentor-profile-page.ui";
import { userQueries } from "@/entities/user";
import { RouteObject } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";


const ProfilePageWrapper = () => {
  const { data: userData, isLoading, isError } = userQueries.useLoginUserQuery();

  if (isLoading) return <div>Загрузка...</div>;
  if (isError || !userData) return <div>Ошибка загрузки пользователя</div>;


  if (userData.data.role === "student") {
    return <StudentProfilePage />;
  } else if (userData.data.role === "mentor") {
    return <MentorProfilePage />;
  } else {
    return <div>Нет доступа</div>;
  }
};

export const profilePageRoute: RouteObject = {
  path: pathKeys.profile.root(),
  element: <ProfilePageWrapper />,
};
