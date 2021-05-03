/**
 * Capitalises every word in a space delimited sequence of words
 * @param {string} str Space Delimited sequence of words
 * @returns {string} Space Delimited sequence of capitalised words
 */

const titleCase = (str) => {
	var splitStr = str.toLowerCase().split(" ");
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] =
			splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}

	return splitStr.join(" ");
};

export default titleCase;
