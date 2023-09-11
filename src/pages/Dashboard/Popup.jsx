// @flow
import React, { useEffect, useState ,createContext,useRef } from "react";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { VerticalForm, FormInput } from "../../components/Ui";
import AuthRequest from "../../APIRequest/AuthRequest";
import { useSelector } from "react-redux";
import Axios from 'axios';
import QuestionRequest from "./../../APIRequest/QuestionRequest";
import ToastMessage from "../../helpers/ToastMessage";


// components
import Timeline from "../../components/Ui/Timeline";
import TimelineItem from "../../components/Ui/TimelineItem";
import CardTitle from "../../components/Ui/CardTitle";
import Modal from 'react-bootstrap/Modal';




const Popup = (props) => {

   //const ref = useRef([]);
   const myRefnamenew= useRef(null);
    const ref = useRef([]);
   const [checked, setChecked] = useState([]);
   const [catName, setcatName] = useState('');


  // setcatName();
   
 useEffect(() => {
    // EmployeeRequest.EmployeeList(1, 5, 0);
       //catNameData(props);
       QuestionRequest.QuestionLogin();
      
       
      //QuestionRequest.QuestionList(props.valCatId);
    // EmployeeRequest.StaffList();
  }, []);
  
  const { QuestionLists, TotalQuestion } = useSelector(
    (state) => state.Question,
  );

  const addQuestions=(event)=>{
       const uniqueTags = [];
   
   

  }

const checkQuestion=()=>{
  var quesdataval =localStorage.getItem("quesData");
  
 if (quesdataval !== undefined && quesdataval != null) {
    props.showButton(true);
  }
  

}

const handleCheck = (event) => {
  
};

    const initialValues = {
       questions: []
    }
     
    const validationSchema = yup.object({
         questions: yup.array().required('At least select one question')
    })
      const onSubmit = (questions) => {
             //console.log(props);
           
            let questData = questions.questions;
            let questStorewithkey={};
            //console.log(questData);
            //alert(questData.length);
            if(questData.length > 0 ){
              
              let newQueArre =new Array();
              questData.forEach(function (value) {
                   let splival = value.split("-");
                   newQueArre.push(splival[0]);
              });
              
               var oldque =[];
              if(localStorage.getItem('quesData')){
                  oldque =  JSON.parse(localStorage.getItem('quesData'));
              }
             
              var catvalueId = props.valCatId;
             

              var totalQues ={};
              if((newQueArre.length) > oldque.length){
                totalQues[catvalueId] =newQueArre.length -oldque.length;
              }else{
                totalQues[catvalueId] =oldque.length -newQueArre.length;
              }
              var oldqueobject ={};
              if(localStorage.getItem('quesCatData')){
                 oldqueobject =  JSON.parse(localStorage.getItem('quesCatData'));
                 console.log(oldqueobject);
                 var merged = {...oldqueobject, ...totalQues};
              }else{
                 var merged = totalQues;
              }

            
                
           
              //localStorage.setItem('quesCatData', JSON.stringify(totalQues));
              localStorage.setItem('quesData', JSON.stringify(newQueArre));

              localStorage.setItem('quesCatData', JSON.stringify(merged));
              props.showButton(true);
              props.questionsCountval();
              //Formik.resetForm();
              ToastMessage.successMessage("Added your questions successfully !!!");
              myRefnamenew.current.click();
            }else{
               ToastMessage.errorMessage("Please add your questions !!!");
            }
      }
      

    

  
  
  const Unchecked = () => {
     var lt = (ref.current.length)-1;
        for (let i = 0; i < lt; i++) {
         ref.current[i].checked = false;
        }
        checkQuestion();
    }

    var checkData = QuestionLists.length>0?true:false;

   



  return (
    
    <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          {/* Modal content*/}
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title"><strong>{props.categName ? props.categName:""}</strong> Verify question</h4>
              <button type="button" className="close" onClick={checkQuestion} data-dismiss="modal">×</button>
            </div>
            <div className="modal-body">


             <Formik initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={onSubmit}>
             
         
           <Form>
              
              {QuestionLists?.map((record, index) => {
                        return (
             <React.Fragment key={index}>    
                <>
            {
            record!=null ?

             
          <div className="form-check" >
              
           <Field className="form-check-input checkboxcls" id={"opt-in"+index} name="questions" data-value={record.qid}  value={record.qid +'-'+record.ques}  type="checkbox" 
 />
                <label className="form-check-label" htmlFor="flexCheckDefault"  htmlFor={"opt-in"+index} >
                 <div style={{"fontWeight":"700"}} dataindex={index+1} dangerouslySetInnerHTML={{ __html: record.ques }} />
                 
                </label>
              </div>
             
              :''
            }
            </>
             </React.Fragment>
              );
              })}
              
              <div  ref={myRefnamenew} style={{display:"none"}}  data-dismiss="modal">Continue</div>
              <button className="quiz_continueBtn" type="submit"   >Continue</button>
              </Form>
        
            </Formik>
            </div> 
            <div className="modal-footer newBtn">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={Unchecked}  >Close</button>
            </div>
          </div>
        </div>
      </div>
   
     
  );

};

export default Popup;
