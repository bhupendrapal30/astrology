//External Lib Import
import { createSlice } from "@reduxjs/toolkit";
import SessionHelper from "../../helpers/SessionHelper";

const QuestionSlice = createSlice({
  name: "Question",
  initialState: {
    QuestionLists: [],
    QuestionListData:[],
    AnswerListData:[],
    QuestionData:[],
    PlaceData:[],
    PdfListData:[],
    TotalQuestion: 0,
  },
  reducers: {
    SetQuestionData(state, action) {
      SessionHelper.SetToken(action.payload.token);
      state.AccessToken = SessionHelper.GetToken() || undefined;
      state.TotalQuestion = action.payload;
    },
    SetQuestionLists(state, action){
      state.QuestionLists = action.payload;
    },
    SetTotalSummary(state, action) {
      state.TotalQuestion = action.payload;
    },
    setQuestionListData(state, action) {
      state.QuestionListData = action.payload;
    },
    setAnswerListData(state, action) {
      state.AnswerListData = action.payload;
    },
    setPlaceData(state, action) {
      state.PlaceData = action.payload;
    },
    setPdfListData(state, action) {
      state.PdfListData = action.payload;
    },
  },
});

export const {setPdfListData, SetQuestionLists, SetTotalSummary,SetQuestionData,setQuestionListData,setAnswerListData,setPlaceData} = QuestionSlice.actions;
export default QuestionSlice.reducer;
