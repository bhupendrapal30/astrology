//Exteral Lib Import
import React, { useEffect, useState ,createContext,useRef } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Axios from 'axios';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form ,ErrorMessage, Field} from "formik"
import { useTranslation } from "react-i18next";
import ToastMessage from "../../helpers/ToastMessage";


//Internal Lib Import
import { VerticalForm, FormInput } from "../../components/Ui";
import AccountLayout from "./AccountLayout";
import AuthRequest from "../../APIRequest/AuthRequest";
import RestClient from "../../APIRequest/RestClient";
import QuestionRequest from "../../APIRequest/QuestionRequest";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Autocomplete from '../../pages/Account/Autocomplete';

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

   const [cityval, setcityval] = React.useState("");
  
  const { PlaceData } = useSelector((state) => state.Question);
    useEffect(() => {
      
      QuestionRequest.getToken();
      //QuestionRequest.placeListData();
    
    

       
     
  }, []);

  //console.log(PlaceData);
  
  
  

  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("Please enter the name")),
    tob: yup.string().required(t("Please enter the tob")),
   
    mobileNo: yup.string().required(t("Please enter the mobile no")),
    
    
  

  });

  /*
    handle form submission
    */
  const onSubmit = (formData) => {
    formData.latlong=latlong;
    formData.placeNew=placeVal;
    if(placeVal!="" && latlong!=""){
      AuthRequest.addUserData(formData);
    }else{
      ToastMessage.errorMessage("Please enter your birth place !!!");
    }

    
  };
   var placeData='';
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
  var yesterday = new Date(date.getTime());
   yesterday.setDate(date.getDate() - 1);
  const formattedDate = yesterday.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('/').reverse().join('-');

  
  
  var placeData='';
  const handleOnSearch = async (string, results) => {
    let gettoken = localStorage.getItem('getToken');
     const API_URL =process.env.REACT_APP_ASTRO_OFFICE_API_URL+'place/search-place';
     const orderUrl = API_URL;
     Axios.defaults.headers.common['Authorization'] = 'Bearer '+gettoken;
     const response = await Axios.post(orderUrl,{district:string});
     setcityval(response.data.data);
     
  }

  var movieItems = '';
  if(cityval.length > 0 ){

   movieItems = cityval.map((el,index) => ({
      id: index,
      title: el.countryName+'--'+el.StateName+'--'+el.placeName,
      description: el.latitude+'--'+el.longitude,
    
    
  }));
   //console.log(movieItems);
 }
 
  // const handleOnSearch = (string, results) => {
  //   console.log(string, results);
  // };

  const handleOnHover = (result) => {
   // console.log(result);
  };

  const handleOnSelect = (item) => {
    var placejson =item;
    sethiddenVal(placejson.description);
    setplaceVal(placejson.title);
    
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  const formatResult = (item) => {
    
    return (
      <div className="result-wrapper">
        <span className="result-span">id: {item.id}</span>
        <span className="result-span">name: {item.name}</span>
      </div>
    );
  };
 
 
  
  

  return (
    <>

   
    <div className="w3l-signinform"> 
       <div className="wrapper">
         
          <div className="w3l-form-info">
            <div className="w3_info">
              <h1>Have A Question?</h1>

              <Formik
      initialValues={{ name: "", dob: "",tob:"",mobileNo:"",atype:""}}
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
                    placeholder={t("Enter your name")}
                    containerclass={"mb-3"}
                    >
                  </Field>
                  <div className="errorformCls"><ErrorMessage name="name" /></div>
                </div>
                <div className="input-group rounded-0 tooltip1">
                  <i className="fa fa-calendar" aria-hidden="true"> </i>
                  
                  <Field
                          type="text"
                          name="dob"
                          data-date="" 
                          data-date-format="DD MMMM YYYY"
                          max={formattedDate}
                          onFocus={(e) => e.target.type = 'date'}
                          // onFocus="(this.type='date')"
                          placeholder={t("Enter your birth date")}
                          containerclass={"mb-3"}>
                    </Field>
                    <div className="errorformCls"><ErrorMessage name="dob"  /></div>
                </div>

               

                <div className="input-group rounded-0 tooltip1">
                <i className="fa fa-clock-o" aria-hidden="true" />
                 
                  <Field
                    type="text"
                    name="tob"
                    onFocus={(e) => e.target.type = 'time'}
                    placeholder={t("Enter your birth time")}
                    containerclass={"mb-3"}
                    >
                  </Field>
                   <div className="errorformCls"><ErrorMessage name="tob" /></div>
                </div>
                <div className="input-group rounded-0">
                  <span><i className="fa fa-map-marker" aria-hidden="true" /></span>
                  
                  
                  <ReactSearchAutocomplete
            items={movieItems}
            fuseOptions={{ keys: ["title", "description"] }} // Search on both fields
            resultStringKeyName="title" // String to display in the results
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            showIcon={false}
            styling={{
              height: "34px",
              border: "1px solid darkgreen",
              borderRadius: "4px",
              backgroundColor: "white",
              boxShadow: "none",
              hoverBackgroundColor: "lightgreen",
              color: "darkgreen",
              fontSize: "12px",
              fontFamily: "Courier",
              iconColor: "green",
              lineColor: "lightgreen",
              placeholderColor: "darkgreen",
              clearIconMargin: "3px 8px 0 0",
              zIndex: 2,
            }}
          />
                  
                
                 <div className="errorformCls"><ErrorMessage name="place" /></div>

               
            </div>
            
                 

              
                <div className=" input-group rounded-0">
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
                <button className="btn btn-primary btn-block" type="submit">Submit <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></button>
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
