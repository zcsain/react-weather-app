import { CURRENT_REQUEST } from "../actions/types";
import mockDataCurrent from "../utils/mockdataCurrent";

// this can also be stored in component state, because only one
// component will make use of it, but lets got with this for now
const currentReducer = (state = mockDataCurrent, action) => {
	switch (action.type) {
		case CURRENT_REQUEST:
			return action.payload;
		default:
			return state;
	}
};

export default currentReducer;