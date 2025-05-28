import { createBrowserRouter } from "react-router-dom";
import Landing from "../Page/Landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
]);
