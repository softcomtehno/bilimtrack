import { RouteObject } from "react-router-dom";
import { createElement } from "react";

import { pathKeys } from "../../shared/lib/react-router";

import { ScannerPage } from "./scanner-page.ui";

export const scannerPageRoute: RouteObject = {
  path: pathKeys.scanner(),
  element: createElement(ScannerPage),
};
