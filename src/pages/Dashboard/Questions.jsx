// @flow
import React, { useEffect, useState ,createContext,useRef } from "react";
import Axios from 'axios';

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
import { useNavigate } from "react-router-dom"; 




const Questions = () => {
   const navigate = useNavigate();
   const key ='rzp_test_PX2vJ9ubej1UGc';

   const ref = useRef([]);
   const [checked, setChecked] = useState([]);
   
  
  useEffect(() => {
    QuestionRequest.QuestionListData();
    document.getElementsByClassName("d-none")[0].style.visibility = 'hidden';
  }, []);
  const { QuestionListData, TotalQuestion } = useSelector(
    (state) => state.Question,
  );
  
  

  const paymentHandler = async (e) => {
     let postBody1 = JSON.parse(localStorage.getItem('productData'));
     let amount = (postBody1.products.length)*100;
     
     const API_URL ='http://13.232.14.0:5000/api/user/';
     e.preventDefault();
     let userData = JSON.parse(localStorage.getItem("UserDetails"));
     let user_id =0;
     let userDetail=userData;
     if(userDetail){
      user_id =userDetail.user_id;
     }
     const orderUrl = `${API_URL}order`;
     const response = await Axios.post(orderUrl,{user_id:user_id,amount:amount});
     console.log(response);
     const { data } = response;
     const options = {
     key: key,
     amount: amount*100,
     name: "Astrology",
     description: "Astrology APP",
     order_id: data.id,
  handler: async (response) => {
    try {
     const paymentId = response.razorpay_payment_id;
     const url = `${API_URL}capture`;
     const captureResponse = await Axios.post(url, {'paymentId':paymentId,user_id:user_id,amount:amount,order_id:data.id})
     navigate("/answers");
      
    } catch (err) {
      console.log(err);
    }
  },
  theme: {
    color: "#686CFD",
  },
};
const rzp1 = new window.Razorpay(options);
rzp1.open();
};
  
 
  

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
       {QuestionListData?.map((record, index) => {
                        return (
             <>
            {
            record!=null ?
             <div className="removedivcls" key={index}>
               <h4  className="catClass" >{record.catName}</h4>
               {record.ques?.map((ques, index) => {
                        return (
               <div className="removeComma" dangerouslySetInnerHTML={{ __html: ques.ques }}></div>
               ) })}
             </div>
            :''
            }
            </>
      )
              })}
      
          </div>

    
  </div>

 <div className="col-sm-6 text-center">
        <h2 className="text-center text-white mb-2">Pay</h2>
        <div>
          <img src="images/qr.png" />
        </div>
        <div>
          <a href="#">Choose another option</a>
        </div>
        <div>
        
          <button className="btn btn-primary" onClick={paymentHandler}>Pay</button>
        </div>
      </div>
</div>

</div>
   
  </div>   
  );
};

export default Questions;
