import createLocalDate from "./createLocalDate";

const hoursWithSunriseSunsetData = (hours, sunriseSunsetData, offset) => {
	return hours.map((hour) => {
		const dtDay = createLocalDate(hour.dt, offset).getDate();

		for (const element of sunriseSunsetData) {
			const sunriseDay = createLocalDate(element.sunrise, offset).getDate();

			if (dtDay === sunriseDay) {
				return { ...hour, ...element };
			}
		}
	});
};

export default hoursWithSunriseSunsetData;
