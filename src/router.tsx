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
        index: true,
        element: <Pages.Count />,
      },
      {
        path: '*',
        element: <Pages.ErrorPage />,
      },
    ],
  },
]);

export default router;
