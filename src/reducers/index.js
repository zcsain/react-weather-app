import { combineReducers } from "redux";

import termReducer from "./termReducer";
import currentReducer from "./currentReducer";
import oneCallReducer from "./oneCallReducer";
import unitsReducer from "./unitsReducer";

export default combineReducers({
	term: termReducer,
	current: currentReducer,
	oneCall: oneCallReducer,
	units: unitsReducer,
});
