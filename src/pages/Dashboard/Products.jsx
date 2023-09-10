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



const Products = (): React$Element<any> => {


    const navigate = useNavigate();
     let userData =JSON.parse(localStorage.getItem("UserDetails"));
     let user_id =0;
     let userDetail=userData;
     const [showdiv, setshowdiv] = useState(false);
     const [isActive, setActive] = useState(false);
     const [categName, setcategName] = useState();
     const [cateListData, setcateListData] = useState([]);
     let [count, setCount] = useState(0);
     var [queCount, setqueCount] = useState(false);



     

     
    
     
     let tokenVal =localStorage.getItem("AccessToken");
     let quesdataval =JSON.stringify(localStorage.getItem("quesData"));
      
     
     
      useEffect(() => {
        
        if( userDetail && userDetail.atype=='pdf'){
           navigate("/pdf-products");
        }
        

        
       
        catListData();
        if( JSON.parse(localStorage.getItem('quesCatData'))){
            setqueCount(JSON.parse(localStorage.getItem('quesCatData')));
        }
       
    }, []);


     const [show, setShow] = useState(false);
     const [valCatId, setvalCatId] = useState(0);
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

      
    const showButton =val => {
        
        setshowdiv(val);
    };

    const handleChange  = async (e) => {


    
    if(e.target.checked){

      console.log(e.currentTarget.checked);

      showButton(false);
      setActive(true);
      ToastMessage.successMessage("Please wait....");
       setShow(true);
       setCount(Number(count) + 1);

       let catId =e.target.value;
        catNameData(catId);
        setvalCatId(catId);
       //QuestionRequest.QuestionList(catId);
      const API_URL =process.env.REACT_APP_API_URL+'user/';
      e.preventDefault();
       
       let userData =JSON.parse(localStorage.getItem("UserDetails"));
       let user_id =0;
       let userDetail=userData;
       if(userDetail){
        user_id =userDetail.user_id;
       }
      let token = localStorage.getItem("getToken");
      let postBody ={"user_id":user_id,"token":token,"catId":catId}
      const saveUrl = `${API_URL}questionsinsert`;
      const response = await Axios.post(saveUrl,postBody);
      
      
      if(response.data.status){
          setvalCatId(catId);
          QuestionRequest.QuestionList(catId);
          
          //hideLoder();
          myRefname.current.click();

      }else{
        setvalCatId(catId);
        QuestionRequest.QuestionList(catId);
        myRefname.current.click();
        
      }
      setActive(false);
      
    }else{
      setCount(count-= 1);
       if(count === 0){
         showButton(false);
        }
      
    }
  }

    
  const catNameData = async (catId) => {
        
       const API_URL =process.env.REACT_APP_API_URL+'user/';
       const orderUrl = `${API_URL}getcategory`;
       
       const response = await Axios.post(orderUrl,{catId:catId});
       setcategName(response.data.data.Name);
  }

  const catListData = async () => {
        
       const API_URL =process.env.REACT_APP_API_URL+'user/';
       const catUrl = `${API_URL}getQuesCategory`;
       
       const response = await Axios.post(catUrl,{});
       if(response.data.data.length > 0){
        setcateListData(response.data.data);
       }
  }
  
  var cateListDataarray =cateListData;
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
        
          <Link to="/account/logout"><button className="btn btn-info homebutton"><i className="fa fa-home fa-1" aria-hidden="true"></i> Home</button></Link>
        </div>
                    <h1 className="quiz_title text-white">Product name for Question creation</h1>
                    <div className="row">
                     
              {cateListDataarray?.map((record, index) => {
                        return (
                       <React.Fragment key={index}> 
                     {
                      
                      


                      
                      <div className="col-sm-3 col-6">
                        <div className="quiz_card_area">
                          <Field className="quiz_checkbox" id={index}   name="products" onClick={handleChange}  type="checkbox"  value={`${record['apiId']}`} />
                         
                          <div className="single_quiz_card">
                            <div className="quiz_card_content">
                              <div className="quiz_card_icon">
                                <i className={ 'fa '+ record['img']} aria-hidden="true" />
                                {record['apiId']=="58" ? <i className="fa fa-caret-up text-succes" aria-hidden="true" />:""}
                                {record['apiId']=="59" ? <i className="fa fa-caret-down text-danger" aria-hidden="true" />:""}
                                
                                

                              </div>
                              <div className="quiz_card_title">
                                <h3><i className="fa fa-check" aria-hidden="true" /> {record['Name']} 
                                {queCount[record['apiId']] ? 
                                <span>({(queCount[record['apiId']])})</span>:""}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                   

                 }
                </React.Fragment>  
                   )
              })}
                      
                      <div className="col-sm-12">
                        <div className="quiz_next">
                           <div  ref={myRefname} style={{display:"none"}}   data-toggle="modal"  data-target="#myModal">Continue</div>
                          {showdiv ?
                          <button className="quiz_continueBtn" type="submit"   >Continue</button>:'' }
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
    {
    show  ? 
     <Popup valCatId={valCatId} setCatId={setvalCatId} categName={categName} showButton={showButton} />
     :''}
      
  
      
     </>

    

    );
};

export default Products;
