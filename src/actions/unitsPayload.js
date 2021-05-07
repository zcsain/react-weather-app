export const metric = {
	type: "metric",
	units: {
		speed: " km/h",
		deg: "°",
		humidity: " %",
		temp: " °C",
		tempOnly: " C",
		wind: "",
		pressure: " hPa",
	},
	multipliers: {
		speed: 3.6,
	},
};

export const imperial = {
	type: "imperial",
	units: {
		speed: " mph",
		deg: "°",
		humidity: " %",
		temp: " °F",
		tempOnly: " F",
		wind: "",
		pressure: " hPa",
	},
	multipliers: {
		speed: 1,
	},
};

export const scientific = {
	type: "scientific",
	units: {
		speed: " m/s",
		deg: "°",
		humidity: " %",
		temp: " °K",
		tempOnly: " K",
		wind: "°",
		pressure: " hPa",
	},
	multipliers: {
		speed: 1,
	},
};
