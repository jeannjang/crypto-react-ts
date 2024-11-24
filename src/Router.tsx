import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

// setup the routes
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "", // index route
        element: <Coins />,
      },
      {
        path: "coin/:coinId", // remove '/', coin detail route
        element: <Coin />,
        children: [
          {
            path: "price",
            element: <Price />,
          },
          {
            path: "chart",
            element: <Chart />,
          },
        ],
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
