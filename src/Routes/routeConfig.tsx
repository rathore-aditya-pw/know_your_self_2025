import { createBrowserRouter } from "react-router-dom";
import Landing from "../Page/Landing";
import TestSelection from "../Page/TestSelect";
import Test from "../Page/Test";
import Results from "../Page/Results";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/test-selection",
    element: <TestSelection />,
  },
  {
    path: "/results",
    element: <Results />,
  },
]);
