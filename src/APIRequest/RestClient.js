//External Lib Import
import axios from "axios";
import SessionHelper from "../helpers/SessionHelper";
import ToastMessage from "../helpers/ToastMessage";
import { SetLogout } from "../redux/slices/AuthSlice";
import { RemoveLoading, SetLoading } from "../redux/slices/LoaderSlice";
import { RemoveUserDetails } from "../redux/slices/UserSlice";
import store from "../redux/store/store";

//Axios default setting
axios.defaults.baseURL = "https://astrooffice.in:3300/api/";





axios.defaults.headers.post["Content-Type"] =
  "application/json";


function axiosHeaders() {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + SessionHelper.GetToken();
}

function axiosHeaders3() {
  let token = localStorage.getItem('getToken');
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + token;
}

function axiosHeaders2() {
  axios.defaults.headers.post["Content-Type"] =
  "application/json";
 
 
}

function removeLoading(){
   store.dispatch(RemoveLoading());
}

const ResponseReturn = (response) => {
  store.dispatch(RemoveLoading());
  return response;
};

const ErrorReturn = (error) => {
  store.dispatch(RemoveLoading());
  if (error.response.status === 500) {
    ToastMessage.errorMessage("Sorry, Something went wrong");
  } else if (error.response.status === 401) {
    ToastMessage.errorMessage(error.response.data.message);
    store.dispatch(SetLogout());
    store.dispatch(RemoveUserDetails());
  } else {
    ToastMessage.errorMessage(error.response.data.message);
  }

  return false;
};

class RestClient {

  

  static async getRequest(url) {
    store.dispatch(SetLoading());
    return await axios
      .get(url, axiosHeaders())
      .then((response) => {
        return ResponseReturn(response);
      })
      .catch((error) => {
        return ErrorReturn(error);
      });
  }
  static async postRequest(url, postBody) {
    
    store.dispatch(SetLoading());
    return await axios
      .post(url, postBody, axiosHeaders())
      .then((response) => {
        return ResponseReturn(response);
      })
      .atch((error) => {
        store.dispatch(RemoveLoading());
        return ErrorReturn(error);
      });
  }

  static async postRequest3(url, postBody) {
   
    store.dispatch(SetLoading());
    return await axios
      .post(url, postBody, axiosHeaders2())
      .then((response) => {
        return ResponseReturn(response);
      })
      .catch((error) => {
        store.dispatch(RemoveLoading());
        return ErrorReturn(error);
      });
  }


  static async postRequest4(url, postBody) {
   
    store.dispatch(SetLoading());
    return await axios
      .post(url, postBody, axiosHeaders3())
      .then((response) => {
        return ResponseReturn(response);
      })
      .catch((error) => {
        store.dispatch(RemoveLoading());
        return ErrorReturn(error);
      });
  }

  static async postRequest2(url, postBody) {
    var url1= 'http://localhost:5000/api/'+url;

    store.dispatch(SetLoading());
    return await axios
      .post(url1, postBody, axiosHeaders2())
      .then((response) => {
        return ResponseReturn(response);
      })
      .catch((error) => {
        store.dispatch(RemoveLoading());
        return ErrorReturn(error);
      });
  }
  static async updateRequest(url, postBody) {
    store.dispatch(SetLoading());
    return await axios
      .patch(url, postBody, axiosHeaders())
      .then((response) => {
        return ResponseReturn(response);
      })
      .catch((error) => {
        return ErrorReturn(error);
      });
  }
  static async putRequest(url, postBody) {
    store.dispatch(SetLoading());
    return await axios
      .put(url, postBody, axiosHeaders())
      .then((response) => {
        return ResponseReturn(response);
      })
      .catch((error) => {
        return ErrorReturn(error);
      });
  }
  static async deleteRequest(url) {
    store.dispatch(SetLoading());
    return await axios
      .delete(url, axiosHeaders())
      .then((response) => {
        return ResponseReturn(response);
      })
      .catch((error) => {
        return ErrorReturn(error);
      });
  }
}

export default RestClient;
