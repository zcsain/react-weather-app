import openWeatherIconsMap from "../openWeatherIconsMap.json";
import createLocalDate from "./createLocalDate";

// export const createLocalDate = (timestamp, offset) => {
// 	return new Date((timestamp + offset) * 1000);
// };

const getIcon = (id) => {
	return openWeatherIconsMap[id.toString()];
};

/**
 * Returns className for the desired weather icon (based on the time
 * of day and weather condition)
 * @param {number} id Weather condition id
 * @param {number} sunrise Sunrise time, unix, UTC
 * @param {number} sunset Sunset time, unix, UTC
 * @param {number} timestamp Time of data calculation, unix, UTC
 * @param {number} offset Shift in seconds from UTC
 * @returns {string} Weather icon className
 */

const iconsMapper = (id, sunrise, sunset, timestamp, offset) => {
	const date = createLocalDate(timestamp, offset);
	const sunriseMod = createLocalDate(sunrise, offset);
	const sunsetMod = createLocalDate(sunset, offset);
	const iconObject = getIcon(id);
	var infix;

	if (date > sunriseMod || date < sunsetMod) {
		infix = "day-";
	} else if (date > sunsetMod || date < sunriseMod) {
		infix = "night-";
	}

	return ["wi ", "wi-", infix, iconObject.icon].join("");
};

export default iconsMapper;
