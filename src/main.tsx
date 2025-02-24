// external modules
import { StrictMode } from "react";

// local modules
import "./index.css";
import "./App.css";
import App from "./App.js";

// Routing
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Error from "./pages/Error";
import Search from "./pages/Search";
// Do I need this?
// import Match from './pages/Match.tsx';

// redux
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}
