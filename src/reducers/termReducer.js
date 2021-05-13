import { SEARCH_TERM } from "../actions/types";

const termReducer = (state = "Zagreb", action) => {
	switch (action.type) {
		case SEARCH_TERM:
			return action.payload;
		default:
			return state;
	}
};

export default termReducer;
