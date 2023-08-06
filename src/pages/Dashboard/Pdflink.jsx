// @flow
import React, { useEffect, useState ,createContext,useRef } from "react";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { VerticalForm, FormInput } from "../../components/Ui";
import AuthRequest from "../../APIRequest/AuthRequest";
import { useSelector } from "react-redux";
import QuestionRequest from "./../../APIRequest/QuestionRequest";


// components
import Timeline from "../../components/Ui/Timeline";
import TimelineItem from "../../components/Ui/TimelineItem";
import CardTitle from "../../components/Ui/CardTitle";
import Modal from 'react-bootstrap/Modal';




const Pdflink = () => {

   const ref = useRef([]);
   const [checked, setChecked] = useState([]);
   
  
  useEffect(() => {
    QuestionRequest.PdfDownloadLink();
    document.getElementsByClassName("d-none")[0].style.visibility = 'hidden';
  }, []);
  const { PdfListData, TotalQuestion } = useSelector(
    (state) => state.Question,
  );
  if(PdfListData.length> 0){
    var pdflink =PdfListData[0].pdfpath;
  }


  console.log(PdfListData[0]);
  
  
 
  

  return (
  <div className="w3l-signinform">   <div className="container">
   
    <div className="row">
      <div className="col-sm-6 border-right border-white">
    
    <div
      data-bs-spy="scroll"
      data-bs-target="#navbar-example2"
      data-bs-offset={0}
      className="scrollspy-example text-white"
      tabIndex={0}
    >
       
      
          </div>

    
  </div>

 <div className="col-sm-6 text-center">
        <h2 className="text-center text-white mb-2">Download </h2>
        <div>
          <img src="images/qr.png" />
        </div>
        <div>
          <a href="#">Choose another option</a>
        </div>
        <div>
        {PdfListData?.map((record, index) => {
                        return (
             <>
            {
            index==0 ?
          <a href={record.pdfpath}><button className="btn btn-primary">Download Pdf</button></a>
          :''
            }
            </>
      )
              })}
        </div>
      </div>
</div>

</div>
   
  </div>   
  );
};

export default Pdflink;
