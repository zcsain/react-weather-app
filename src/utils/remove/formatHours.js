const formatHours = (hours, selectedUnits, suffix = "") => {
	if (selectedUnits === "imperial") {
		if (hours === 0) {
			return { num: 12, text: " AM" };
		} else if (hours === 12) {
			return { num: 12, text: " PM" };
		} else if (hours >= 1 && hours <= 11) {
			return { num: hours % 12, text: " AM" };
		} else {
			return { num: hours % 12, text: " PM" };
		}
	}

	return { num: hours, text: suffix };
};

export default formatHours;
