export default function degToCompasDir(deg) {
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

	const compasDir = compasMap[index];

	return compasDir;
}
