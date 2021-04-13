import { CHANGE_UNITS } from "../actions/types";

const unitsReducer = (state = "metric", action) => {
	switch (action.type) {
		case CHANGE_UNITS:
			return action.payload;
		default:
			return state;
	}
};

export default unitsReducer;
