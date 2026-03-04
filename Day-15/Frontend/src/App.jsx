import { router } from "./app.routes";
import { RouterProvider } from "react-router";
import "./Features/shared/style/global.scss";
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
