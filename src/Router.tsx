import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Coins />,
  },
  {
    path: "/coin/:coinId",
    element: <Coin />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
