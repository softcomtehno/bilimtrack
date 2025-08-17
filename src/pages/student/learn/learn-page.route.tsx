import { RouteObject } from "react-router-dom";
import { createElement } from "react";
import {  LearnPage } from "./learn-page.ui";
import { pathKeys } from "@/shared/lib/react-router";

export const learnPageRoute: RouteObject = {
  path: pathKeys.learn.root(),
  element: createElement(LearnPage),
};
