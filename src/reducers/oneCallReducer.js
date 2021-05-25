import { ONECALL_REQUEST, RESET_ONECALL } from "../actions/types";

// not much of a reducer but state required in multiple components
const oneCallReducer = (state = {}, action) => {
	switch (action.type) {
		case ONECALL_REQUEST:
			return action.payload;
		case RESET_ONECALL:
			return {};
		default:
			return state;
	}
};

export default oneCallReducer;
