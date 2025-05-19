import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { ScannerPage } from './scanner-page.ui';
import { pathKeys } from '../../shared/lib/react-router';

export const scannerPageRoute: RouteObject = {
  path: pathKeys.scanner(),
  element: createElement(ScannerPage),
};
