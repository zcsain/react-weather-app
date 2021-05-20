import { ONECALL_REQUEST, RESET_ONECALL } from "../actions/types";
import onecall from "../utils/mockdataOneCall";

// not much of a reducer but state required in multiple components
const oneCallReducer = (state = onecall, action) => {
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
