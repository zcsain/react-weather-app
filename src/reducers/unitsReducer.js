import { CHANGE_UNITS } from "../actions/types";
import { metric } from "../actions/unitsPayload";
// import { scientific } from "../actions/unitsPayload";
// import { imperial  } from "../actions/unitsPayload";

const unitsReducer = (state = metric, action) => {
	switch (action.type) {
		case CHANGE_UNITS:
			return action.payload;
		default:
			return state;
	}
};

export default unitsReducer;
