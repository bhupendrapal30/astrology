// @flow
import React, { useEffect, useState ,createContext,useRef } from "react";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { VerticalForm, FormInput } from "../../components/Ui";
import AuthRequest from "../../APIRequest/AuthRequest";
import { useSelector } from "react-redux";
import QuestionRequest from "./../../APIRequest/QuestionRequest";


// components
import Timeline from "../../components/Ui/Timeline";
import TimelineItem from "../../components/Ui/TimelineItem";
import CardTitle from "../../components/Ui/CardTitle";
import Modal from 'react-bootstrap/Modal';




const Popup = (props) => {

   const ref = useRef([]);
   const [checked, setChecked] = useState([]);
   const myRefnamenew= useRef(null);
   const [isChecked, setIsChecked] = useState(false)


   
  console.log(props);
  useEffect(() => {
    // EmployeeRequest.EmployeeList(1, 5, 0);
       QuestionRequest.QuestionLogin();
       // QuestionRequest.QuestionList(props.valCatId);
    // EmployeeRequest.StaffList();
  }, []);
  
  const { QuestionLists, TotalQuestion } = useSelector(
    (state) => state.Question,
  );

  const addQuestions=(event)=>{
       const uniqueTags = [];
   //      checked.map(val => {
   //  if (uniqueTags.indexOf(val) === -1) {
   //      uniqueTags.push(val)
   //  }
   // });
   

  }

  const checkHandler = (event) => {

    var isChecked = event.target.checked;  
        var item = event.target.value;  
           
   
   
   }

const handleCheck = (event) => {
  var updatedList = [...checked];
  if (event.target.checked) {
    updatedList = [...checked, event.target.value];
  } else {
    updatedList.splice(checked.indexOf(event.target.value), 1);
  }
  let objArry =[];

   objArry[props.valCatId]=updatedList;
   console.log(objArry);
  setChecked(updatedList);
};

    const initialValues = {
       questions: []
    }
     
    const validationSchema = yup.object({
         questions: yup.array().required('At least select one question')
    })
      const onSubmit = (questions) => {
          
        localStorage.setItem('quesData', JSON.stringify(questions));
        myRefnamenew.current.click();
      }

    

   const [checkboxVal, setcheckboxVal] = useState({
    questions: [],
   
   });
  
  const handleChangeCheckbox = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { questions } = checkboxVal;
     console.log(e.target);
    console.log(`${value} is ${checked}`);
     
    // Case 1 : The user checks the box
    if (checked) {
      setcheckboxVal({
        questions: [...questions, value],
        
      });
    }
  
    // Case 2  : The user unchecks the box
    else {
      setcheckboxVal({
        questions: questions.filter((e) => e !== value),
        
      });
    }
  };




       const Unchecked = () => {

        var lt = (ref.current.length)-1;
        for (let i = 0; i < lt; i++) {
         ref.current[i].checked = false;
        }

    }
    const Checked = () => {
      alert('hii');
      for (let i = 0; i < ref.current.length; i++) {
          ref.current[i].checked = true;
        }

    }
    var checkData = QuestionLists.length>0?true:false;



  return (
    
    <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          {/* Modal content*/}
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Verify question</h4>
              <button type="button" className="close" data-dismiss="modal">×</button>
            </div>
            <div className="modal-body">
             <Formik initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={onSubmit}>
              
         
           <Form>

              {QuestionLists?.map((record, index) => {
                        return (
                
              <div className="form-check" key={index}>
               <Field className="form-check-input" name="questions"  checked={false}  id="flexCheckDefault" type="checkbox" 
value={record.qid} />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                 <div style={{"fontWeight":"700"}} dataindex={index+1} dangerouslySetInnerHTML={{ __html: record.ques }} />
                 
                </label>
              </div>
              
              );
              })}
              
              <div  ref={myRefnamenew} style={{display:"none"}}   data-dismiss="modal">Continue</div>
              <button className="quiz_continueBtn" type="submit"   >Continue</button>
              </Form>
        
            </Formik>
            </div> 
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={Unchecked}  >Close</button>
            </div>
          </div>
        </div>
      </div>
   
     
  );

};

export default Popup;
