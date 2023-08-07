// @flow
import React, { useEffect, useState,useRef,createContext} from "react";
import { Card, Table } from 'react-bootstrap';
import Axios from 'axios';

import { Link } from 'react-router-dom';
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthRequest from "../../APIRequest/AuthRequest";
import RestClient from "../../APIRequest/RestClient";
import QuestionRequest from "../../APIRequest/QuestionRequest";
import Popup from "../Dashboard/Popup";
import { useNavigate } from "react-router-dom";

const Productspdf = (): React$Element<any> => {


  const navigate = useNavigate();
  const key ='rzp_test_PX2vJ9ubej1UGc';

      useEffect(() => {
       
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

      const handleChange = (event) => {

        if(event.target.checked){
    
          let catId =event.target.value;
          localStorage.setItem('productCat', JSON.stringify(catId));
          localStorage.setItem('productData', JSON.stringify(catId));
          //alert(catId);
          // QuestionRequest.QuestionList(catId);
            QuestionRequest.postPdfCreation(catId);
            setCatId(catId);
         }
      }


      const paymentHandler = async (e) => {
     let postBody1 = JSON.parse(localStorage.getItem('productCat'));
     let amt = new Array();
     amt.push(amt);
      console.log(parseInt(postBody1));
     let amount = (amt.length)*100;
     alert(amount);
     const API_URL ='http://3.111.197.50:5000/api/user/';
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
     navigate("/pdflink");
      
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
     <>
    <div className="w3l-signinform">
        <div className="allWrapper">
          <header className="header" id="header">
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
                    <h1 className="quiz_title text-white">Products name for pdf creation </h1>
                    <div className="row">
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="checkbox"  value="40" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-child" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Child</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      
                      
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="checkbox" value="25" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-heartbeat" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Health</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="checkbox"  value="82" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-car" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Vehicle</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="checkbox"  value="35" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-inr" aria-hidden="true" /><i className="fa fa-caret-down text-danger" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Bad Wealth</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" type="checkbox" onClick={handleChange}  value="38" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-users" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Married life</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" type="checkbox" onClick={handleChange}  value="82" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-home" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> House</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" type="checkbox" onClick={handleChange}  value="36" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-inr" aria-hidden="true" /><i className="fa fa-caret-up text-success" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Good wealth</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" type="checkbox" onClick={handleChange}  value="82" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-suitcase" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Occupation</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" type="checkbox"  onClick={handleChange} value="44" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-plane" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> Foreign Trip</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-12">
                        <div className="quiz_next">
                          <button className="quiz_continueBtn" type="button" onClick={paymentHandler}   >Continue</button>
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
