//External Lib Import
import AppRoutes from "./routes/Routes";
import React, { useEffect, useState,useRef,createContext} from "react";
import { Toaster } from "react-hot-toast";
import FullScreenLoader from "./components/Common/FullScreenLoader";
import LoadingOverlay from 'react-loading-overlay-ts';

const App = () => {

  return (
    <>
      <AppRoutes />
      <Toaster />
      <LoadingOverlay/>
    </>
  );
};

export default App;