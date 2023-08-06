// @flow
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { VerticalForm, FormInput } from "../../components/Ui";
import AuthRequest from "../../APIRequest/AuthRequest";



import { useSelector } from "react-redux";
// import SummaryRequest from "../../APIRequest/SummaryRequest";
// import DepartmentHead from "./DepartmentHead";
// import StaffListCom from "./StaffList";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { UserDetails } = useSelector((state) => state.User);
  console.log(UserDetails);
  useEffect(() => {
    // EmployeeRequest.EmployeeList(1, 5, 0);
    // SummaryRequest.DashboardSummaryAdmin();
    // EmployeeRequest.DepartmentHeads();
    // EmployeeRequest.StaffList();
  }, []);

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
    AuthRequest.addUserData(formData);
  };
  

  return (
    <>
    <div className="w3l-signinform"> 
       <div className="wrapper">
         
          <div className="w3l-form-info">
            <div className="w3_info">
              <h1>Have A Question?</h1>
             
              <VerticalForm
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          defaultValues={UserDetails}
        >
         

          

          
       
                <div className="input-group">
                  <span><i className="fa fa-user" aria-hidden="true"  test={UserDetails.name}/></span>
                  <FormInput
                    type="text"
                    name="name"
                    value={UserDetails?.name}
                    placeholder={t("Name")}
                    containerClass={"mb-3"}
                    >
                  </FormInput>
                </div>
                <div className="input-group rounded-0">
                  <span><i className="fa fa-user" aria-hidden="true" /></span>
                  <FormInput
                          type="date"
                          name="dob"
                         
                          placeholder={t("Enter Date Of Birth")}
                          containerClass={"mb-3"}
                        />
                </div>
                <div className="input-group rounded-0">
                  <span><i className="fa fa-user" aria-hidden="true" /></span>
                  <FormInput
                    type="text"
                    name="tob"
                    placeholder={t("tob")}
                    containerClass={"mb-3"}
                    >
                  </FormInput>
                </div>
                <div className="input-group rounded-0">
                  <span><i className="fa fa-user" aria-hidden="true" /></span>
                  <FormInput
                    type="text"
                    name="place"
                    placeholder={t("Place")}
                    containerClass={"mb-3"}
                    >
                  </FormInput>
                </div>
                <div className="input-group two-groop">
                  <span><i className="fa fa-key" aria-hidden="true" /></span>

                  <FormInput
                    type="text"
                    name="mobileNo"
                    placeholder={t("WhatsApp Number")}
                    containerClass={"mb-3"}
                    >
                  </FormInput>

                  
                </div>
                {/*<button className="btn btn-primary btn-block" type="submit">Submit</button>*/}
             </VerticalForm>
            </div>
          </div>
        </div>
        </div>
    
 

    </>
  );
};

export default AdminDashboard;
