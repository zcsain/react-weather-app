import createLocalDate from "./createLocalDate";

const hoursWithSunriseSunsetData = (hours, sunriseSunsetData, offset) => {
	return hours.map((hour) => {
		const dtDay = createLocalDate(hour.dt, offset).getDate();
		// const dtDay = new Date(hour.dt * 1000).getDate();

		for (const element of sunriseSunsetData) {
			const sunriseDay = createLocalDate(element.sunrise, offset).getDate();
			// const sunriseDay = new Date(element.sunrise * 1000).getDate();

			if (dtDay === sunriseDay) {
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
	const { daily, hourly: hours } = oneCall;

	const sunriseSunsetData = daily.map((day) => {
		return {
			sunrise: day.sunrise,
			sunset: day.sunset,
		};
	});

	return {
		...oneCall,
		hourly: hoursWithSunriseSunsetData(hours, sunriseSunsetData, 0),
	};
};

export default modifyOneCall;
