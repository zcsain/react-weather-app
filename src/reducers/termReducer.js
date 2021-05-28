import { SEARCH_TERM, RESET_SEARCH_TERM } from "../actions/types";

const termReducer = (state = "", action) => {
	switch (action.type) {
		case SEARCH_TERM:
			return action.payload;
		case RESET_SEARCH_TERM:
			return "";
		default:
			return state;
	}
};

export default termReducer;
