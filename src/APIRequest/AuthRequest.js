//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { SetLogin } from "../redux/slices/AuthSlice";
import { SetUserDetails,SetProduct } from "../redux/slices/UserSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class AuthRequest {
  static async RegisterUser(postBody) {
    var postBody = {"data":postBody}
    console.log(postBody);
    const { data } = await RestClient.postRequest(
      "user/login",
      postBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true
    }
  }

  static async LoginUser(postBody) {
    var postBody1 = {"data":postBody}
    const { data } = await RestClient.postRequest("user/login",postBody1);
    if (data) {
      store.dispatch(SetLogin(data?.data));
      store.dispatch(SetUserDetails(data.userData?.id[0]));
      ToastMessage.successMessage("User Login Successfull");
    }
  }

  static async addUserData(postBody) {
    var postBody1 = {"data":postBody}
    const { data } = await RestClient.postRequest2("user/addUser",postBody);
    if (data) {
      store.dispatch(SetLogin(data.data));
      store.dispatch(SetUserDetails(data.data));
      ToastMessage.successMessage("User Data Added Successfully!!!");
    }
  }

  static async saveProductData(postBody) {
    var postBody1 = {"data":postBody}
    const { data } = postBody1
    if (data) {
      localStorage.setItem('productData', JSON.stringify(data));
      ToastMessage.successMessage("Added your category !!!");
    }
  }
}

export default AuthRequest;
