export const metric = {
	type: "metric",
	keyword: "metric",
	units: {
		speed: " km/h",
		deg: "°",
		humidity: " %",
		temp: " °C",
		tempOnly: " C",
		wind: "",
		pressure: " hPa",
		rain: " mm",
	},
	multipliers: {
		speed: 3.6,
		rain: 1,
	},
};

export const imperial = {
	type: "imperial",
	keyword: "imperial",
	units: {
		speed: " mph",
		deg: "°",
		humidity: " %",
		temp: " °F",
		tempOnly: " F",
		wind: "",
		pressure: " hPa",
		rain: " in",
	},
	multipliers: {
		speed: 1,
		rain: 0.0393701,
	},
};

export const scientific = {
	type: "scientific",
	keyword: "kelvin",
	units: {
		speed: " m/s",
		deg: "°",
		humidity: " %",
		temp: " °K",
		tempOnly: " K",
		wind: "°",
		pressure: " hPa",
		rain: " mm",
	},
	multipliers: {
		speed: 1,
		rain: 1,
	},
};
