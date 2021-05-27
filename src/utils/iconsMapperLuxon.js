import openWeatherIconsMap from "./openWeatherIconsMap.json";
import createLocalDate from "./createLocalDate";
import { setTime } from "./timeFormatingWithLuxon";

const getIcon = (id) => {
	return openWeatherIconsMap[id.toString()];
};

/**
 * Returns className for the desired weather icon (based on the time
 * of day and weather condition)
 * @param {number} id Weather condition id
 * @param {number} sunrise Sunrise time, unix, UTC
 * @param {number} sunset Sunset time, unix, UTC
 * @param {number} timestamp Timestamp, unix, UTC
 * @param {number} timezone Target timezone name (e.g. "Europe/Paris")
 * @returns {string} Weather icon className
 */

const iconsMapperLuxon = (id, sunrise, sunset, timestamp, timezone) => {
	const dateOrigin = setTime(timestamp, timezone);
	const sunriseOrigin = setTime(sunrise, timezone);
	const sunsetOrigin = setTime(sunset, timezone);
	const iconObject = getIcon(id);
	var infix;

	if (dateOrigin > sunriseOrigin && dateOrigin < sunsetOrigin) {
		infix = "day-";
	} else if (dateOrigin > sunsetOrigin || dateOrigin < sunriseOrigin) {
		infix = "night-";
	}

	return ["wi ", "wi-", infix, iconObject.icon].join("");
};

export default iconsMapperLuxon;
