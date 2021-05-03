/**
 * Transforms wind direction from degrees to compas direction
 * @param {number} deg Wind direction in degrees
 * @returns {string} Compas direction
 */

const degToCompasDir = (deg) => {
	const compasMap = [
		"N",
		"NNE",
		"NE",
		"ENE",
		"E",
		"ESE",
		"SE",
		"SSE",
		"S",
		"SSW",
		"SW",
		"WSW",
		"W",
		"WNW",
		"NW",
		"NNW",
		"N",
	];

	const index = Math.round((deg % 360) / 22.5);

	return compasMap[index];
};

export default degToCompasDir;
