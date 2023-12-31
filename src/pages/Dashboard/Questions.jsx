// @flow
import React, { useEffect, useState ,useRef } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';


import { useSelector } from "react-redux";
import QuestionRequest from "./../../APIRequest/QuestionRequest";

import { useNavigate } from "react-router-dom";






const Questions = () => {
   const navigate = useNavigate();
   const key =process.env.REACT_APP_ROZAR_KEY;

   const ref = useRef([]);
   const [checked, setChecked] = useState([]);
   const [userDetails, setuserDetails] = useState('');
   const [cateListData, setcateListData] = useState([]);
   
   
   if(JSON.parse(localStorage.getItem('anspage'))=="1"){
       navigate("/answers");
   }

   if( JSON.parse(localStorage.getItem('quesCatData'))){
       localStorage.removeItem('quesCatData');
    }
  
  useEffect(() => {
    QuestionRequest.QuestionListData();
    let userData = JSON.parse(localStorage.getItem("UserDetails"));
    setuserDetails(userData);
    catListData();
    
    //userDetails.tob=format(new Date('12/08/2023 '+userDetails.tob), 'hh:mm a');
    
    

  }, []);
  const { QuestionListData, TotalQuestion } = useSelector(
    (state) => state.Question,
  );
 
  var quesPrice =new Array();
  QuestionListData.forEach(function (quesArr) {
         var quesListArr=quesArr.ques;
         quesListArr.forEach(function (ques) {
          quesPrice.push(ques.price)
        });
  });
  //   alert(quesPrice.length);
  var pricetotal = 0;
      for (var i = 0; i < quesPrice.length; i++) {
          pricetotal += quesPrice[i]
      } 

  
 // userDetails.dob=format(new Date(userDetails.dob), 'dd MMM yyyy');
if(userDetails){

  var dob =format(new Date(userDetails.dob), 'dd MMM yyyy');
  var time =format(new Date('12/08/2023 '+userDetails.tob), 'hh:mm a');
}
  

  const paymentHandler = async (e) => {

     let postBody1 = JSON.parse(localStorage.getItem('productData'));
     let amount = pricetotal;     
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

 var catObjs ={};
 const catListData = async () => {
        
       const API_URL =process.env.REACT_APP_API_URL+'user/';
       const catUrl = `${API_URL}getQuesCategory`;
       
       const response = await Axios.post(catUrl,{});
       if(response.data.data.length > 0){
           response.data.data.forEach(function (cat) {
            catObjs[cat.Name] =cat.img;

           });


        setcateListData(catObjs);
       }
  }
  
  var cateListDataarray =cateListData;
  
  var totalCat = JSON.parse(localStorage.getItem('productData'));
  var totalamount = pricetotal;




  

  return (
    <>

  <div className="w3l-signinform">   <div className="container">
    <div className="col-sm-12 ">
      
     </div>
    <div className="homebutton text-center">
        
          <Link to="/account/logout"><button className="btn btn-info homebutton"><i className="fa fa-home fa-1" aria-hidden="true"></i> Home</button></Link>
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
          <React.Fragment key={index}> 
             
            {
            record!=null ?
             <div className="removedivcls">
               <h4  className="catClass" ><i className={ 'fa '+cateListDataarray[record.catName]} aria-hidden="true" /> {record.catName} {record.apiId}</h4>
               {record.ques?.map((ques, index) => {
                        return (
               <div className="removeComma" dangerouslySetInnerHTML={{ __html: ques.ques }}></div>
               ) })}
             </div>
            :''
            }
           
            </React.Fragment> 
      )
              })}
      
          </div>

    
  </div>

 <div className="col-sm-6 text-center">
 <table className="table table-bordered"  style={{color:"#fff"}}>
        
        <tbody>
          
          <tr>
            <th scope="row">User Name</th>
            <td>{userDetails['name']}</td>
            
          </tr>
          <tr>
            <th scope="row">DOB</th>
            <td colSpan={2}>{dob}</td>
           
          </tr>
          <tr>
            <th scope="row">Time </th>
            <td colSpan={2}>{time}</td>
           
          </tr>
          <tr>
            <th scope="row">Place </th>
            <td colSpan={2}>{userDetails['city']},{userDetails['stateName']},{userDetails['countryName']}</td>
           
          </tr>
        </tbody>
      </table>
      
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
