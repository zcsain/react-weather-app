import {
	CURRENT_REQUEST,
	ONECALL_REQUEST,
	SEARCH_TERM,
	CHANGE_UNITS,
	TOGGLE_THEME,
	RESET_CURRENT,
	RESET_ONECALL,
	RESET_SEARCH_TERM,
	SET_DARK_THEME,
	SET_LIGHT_THEME,
	SET_THEME,
} from "./types";
import history from "../history";
import openWeather from "../apis/openWeather";
import modifyOneCall from "../utils/modifyOneCall";

export const fetchCurrent = (location, units, lang = "en") => {
	return async (dispatch) => {
		try {
			const response = await openWeather.post("/current", {
				location: location,
				units: units,
				lang: lang,
			});

			dispatch({ type: CURRENT_REQUEST, payload: response.data });
		} catch (error) {
			if (error.response) {
				// Request made and server responded
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message);
			}

			// Maybe change this to be specific to the search term
			history.push({
				pathname: "/error",
				state: {
					title: "Error",
					message:
						"Oops! Something went wrong. Please reload the page and try again, or come back later.",
					buttonText: "Reload Page",
				},
			});
		}
	};
};

export const resetCurrent = () => {
	return {
		type: RESET_CURRENT,
	};
};

export const fetchOneCall = (location, units, lang = "en") => {
	return async (dispatch, getState) => {
		// const unitsStatus = getState().units === units;
		// const locationStatus = getState().location === location;
		// const langStatus = getState().lang === lang;

		// if (unitsStatus || locationStatus || langStatus) {
		// 	// MAKE REQUEST
		// } else {
		// 	// DONT'T MAKE REQUEST (KEEP STATE AS IS)
		// 	dispatch({ type: null });
		// }

		try {
			const response = await openWeather.post("/onecall", {
				location: location,
				units: units,
				lang: lang,
			});

			dispatch({
				type: ONECALL_REQUEST,
				// Adds "sunrise, sunset" timestamps to "hourly" weather predictions
				payload: modifyOneCall(response.data),
			});
		} catch (error) {
			if (error.response) {
				// Request made and server responded
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message);
			}

			// Maybe change this to be specific to the search term
			history.push({
				pathname: "/error",
				state: {
					title: "Error",
					message:
						"Oops! Something went wrong. Please reload the page and try again, or come back later.",
					buttonText: "Reload Page",
				},
			});
		}
	};
};

export const resetOneCall = () => {
	return {
		type: RESET_ONECALL,
	};
};

export const setSearchTerm = (term) => {
	return {
		type: SEARCH_TERM,
		payload: term,
	};
};

export const resetSearchTerm = () => {
	return {
		type: RESET_SEARCH_TERM,
	};
};

export const setUnits = (units) => {
	return {
		type: CHANGE_UNITS,
		payload: units,
	};
};

export const toggleTheme = () => {
	return {
		type: TOGGLE_THEME,
	};
};

export const setDarkTheme = () => {
	return {
		type: SET_DARK_THEME,
	};
};

export const setLightTheme = () => {
	return {
		type: SET_LIGHT_THEME,
	};
};

export const setTheme = (themeType) => {
	return {
		type: SET_THEME,
		payload: themeType,
	};
};
