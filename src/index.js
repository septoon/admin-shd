import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Menu from './components/Menu/Menu';
import Contacts from './components/Contacts/Contacts';
import Delivery from './components/Delivery/Delivery';
import Vacancies from './components/Vacancies/Vacancies';
import Layout from './components/Layout';

import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';

import NotFound from './components/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <App /> }, // Главная страница с навигацией
      { path: 'menu', element: <Menu /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'delivery', element: <Delivery /> },
      { path: 'vacancies', element: <Vacancies /> },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
);