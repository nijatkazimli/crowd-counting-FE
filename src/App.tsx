import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import "@radix-ui/themes/styles.css";
import { Theme } from '@radix-ui/themes';

function App() {
  return (
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  );
}

export default App;
