import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageOne from "./Page-1";
import PageTwo from "./Page-2";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageOne />,
  },
  {
    path: "/filters",
    element: <PageTwo />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
