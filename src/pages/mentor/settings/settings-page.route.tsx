import { RouteObject } from "react-router-dom";
import { createElement } from "react";
import { SettingsPage } from "./settings-page.ui";
import { pathKeys } from "@/shared/lib/react-router";

export const settingsPageRoute: RouteObject = {
  path: pathKeys.settings(),
  element: createElement(SettingsPage),
};
