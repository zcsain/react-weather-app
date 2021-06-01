import { GEOLOCATE_REQUEST } from "../actions/types";

const geolocationReducer = (state = [], action) => {
	switch (action.type) {
		case GEOLOCATE_REQUEST:
			return action.payload;
		default:
			return state;
	}
};

export default geolocationReducer;
