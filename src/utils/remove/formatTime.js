/**
 * Formats unix timestamp to hour and minute representation (based on the
 * searched location local time and selected units)
 * @param {number} timestamp Time of data calculation, unix, UTC
 * @param {number} offset Shift in seconds from UTC
 * @param {string} selectedUnits Currently selected units
 * @returns {string} Time formated to display: "h:min" or "h:min PM/AM"
 */

import formatHours from "../formatHours";

const formatTime = (timestamp, offset = 0, selectedUnits = "metric") => {
	const leadingZero = (minutes) => {
		if (minutes < 10) {
			return "0" + minutes;
		}

		return minutes;
	};

	const date = new Date((timestamp + offset) * 1000);
	const hours = date.getUTCHours();
	const hoursCorrection = formatHours(hours, selectedUnits);
	const minutes = date.getUTCMinutes();

	return (
		hoursCorrection.num + ":" + leadingZero(minutes) + hoursCorrection.text
	);
};

export default formatTime;
