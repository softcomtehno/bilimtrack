
import { RouteObject } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import { StudentProfilePage } from "./studentprofile-page.ui";


export const studentprofilePageRoute: RouteObject = {
  path: pathKeys.profile.root(),
  element: <StudentProfilePage/>,
};
