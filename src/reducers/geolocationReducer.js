import { GEOLOCATE_REQUEST, RESET_GEOLOCATION } from "../actions/types";

const geolocationReducer = (state = [], action) => {
	switch (action.type) {
		case GEOLOCATE_REQUEST:
			return action.payload;
		case RESET_GEOLOCATION:
			return [];
		default:
			return state;
	}
};

export default geolocationReducer;
