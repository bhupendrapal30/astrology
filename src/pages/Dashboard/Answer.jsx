// @flow
import React, { useEffect, useState ,createContext,useRef } from "react";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
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
import { useNavigate } from "react-router-dom"; 




const Answer = () => {
    const navigate = useNavigate();

   const ref = useRef([]);
   const [checked, setChecked] = useState([]);
   //localStorage.setItem('anspage', JSON.stringify("1"));
  
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('anspaidpdf'))=="1"){
       localStorage.setItem('anspage', JSON.stringify("1"));
       
    }else {
     navigate("/pdf-products");
    }
    QuestionRequest.AnswerListData();
    
  }, []);
  const { AnswerListData, TotalQuestion } = useSelector(
    (state) => state.Question,
  );
  
  
  
 
  

  return (
  <div className="w3l-signinform">  
   <div className="container">
   
    <div className="row">
      <div className="col-sm-12 ">
      <div className="col-sm-12 ">
      <div  className=" pull-right ">
        
          <Link to="/account/logout"><button className="btn btn-primary pull-right">Home</button></Link>
        </div>
     </div>
    
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
