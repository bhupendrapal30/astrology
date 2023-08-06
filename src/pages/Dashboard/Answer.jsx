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




const Answer = () => {

   const ref = useRef([]);
   const [checked, setChecked] = useState([]);
   
  
  useEffect(() => {
    QuestionRequest.AnswerListData();
    document.getElementsByClassName("d-none")[0].style.visibility = 'hidden';
  }, []);
  const { AnswerListData, TotalQuestion } = useSelector(
    (state) => state.Question,
  );
  
  
  
 
  

  return (
  <div className="w3l-signinform">  
   <div className="container">
   
    <div className="row">
      <div className="col-sm-12 ">
    
    <div
      data-bs-spy="scroll"
      data-bs-target="#navbar-example2"
      data-bs-offset={0}
      className="scrollspy-example text-white"
      tabIndex={0}
    >
       {AnswerListData?.map((record, index) => {
                        return (
             <>
            {
            record!=null ?
             <div className="removedivcls" key={index}>
               <h4  className="catClass" >{record.catName}</h4>
               {record.ques?.map((ques, index) => {
                        return (
                           <>
               <div className="removeComma" dangerouslySetInnerHTML={{ __html: ques.ques }}></div>
               <div className="removeComma" dangerouslySetInnerHTML={{ __html: ques.ans }}></div>
               </>
               ) })}
             </div>
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

export default Answer;
