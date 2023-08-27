// @flow
import React, { useEffect, useState,useRef,createContext} from "react";
import { Card, Table } from 'react-bootstrap';
import Axios from 'axios';
import ToastMessage from "../../helpers/ToastMessage";

import { Link } from 'react-router-dom';
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthRequest from "../../APIRequest/AuthRequest";
import RestClient from "../../APIRequest/RestClient";
import QuestionRequest from "../../APIRequest/QuestionRequest";
import Popup from "../Dashboard/Popup";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay-ts';


const Productspdf = (): React$Element<any> => {

  
   const [isActive, setActive] = useState(false);
   const [button, setbutton] = useState(4);


  const navigate = useNavigate();
  const key =process.env.REACT_APP_ROZAR_KEY;

  
      useEffect(() => {

        if(JSON.parse(localStorage.getItem('anspage'))=="1"){
          navigate("/pdflink");
        }
       
       //document.getElementsByClassName("d-none")[0].style.visibility = 'hidden';
       
       
    }, []);
     const [show, setShow] = useState(false);
     const [valCatId, setCatId] = useState(0);
     const myRefname= useRef(null);
    const initialValues = {
       products: []
    }
    const [ff, setValue] = useState('57');  
    const validationSchema = yup.object({
         products: yup.array().required('At least select one category')
    })
      const onSubmit = (formData) => {
        
         
        AuthRequest.saveProductData(formData);
        //localStorage.setItem('productCat', JSON.stringify(formData));
        let catData = JSON.parse(localStorage.getItem('productData'));
        if(catData){
          var catId=catData.products.toString();
        }
        //navigate("/pdflink");
       
      };

      const handleChange = async (event) => {

        if(event.target.checked){
           
            setActive(true);
            setbutton(4);
            let catId =event.target.value;
            localStorage.setItem('productCat', JSON.stringify(catId));
            localStorage.setItem('productData', JSON.stringify(catId));
          //alert(catId);
          // QuestionRequest.QuestionList(catId);
            //QuestionRequest.postPdfCreation(catId);
            
            const API_URL =process.env.REACT_APP_API_URL+'user/';
           
       
           let userData =JSON.parse(localStorage.getItem("UserDetails"));
           let user_id =0;
           let userDetail=userData;
           if(userDetail){
            user_id =userDetail.user_id;
           }
            let token = localStorage.getItem("getToken");
            let postBody ={"user_id":user_id,"token":token,"catId":catId}
            const saveUrl = `${API_URL}pdfinsert`;
            const response = await Axios.post(saveUrl,postBody);
            if(response.data.status){
                setActive(false);
                setbutton(2);
               
            }else{
                setActive(false);
                setbutton(2);
             
            }
            
            setCatId(catId);
         }
         
      }
      

const paymentHandler = async (e) => {

         ToastMessage.successMessage("Please wait....");
         let postBody1 = JSON.parse(localStorage.getItem('productCat'));
         let amt = new Array();
         amt.push(amt);
    
         let amount = (amt.length)*100;
         const whatsupToken = await Axios.post(process.env.REACT_APP_WHATSUP_API_URL,{username:process.env.REACT_APP_WHATSUP_USERNAME,password:process.env.REACT_APP_WHATSUP_PASSWORD});
         var whtoken ='';
         if(whatsupToken.data.JWTAUTH){
            whtoken =whatsupToken.data.JWTAUTH;
         }
         
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
     const captureResponse = await Axios.post(url, {'paymentId':paymentId,user_id:user_id,amount:amount,order_id:data.id,whtoken:whtoken,catId:postBody1})
    if(captureResponse.data.data.id)
       localStorage.setItem('anspaidpdf', JSON.stringify("1"));
       navigate("/pdflink");
      
    }catch (err) {
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
  

   const TotalAmount =100; 
     

    return (
     <>

       <LoadingOverlay active={isActive} spinner text='Loading your content...'></LoadingOverlay> 
    <div className="w3l-signinform">
        <div className="allWrapper">
          <header className="header" id="header">
        <div className="col-sm-12 ">
          
     </div>
          </header>{/* end of header */}
          <section className="quiz_section" id="quizeSection">
            <div className="container">
            <Formik initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}>
        
           <Form>

    
              <div className="row">
                <div className="col-sm-12">
                  <div className="quiz_content_area">
                   <div className="homebutton text-center">
        
          <Link to="/account/logout"><button className="btn btn-info homebutton"><i class="fa fa-home fa-1" aria-hidden="true"></i> Home</button></Link>
        </div>
                    <h1 className="quiz_title text-white">Products name for pdf creation </h1>
                    <div className="row">
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="radio"  value="40" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-child" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Child (Rs {TotalAmount})</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      
                      
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="radio" value="25" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-heartbeat" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Health (Rs {TotalAmount})</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="radio"  value="83" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-car" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Vehicle (Rs {TotalAmount})</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */} 
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="radio"  value="35" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-inr" aria-hidden="true" /><i className="fa fa-caret-down text-danger" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Bad Wealth (Rs {TotalAmount})</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" type="radio" onClick={handleChange}  value="38" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-users" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Married life (Rs {TotalAmount})</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" type="radio" onClick={handleChange}  value="82" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-home" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> House (Rs {TotalAmount})</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" type="radio" onClick={handleChange}  value="36" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-inr" aria-hidden="true" /><i className="fa fa-caret-up text-success" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Good wealth (Rs {TotalAmount})</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" type="radio" onClick={handleChange}  value="81" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-suitcase" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Occupation (Rs {TotalAmount})</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" type="radio"  onClick={handleChange} value="44" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-plane" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Foreign Trip (Rs {TotalAmount})</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-12">
                        <div className="quiz_next">
                        
                          <button className="quiz_continueBtn" onClick={paymentHandler} type="button"  style={{display:button=="2" ? 'block' : 'none' }}>Continue  </button> 
                        </div>{/* end of quiz_next */}
                      </div>{/* end of col12 */}
                    </div>{/* end of quiz_card_area */}
                  </div>{/* end of quiz_content_area */}
                </div>{/* end of col12 */}
              </div>{/* end of row */}
                           </Form>
         
       </Formik>
            </div>{/* end of container */}
          </section>{/* end of quiz_section */}
        </div>
        
     </div>
     
      
     </>



    );
};

export default Productspdf;
