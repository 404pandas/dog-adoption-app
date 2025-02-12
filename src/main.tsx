// external modules
import { StrictMode } from "react";

// local modules
import "./index.css";
import App from "./App.js";


// Routing
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Login from './pages/Login.tsx';
import Error from './pages/Error.tsx';
import Search from './pages/Search.tsx';
// Do I need this?
// import Match from './pages/Match.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Search />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}