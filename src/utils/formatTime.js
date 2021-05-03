/**
 * Formats unix timestamp to hour and minute representation (based on the
 * searched location local time and selected units)
 * @param {number} timestamp Unix Timestamp
 * @param {number} offset Shift in seconds from UTC
 * @param {string} selectedUnits Currently selected units
 * @returns {string} Time formated to display: "h:min" or "h:min PM/AM"
 */

const formatTime = (timestamp, offset = 0, selectedUnits = "metric") => {
	const formatHours = (hours) => {
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

		return { num: hours, text: "" };
	};

	const date = new Date((timestamp + offset) * 1000);
	const hours = date.getUTCHours();
	const hoursCorrection = formatHours(hours);
	const minutes = date.getUTCMinutes();

	return hoursCorrection.num + ":" + minutes + hoursCorrection.text;
};

export default formatTime;
