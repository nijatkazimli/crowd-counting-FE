import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import * as Pages from './components/Pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '*',
        element: <Pages.ErrorPage />,
      },
    ],
  },
]);

export default router;
