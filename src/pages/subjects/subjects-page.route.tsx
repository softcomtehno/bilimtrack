import { RouteObject } from "react-router-dom";
import { createElement } from "react";
import { pathKeys } from "../../shared/lib/react-router";
import {  SubjectsPage } from "./subjects-page.ui";

export const subjectsPageRoute: RouteObject = {
  path: pathKeys.subject.root(),
  element: createElement(SubjectsPage),
};
