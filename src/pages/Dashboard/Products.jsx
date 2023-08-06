// @flow
import React, { useEffect, useState,useRef,createContext} from "react";
import { Card, Table } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthRequest from "../../APIRequest/AuthRequest";
import RestClient from "../../APIRequest/RestClient";
import QuestionRequest from "../../APIRequest/QuestionRequest";
import Popup from "../Dashboard/Popup";
import { useNavigate } from "react-router-dom";

const Products = (): React$Element<any> => {


  const navigate = useNavigate();
     let userData =JSON.parse(localStorage.getItem("UserDetails"));
     let user_id =0;
     let userDetail=userData;
     
      useEffect(() => {
       
       document.getElementsByClassName("d-none")[0].style.visibility = 'hidden';
        if(userDetail.atype=='pdf'){
        navigate("/pdf-products");
     }
       
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
        localStorage.setItem('productCat', JSON.stringify(formData));
        let catData = JSON.parse(localStorage.getItem('productData'));
        if(catData){
          var catId=catData.products.toString();
        }
        navigate("/questions");
       
      };

      const handleChange = (event) => {
        if(event.target.checked){
          let catId =event.target.value;
          QuestionRequest.QuestionList(catId);
          QuestionRequest.postQuestionData(catId);
          setCatId(catId);
          myRefname.current.click();


        }
      }

    
     

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
                    <h1 className="quiz_title text-white">Product name for Question creation</h1>
                    <div className="row">
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox"   name="products" onClick={handleChange}  type="checkbox"  value="57" />
                         
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-comments" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> General</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="checkbox"  value="68" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-blind" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> parent</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="checkbox"  value="1" />
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className="fa fa-calendar" aria-hidden="true" />
                              </div>{/* end of quiz_card_media */}
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> date finder</h3>
                              </div>{/* end of quiz_card_title */}
                            </div>{/* end of quiz_card_content */}
                          </div>{/* end of single_quiz_card */}
                        </div>{/* end of quiz_card_area */}
                      </div>{/* end of col3  */}
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="checkbox" value="64" />
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
                          <Field className="quiz_checkbox" name="products" onClick={handleChange} type="checkbox"  value="62" />
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
                          <Field className="quiz_checkbox" name="products" type="checkbox" onClick={handleChange}  value="58" />
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
                           <div  ref={myRefname} style={{display:"none"}}   data-toggle="modal"  data-target="#myModal">Continue</div>
                          <button className="quiz_continueBtn" type="submit"   >Continue</button>
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
     <Popup valCatId={valCatId} setCatId={setCatId} />
      
     </>



    );
};

export default Products;
