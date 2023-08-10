//Inter


import { setPdfListData,SetTotalSummary, SetQuestionLists,SetQuestionData,setQuestionListData,setAnswerListData,setPlaceData} from "../redux/slices/QuestionSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";






class QuestionRequest {
  static async QuestionLogin() {
    const { data } = await RestClient.postRequest3(
      `users/login`,{email:"newwebsite",password : "web_@#*"}
    );


    if (data) {
      console.log(data);
      const total = data.length;
      store.dispatch(SetQuestionData(data));
      
      }
  }
  static async removeLoading(id) {
    const { data } = await RestClient.removeLoading();
  }


  static async getToken() {
    const { data } = await RestClient.postRequest3(
      `users/login`,{email:"newwebsite",password : "web_@#*"}
    );


    if (data) {
      console.log(data);
      localStorage.setItem('getToken',data.token);
      const total = data.length;
      // store.dispatch(SetQuestionData(data));
      
      }
  }
  static async removeLoading(id) {
    const { data } = await RestClient.removeLoading();
  }

  static async QuestionList(id) {
     
     if(id){
      var catId=id;
     
     }
    let userData =JSON.parse(localStorage.getItem("UserDetails"));
    let user_id =0;
    let userDetail=userData;
    if(userDetail){
      user_id =userDetail.user_id;
     }
     var postBody1 = {"catId":catId,user_id:user_id}
     const { data} = await RestClient.postRequest2("user/questions",postBody1);
        console.log(data);
     if (data) { 
         
         if(data.data){
            store.dispatch(SetQuestionLists(data.data));
         }
       }
  }

  static async postPdfCreation(catId) {
    
    
    let userData =JSON.parse(localStorage.getItem("UserDetails"));
    let user_id =0;
    let userDetail=userData;
    if(userDetail){
      user_id =userDetail.user_id;
     }
    let token = localStorage.getItem("getToken");
    let postBody ={"user_id":user_id,"token":token,"catId":catId}
    
    const { data} = await RestClient.postRequest2('user/pdfinsert',postBody);
    if(data){
      
    }
    
  }


  static async postQuestionData(catId) {
    document.getElementsByClassName("d-none")[0].style.visibility = 'visible';
     let userData =JSON.parse(localStorage.getItem("UserDetails"));
     let user_id =0;
     let userDetail=userData;
     if(userDetail){
      user_id =userDetail.user_id;
     }
    let token = localStorage.getItem("getToken");
    let postBody ={"user_id":user_id,"token":token,"catId":catId}
   // console.log(userData[0].user_id);
    const { data} = await RestClient.postRequest2('user/questionsinsert',postBody);
    console.log(data);
    if(data){
      document.getElementsByClassName("d-none")[0].style.visibility = 'hidden';
    }
    
  }


  
  static async QuestionListData() {

   
    let userData =JSON.parse(localStorage.getItem("UserDetails"));
    let user_id =0;
    let userDetail=userData;
    if(userDetail){
      user_id =userDetail.user_id;
     }
     
     let postBody1 = JSON.parse(localStorage.getItem('quesData'));
     let catData =JSON.parse(localStorage.getItem('productData'));
     console.log(catData.products);
     let postBody = {ques:postBody1 ,catIds:catData.products,user_id:user_id}


    //let postBody={'test':"Hello"}


     const { data} = await RestClient.postRequest2('user/questionsList',postBody);
        
       if (data) { 
         
         if(data.data){

           store.dispatch(setQuestionListData(data.data));
         }
       }
     
  }


  static async PdfDownloadLink() {
    document.getElementsByClassName("d-none")[0].style.visibility = 'visible';
     let userData = JSON.parse(localStorage.getItem("UserDetails"));
     let user_id =0;
     let userDetail=userData;
     if(userDetail){
      user_id =userDetail.user_id;
     }
     var catId =0;
     let catData = JSON.parse(localStorage.getItem('productCat'));
        if(catData){
          var catId=parseInt(catData);
      }
     let postBody ={"user_id":user_id,catId:catId}

     const { data} = await RestClient.postRequest2('user/pdflist',postBody);
        
       if (data) { 
         
         if(data.data){
           document.getElementsByClassName("d-none")[0].style.visibility = 'hidden';
           store.dispatch(setPdfListData(data.data));
         }
       }
     
  }

  static async AnswerListData() {
     let userData = JSON.parse(localStorage.getItem("UserDetails"));
     let user_id =0;
     let userDetail=userData;
     if(userDetail){
      user_id =userDetail.user_id;
     }

     let postBody1 = JSON.parse(localStorage.getItem('quesData'));
     let catData =JSON.parse(localStorage.getItem('productData'));
     console.log(catData.products);
     let postBody = {ques:postBody1 ,catIds:catData.products,user_id:user_id}

    //let postBody={'test':"Hello"}


     const { data} = await RestClient.postRequest2('user/answers',postBody);
        
       if (data) { 
         
         if(data.data){

           store.dispatch(setAnswerListData(data.data));
         }
       }
     
  }

  static async placeListData(place) {
    var jsonArg1 = new Object();
           jsonArg1.district=place;
           let postBody = jsonArg1;
   
    const { data} = await RestClient.postRequest4('place/search-place',postBody);
       if (data) { 
         
         if(data.data){
           store.dispatch(setPlaceData(data.data));
         }
       }
     
  }





  
}

export default QuestionRequest;
