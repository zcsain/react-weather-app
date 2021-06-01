import { setTime } from "../utils/timeFormatingWithLuxon";

/**
 *
 * @param {object} hours "hourly" object from the oneCall api call
 * @param {array} sunriseSunsetData Array containg objects with sunrise/sunset data
 * @param {string} timezone Target timezone name (e.g. "Europe/Paris")
 * @returns {object} "hourly" object with the addition of sunrise/sunset data
 */

const hoursWithSunriseSunsetData = (hours, sunriseSunsetData, timezone) => {
	return hours.map((hour) => {
		const dtDay = setTime(hour.dt, timezone);

		for (const element of sunriseSunsetData) {
			const sunriseDay = setTime(element.sunrise, timezone);

			// daily object (and the sunriseSunsetData list) contains 7 days, while hourly
			// object contains 48 hours, all hours will be populated with appropriate sunrise/sunset data
			if (dtDay.hasSame(sunriseDay, "day")) {
				return { ...hour, ...element };
			}
		}
	});
};

/**
 *
 * @param {object} oneCall "oneCall object"
 * @returns {object} "oneCall" object with "hourly" containing "sunrise, sunset" data
 */

const modifyOneCall = (oneCall) => {
	const { daily, hourly: hours, timezone } = oneCall;

	const sunriseSunsetData = daily.map((day) => {
		return {
			sunrise: day.sunrise,
			sunset: day.sunset,
		};
	});

	return {
		...oneCall,
		hourly: hoursWithSunriseSunsetData(hours, sunriseSunsetData, timezone),
	};
};

export default modifyOneCall;
