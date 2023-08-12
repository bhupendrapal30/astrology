// @flow
import React, { useEffect, useState ,createContext,useRef } from "react";
import { format } from 'date-fns';
import * as yup from "yup";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { VerticalForm, FormInput } from "../../components/Ui";
import AuthRequest from "../../APIRequest/AuthRequest";
import { useSelector } from "react-redux";
import QuestionRequest from "./../../APIRequest/QuestionRequest";
import { useNavigate } from "react-router-dom";




// components
import Timeline from "../../components/Ui/Timeline";
import TimelineItem from "../../components/Ui/TimelineItem";
import CardTitle from "../../components/Ui/CardTitle";
import Modal from 'react-bootstrap/Modal';




const Pdflink = () => {
  const navigate = useNavigate();

   const ref = useRef([]);
   const [checked, setChecked] = useState([]);
   const [orderDetails, setorderDetails] = useState('');
   
  

   
  
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('anspaidpdf'))=="1"){
       localStorage.setItem('anspage', JSON.stringify("1"));
       
    }else {
     navigate("/pdf-products");
    }
    orderdetails();
    QuestionRequest.PdfDownloadLink();
    
    
  }, []);
  const { PdfListData, TotalQuestion } = useSelector(
    (state) => state.Question,
  );
  if(PdfListData.length> 0){
    var pdflink =PdfListData[0].pdfpath;
  }

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



  return (
  <div className="w3l-signinform">   <div className="container">
   
    <div className="row">
      <div className="col-sm-12 ">
      <div  className=" pull-right ">
        
          <Link to="/account/logout"><button className="btn btn-primary pull-right">Home</button></Link>
        </div>
     </div>
      <div className="col-sm-6 border-right border-white">
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
          
        </div>
        
        <div>
        {PdfListData?.map((record, index) => {
                        return (
             <>
            {
            index==0 ?
          <a href={record.pdfpath}><button className="btn btn-primary"><i className="fa fa-download"></i>&nbsp;Download Pdf</button></a>
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
