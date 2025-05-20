import { RouteObject } from "react-router-dom";
import { createElement } from "react";

import { StudentHomePage } from "./student-home-page.ui";

import { pathKeys } from "@/shared/lib/react-router";

export const studentHomePageRoute: RouteObject = {
  path: pathKeys.student(),
  element: createElement(StudentHomePage),
};
