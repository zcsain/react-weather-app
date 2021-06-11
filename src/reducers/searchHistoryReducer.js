import { SET_SEARCH_HISTORY, ADD_TO_SEARCH_HISTORY } from "../actions/types";
import searchHistoryRecombobulator from "../utils/searchHistoryRecombobulator";

const searchHistoryReducer = (state = [], action) => {
	switch (action.type) {
		case SET_SEARCH_HISTORY:
			return action.payload;
		case ADD_TO_SEARCH_HISTORY:
			return searchHistoryRecombobulator(state, action.payload);
		default:
			return state;
	}
};

export default searchHistoryReducer;
