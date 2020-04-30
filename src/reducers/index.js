import { combineReducers } from "redux";

import userData from "./user.reducer";
import languageData from "./language.reducer";

export default combineReducers({
  userData,
  languageData
});
