import {
	TOGGLE_THEME,
	SET_DARK_THEME,
	SET_LIGHT_THEME,
	SET_THEME,
} from "../actions/types";

const themeReducer = (state = true, action) => {
	switch (action.type) {
		case TOGGLE_THEME:
			return !state;
		case SET_DARK_THEME:
			return false;
		case SET_LIGHT_THEME:
			return true;
		case SET_THEME:
			return action.payload;
		default:
			return state;
	}
};

export default themeReducer;
