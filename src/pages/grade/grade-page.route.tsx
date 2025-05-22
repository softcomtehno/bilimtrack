import { RouteObject } from "react-router-dom";
import { createElement } from "react";
import { pathKeys } from "../../shared/lib/react-router";
import { GradePage } from "./grade-page.ui";

export const gradePageRoute: RouteObject = {
  path: pathKeys.grade(),
  element: createElement(GradePage),
};
