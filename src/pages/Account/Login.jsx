//Exteral Lib Import
import React, { useEffect, useState ,createContext,useRef } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form ,ErrorMessage, Field} from "formik"
import { useTranslation } from "react-i18next";


//Internal Lib Import
import { VerticalForm, FormInput } from "../../components/Ui";
import AccountLayout from "./AccountLayout";
import AuthRequest from "../../APIRequest/AuthRequest";
import RestClient from "../../APIRequest/RestClient";
import QuestionRequest from "../../APIRequest/QuestionRequest";

/* bottom link of account pages */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        
      </Col>
    </Row>
  );
};

const Login = () => {
  
   const [placeVal, setplaceVal] = React.useState("");

   const [latlong, sethiddenVal] = React.useState("");
  
  const { PlaceData } = useSelector((state) => state.Question);
    useEffect(() => {
      loadData()
      QuestionRequest.getToken();
      //QuestionRequest.placeListData();
    
    

       
     
  }, []);

  console.log(PlaceData);

  function loadData() {
    
      
   }
  

  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("Please enter the name")),
    tob: yup.string().required(t("Please enter the tob")),
    place: yup.string().required(t("Please enter the place")),
    mobileNo: yup.string().required(t("Please enter the mobile no")),
    
    
  

  });

  /*
    handle form submission
    */
  const onSubmit = (formData) => {
    formData.latlong=latlong;
    formData.placeNew=placeVal;
    console.log(formData);
    AuthRequest.addUserData(formData);
  };

   const onPlaceChange= async (e) => { 

      if(e.target.value!=""){
       var placeData =QuestionRequest.placeListData(e.target.value);
      }
       

  }

  const getCityAttr= async (e) => { 
       var index = e.target.selectedIndex;
       var optionElement = e.target.childNodes[index]
       var option =  optionElement.getAttribute('data-id');
       sethiddenVal(option);
       setplaceVal(e.target.value);

  }
  

 
 
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');

  

  
  

  return (
    <>

   
    <div className="w3l-signinform"> 
       <div className="wrapper">
         
          <div className="w3l-form-info">
            <div className="w3_info">
              <h1>Have A Question?</h1>

              <Formik
      initialValues={{ name: "", dob: "",tob:"",place:"",mobileNo:"",atype:""}}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form>
            
              

          

          
       
                <div className="input-group">
                  <span><i className="fa fa-user" aria-hidden="true" /></span>
                  <Field
                    type="text"
                    name="name"
                    placeholder={t("Name")}
                    containerclass={"mb-3"}
                    >
                  </Field>
                  <div className="errorformCls"><ErrorMessage name="name" /></div>
                </div>
                <div className="input-group rounded-0">
                  <span><i className=" fa fa-calendar" aria-hidden="true" /></span>
                  <Field
                          type="date"
                          name="dob"
                          max={formattedDate}
                          placeholder={t("Enter Date Of Birth")}
                          containerclass={"mb-3"}>
                    </Field>
                    <div className="errorformCls"><ErrorMessage name="dob"  /></div>
                </div>
                <div className="input-group rounded-0">
                  <span><i className="fa fa-clock-o" aria-hidden="true" /></span>
                  <Field
                    type="time"
                    name="tob"
                    placeholder={t("tob")}
                    containerclass={"mb-3"}
                    >
                  </Field>
                   <div className="errorformCls"><ErrorMessage name="tob" /></div>
                </div>
                <div className="input-group rounded-0">
                  <span><i className="fa fa-map-marker" aria-hidden="true" /></span>
                  <Field
                    type="text"
                    name="place"
                   
                    onBlur={onPlaceChange}
                    
                    placeholder={t("Place")}
                    containerclass={"mb-3"}
                    >
                  </Field>
                  
                
                 <div className="errorformCls"><ErrorMessage name="place" /></div>
               
            </div>
             <div className="input-group rounded-0">
                  <span><i className="fa fa-map-marker" aria-hidden="true" /></span>
                   
                   <Field as="select"
                    type="text"
                    name="placeNew"
                    placeholder={t("Place")}
                    containerclass={"mb-3 select option"}
                    className="select option"

                    
                   onChange={getCityAttr}

                    >
                    
                    <option value="">Plese select the city</option>
                    {PlaceData.map((option,index) => (
                      <option value={option.countryName+'--'+option.StateName+'--'+option.placeName}  key={index} data-id={option.latitude+'--'+option.longitude}> {option.countryName+'--'+option.StateName+'--'+option.placeName}</option>
                    ))}
                    
                  </Field>
                  
                 
                  

                 
              </div>
                 

              
                <div className="input-group two-groop">
                  <span><i className="fa fa-whatsapp" aria-hidden="true" /></span>

                  <Field
                    type="text"
                    name="mobileNo"
                    maxLength={10}
                    onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
                    placeholder={t("WhatsApp Number")}
                    containerclass={"mb-3"}
                    className='input-group rounded-0'
                    >
                  </Field>
                  <div className="errorformCls"><ErrorMessage name="mobileNo" /></div>

                  
                </div>
              <div className="input-group two-groop">
                  <span><i className="fa fa-comments" aria-hidden="true" /></span>
              <Field as="select" name="atype">
                 <option value="question">Question-Answers</option>
                 <option value="pdf">PDF</option>
              </Field>
           </div>
                <button className="btn btn-primary btn-block" type="submit">Submit</button>
              </Form>
      )}
    </Formik>
            </div>
          </div>
        </div>
        </div>
         
    </>
  );
};

export default Login;
