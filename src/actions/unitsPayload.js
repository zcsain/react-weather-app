export const metric = {
	type: "metric",
	units: {
		speed: " km/h",
		deg: "°",
		humidity: " %",
		temp: "°C",
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
		temp: "°F",
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
		temp: "°K",
		wind: "°",
		pressure: " hPa",
	},
	multipliers: {
		speed: 1,
	},
};
