//External Lib Import
import { createSlice } from "@reduxjs/toolkit";
import SessionHelper from "../../helpers/SessionHelper";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    AccessToken: SessionHelper.GetToken() || undefined,
  },
  reducers: {
    SetLogin: (state, action) => {
      console.log(action.payload);
      let token = "73b43e8a7979d4199621da9b9bf851834145399a";
      SessionHelper.SetToken(JSON.stringify(token));
      state.AccessToken = SessionHelper.GetToken() || undefined;
    },
    SetLogout: (state, action) => {
      SessionHelper.RemoveToken();
      SessionHelper.RemoveUserDetails();
      state.AccessToken = SessionHelper.GetToken() || undefined;
    },
  },
});

export const { SetLogin, SetLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
