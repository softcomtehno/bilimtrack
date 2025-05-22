import { RouteObject } from "react-router-dom";
import { createElement } from "react";

import { RootRedirect } from "./redirect";

import { pathKeys } from "@/shared/lib/react-router";

export const rootHomePageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(RootRedirect),
};
