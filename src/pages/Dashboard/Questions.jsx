// @flow
import React, { useEffect, useState ,useRef } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';


import { useSelector } from "react-redux";
import QuestionRequest from "./../../APIRequest/QuestionRequest";

import { useNavigate } from "react-router-dom";





const Questions = () => {
   const navigate = useNavigate();
   const key =process.env.REACT_APP_ROZAR_KEY;

   const ref = useRef([]);
   const [checked, setChecked] = useState([]);
   
   
   if(JSON.parse(localStorage.getItem('anspage'))=="1"){
       navigate("/answers");
   }
   
  
  useEffect(() => {
    QuestionRequest.QuestionListData();
   

  }, []);
  const { QuestionListData, TotalQuestion } = useSelector(
    (state) => state.Question,
  );
  
  

  const paymentHandler = async (e) => {
     let postBody1 = JSON.parse(localStorage.getItem('productData'));
     let amount = (postBody1.products.length)*100;
     
     const API_URL =process.env.REACT_APP_API_URL+'user/';
     e.preventDefault();
     let userData = JSON.parse(localStorage.getItem("UserDetails"));
     let user_id =0;
     let userDetail=userData;
     if(userDetail){
      user_id =userDetail.user_id;
     }
     const orderUrl = `${API_URL}order`;
     const response = await Axios.post(orderUrl,{user_id:user_id,amount:amount});
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
     
     if(captureResponse.data.data.id)
      localStorage.setItem('anspaidpdf', JSON.stringify("1"));
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
  
  var totalCat = JSON.parse(localStorage.getItem('productData'));
  var totalamount = (totalCat.products.length)*100;
  

  return (
    <>

  <div className="w3l-signinform">   <div className="container">
    <div className="col-sm-12 ">
      
     </div>
    <div className="homebutton text-center">
        
          <Link to="/account/logout"><button className="btn btn-info homebutton"><i class="fa fa-home fa-1" aria-hidden="true"></i> Home</button></Link>
        </div>
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
               <h4  className="catClass" ><b>{record.catName}</b></h4>
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
        
          <button className="btn btn-primary" onClick={paymentHandler}>Pay (Rs {totalamount})</button>
        </div>
      </div>
</div>

</div>
   
  </div> 
  </>  
  );
};

export default Questions;
