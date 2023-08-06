import React, { useEffect } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import * as layoutConstants from "../redux/slices/SettingSlice";

// All layouts/containers
import DefaultLayout from "../layouts/Default";
// import VerticalLayout from "../layouts/Vertical";
// import DetachedLayout from "../layouts/Detached";
// import HorizontalLayout from "../layouts/Horizontal";
// import FullLayout from "../layouts/Full";

//External Lib Import

// Auth
const Login = React.lazy(() => import("../pages/Account/Login"));

//Page
const AdminDashboard = React.lazy(() =>
  import("../pages/Dashboard/AdminDashboard"),
);

const ProductsPage = React.lazy(() =>
  import("../pages/Dashboard/Products"),
);

const QuestionsPage = React.lazy(() =>
  import("../pages/Dashboard/Questions"),
);

const AnswerPage = React.lazy(() =>
  import("../pages/Dashboard/Answer"),
);

const Pdfpage = React.lazy(() =>
  import("../pages/Dashboard/Productspdf"),
);

const Pdflink = React.lazy(() =>
  import("../pages/Dashboard/Pdflink"),
);





const Logout = React.lazy(() => import("../pages/Account/Logout"));





const LoadComponent = ({ component: Component }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <Component />;
};

const AllRoutes = () => {
   const { LayoutType } = useSelector((state) => state.Setting);
   //console.log(LayoutType);
  const { UserDetails } = useSelector((state) => state.User);
  const { AccessToken } = useSelector((state) => state.Auth);

  const getLayout = () => {
     let layoutCls = DefaultLayout;

    
     return layoutCls;
  };

  let Layout = getLayout();
  
   if (AccessToken) {
   
    return (
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<LoadComponent component={AdminDashboard} />}
          />
          <Route
            path="/products"
            element={<LoadComponent component={ProductsPage} />}
          />
          <Route
            path="/questions"
            element={<LoadComponent component={QuestionsPage} />}
          />

          <Route
            path="/answers"
            element={<LoadComponent component={AnswerPage} />}
          />

          <Route
            path="/pdf-products"
            element={<LoadComponent component={Pdfpage} />}
          />

          <Route
            path="/pdflink"
            element={<LoadComponent component={Pdflink} />}
          />
          
          <Route path="*" element={<Navigate to="/products" />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<Navigate to="/account/login" />} />
          <Route path="*" element={<Navigate to="/account/login" />} />
          <Route
            path="/account/login"
            element={<LoadComponent component={Login} />}
          />
          <Route
            path="/account/logout"
            element={<LoadComponent component={Logout} />}
          />
          
        </Route>
      </Routes>
    );
  }
};

export default AllRoutes;
