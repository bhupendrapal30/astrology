// @flow
import React, { useEffect, useState ,createContext,useRef } from "react";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import Axios from 'axios';
import { format } from 'date-fns';
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
   const [orderDetails, setorderDetails] = useState('');
   const [file, setfile] = useState('');
   //localStorage.setItem('anspage', JSON.stringify("1"));

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('anspaidpdf'))=="1"){
       localStorage.setItem('anspage', JSON.stringify("1"));
       
    }else {
     navigate("/questions");
    }
    orderdetails();
    QuestionRequest.AnswerListData();
    
    if(localStorage.getItem("quespdffile")){
      setfile(localStorage.getItem("quespdffile"));
    }else{
      generatePdf();
    }
  

    
  }, []);
  const { AnswerListData, TotalQuestion } = useSelector(
    (state) => state.Question,
  );

  const orderdetails = async (e) => {
    const API_URL =process.env.REACT_APP_API_URL+'user/';
    
     let userData = JSON.parse(localStorage.getItem("UserDetails"));
     let user_id =0;
     let userDetail=userData;
     if(userDetail){
      user_id =userDetail.user_id;
     }
     const orderUrl = `${API_URL}orderdeatils`;
     const response = await Axios.post(orderUrl,{user_id:user_id});
     //alert(response.data.data.length);
     if(response.data.data.length > 0){
      let orderdata= response.data.data[0];
          orderdata.dob=format(new Date(orderdata.dob), 'dd MMM yyyy');
          orderdata.tob=format(new Date('12/08/2023 '+orderdata.tob), 'hh:mm a');
          
      setorderDetails(response.data.data[0]);
     }
   }
  const generatePdf = async (e) => {
             const whatsupToken = await Axios.post(process.env.REACT_APP_WHATSUP_API_URL,{username:process.env.REACT_APP_WHATSUP_USERNAME,password:process.env.REACT_APP_WHATSUP_PASSWORD});
    var whtoken ='';
    if(whatsupToken.data.JWTAUTH){
      whtoken =whatsupToken.data.JWTAUTH;
    }
    let userData = JSON.parse(localStorage.getItem("UserDetails"));
    let user_id =0;
    let userDetail=userData;
    if(userDetail){
      user_id =userDetail.user_id;
     }
    let token = localStorage.getItem("getToken");
    let postBody1 = JSON.parse(localStorage.getItem('quesData'));
    let catData =JSON.parse(localStorage.getItem('productData'));
    let postBody = {ques:postBody1 ,catIds:catData.products,user_id:user_id,token:token,whtoken:whtoken}
    const API_URL =process.env.REACT_APP_API_URL+'user/'; 
    const orderUrl = `${API_URL}questionspdf`;
    const response = await Axios.post(orderUrl,postBody);
    if(response['data']['data']['success']==1){
         localStorage.setItem('quespdffile',response['data']['data']['data']['pdfurl']);
         //setshowbutton(true);
         setfile(response['data']['data']['data']['pdfurl']);
     }

  }

  
  
  
 
  

  return (
  <div className="w3l-signinform">  
   <div className="container">
    <div className="homebutton text-center">
        
          <Link to="/account/logout"><button className="btn btn-info homebutton"><i className="fa fa-home fa-1" aria-hidden="true"></i> Home</button></Link>
        </div>
    <div className="row">
      <div className="col-sm-9 ">
      <div className="col-sm-12 ">
      
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
  
 <div className="col-sm-3 " style={{marginTop:"30px"}}>
       {orderDetails  ?
       <table className="table table-bordered"  style={{color:"#fff"}}>
        
        <tbody>
          <tr>
            <th scope="row">ORDER ID</th>
            <td>{orderDetails['order_id']}</td>
            
          </tr>
          <tr>
            <th scope="row">Amount</th>
            <td>Rs {orderDetails['amount']}</td>
            
          </tr>
          <tr>
            <th scope="row">User Name</th>
            <td>{orderDetails['name']}</td>
            
          </tr>
          <tr>
            <th scope="row">DOB</th>
            <td colSpan={2}>{orderDetails['dob']}</td>
           
          </tr>
          <tr>
            <th scope="row">Time </th>
            <td colSpan={2}>{orderDetails['tob']}</td>
           
          </tr>
          <tr>
            <th scope="row">Place </th>
            <td colSpan={2}>{orderDetails['city']},{orderDetails['stateName']},{orderDetails['countryName']}</td>
           
          </tr>
        </tbody>
      </table> :'' }
      <div>
      {file ?<Link to={file}><button type="button" class="btn btn-success">Download Pdf <i class="fa fa-file-pdf-o" aria-hidden="true"></i> </button></Link>:
      <button type="button" class="btn btn-success" onClick={generatePdf}>Generate Pdf  <i class="fa fa-file-pdf-o" aria-hidden="true"></i></button>}</div>
   </div>
 
</div>
</div>
   
  </div>   
  );
};

export default Answer;
