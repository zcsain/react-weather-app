import {
	CURRENT_REQUEST,
	ONECALL_REQUEST,
	SEARCH_TERM,
	CHANGE_UNITS,
	TOGGLE_THEME,
	RESET_CURRENT,
	RESET_ONECALL,
} from "./types";
import openWeather from "../apis/openWeather";

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
		const unitsStatus = getState().units === units;
		const locationStatus = getState().location === location;
		const langStatus = getState().lang === lang;

		if (unitsStatus || locationStatus || langStatus) {
			// MAKE REQUEST
		} else {
			// DONT'T MAKE REQUEST (KEEP STATE AS IS)
			dispatch({ type: null });
		}

		try {
			const response = await openWeather.post("/onecall", {
				location: location,
				units: units,
				lang: lang,
			});

			dispatch({ type: ONECALL_REQUEST, payload: response.data });
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
