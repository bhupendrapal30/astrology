// External Lib Import
import React, { useEffect, useState ,createContext,useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";

// Internal Lib Import
import AccountLayout from "./AccountLayout";
import logoutIcon from "../../assets/images/logout-icon.svg";
import { useNavigate } from "react-router-dom"; 



const Logout = () => {


     const navigate = useNavigate();
     useEffect(() => {
      
      localStorage.removeItem('UserDetails');
      localStorage.removeItem('productCat');
      localStorage.removeItem('quesData');
      localStorage.removeItem('productData');
      localStorage.removeItem('AccessToken');
      localStorage.removeItem('getToken');
      localStorage.removeItem('anspaidpdf');
      localStorage.removeItem('anspage');
     navigate("/account/login");

  }, []);

   
     
  const { t } = useTranslation();
  return (
    <>
      
    </>
  );
};

export default Logout;
