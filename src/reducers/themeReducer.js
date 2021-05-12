import { TOGGLE_THEME } from "../actions/types";

const themeReducer = (state = true, action) => {
	switch (action.type) {
		case TOGGLE_THEME:
			return !state;
		default:
			return state;
	}
};

export default themeReducer;
