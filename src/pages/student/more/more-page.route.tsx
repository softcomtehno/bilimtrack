import { RouteObject } from "react-router-dom";
import { createElement } from "react";
import { MorePage } from "./more-page.ui";
import { pathKeys } from "@/shared/lib/react-router";

export const morePageRoute: RouteObject = {
  path: pathKeys.more(),
  element: createElement(MorePage),
};
