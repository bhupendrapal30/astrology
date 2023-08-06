import { BrowserRouter } from "react-router-dom";
import AllRoutes from ".";

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/account/login">
      <AllRoutes></AllRoutes>
    </BrowserRouter>
  );
};

export default AppRoutes;
