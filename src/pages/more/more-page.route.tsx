import { RouteObject } from "react-router-dom";
import { createElement } from "react";
import { pathKeys } from "../../shared/lib/react-router";
import { MorePage } from "./more-page.ui";


export const morePageRoute: RouteObject = {
  path: pathKeys.more(),
  element: createElement(MorePage),
};
