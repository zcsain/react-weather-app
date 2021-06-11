/**
 *
 * @param {array} searchHistory Array containing past search locations
 * @param {string} newLocation New search location
 * @returns {array} New array containing past search locations
 */

const searchHistoryRecombobulator = (searchHistory = [], newLocation) => {
	if (!newLocation || searchHistory.includes(newLocation)) {
		return [...searchHistory];
	}

	if (searchHistory.length === 3) {
		const modHistory = searchHistory.filter(
			(element) => element !== searchHistory[0]
		);

		return [...modHistory, newLocation];
	}

	return [...searchHistory, newLocation];
};

export default searchHistoryRecombobulator;
