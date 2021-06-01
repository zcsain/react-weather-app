import { combineReducers } from "redux";

import termReducer from "./termReducer";
import currentReducer from "./currentReducer";
import oneCallReducer from "./oneCallReducer";
import unitsReducer from "./unitsReducer";
import themeReducer from "./themeReducer";
import geolocationReducer from "./geolocationReducer";

export default combineReducers({
	location: termReducer,
	current: currentReducer,
	oneCall: oneCallReducer,
	units: unitsReducer,
	theme: themeReducer,
	geolocation: geolocationReducer,
});
