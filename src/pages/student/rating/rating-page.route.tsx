import { RouteObject } from "react-router-dom";
import { createElement } from "react";
import { RatingPage } from "./rating-page.ui";
import { pathKeys } from "@/shared/lib/react-router";


export const ratingPageRoute: RouteObject = {
  path: pathKeys.rating(),
  element: createElement(RatingPage),
};
