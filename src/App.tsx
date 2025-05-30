import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routeConfig";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
