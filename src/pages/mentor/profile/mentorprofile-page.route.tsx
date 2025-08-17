import { MentorProfilePage } from "./mentorprofile-page.ui";
import { RouteObject } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";

export const mentorprofilePageRoute: RouteObject = {
  path: pathKeys.profile.root(),
  element: <MentorProfilePage />,
};
