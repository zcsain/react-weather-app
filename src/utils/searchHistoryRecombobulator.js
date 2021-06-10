/**
 *
 * @param {array} searchHistory Array containing past search locations
 * @param {string} newLocation New search location
 * @returns {array} Modified array containing past search locations
 */

const searchHistoryRecombobulator = (searchHistory, newLocation) => {
	if (searchHistory.includes(newLocation)) {
		return searchHistory;
	}

	if (searchHistory.length === 4) {
		searchHistory.shift();
		searchHistory.push(newLocation);

		return searchHistory;
	}

	searchHistory.push(newLocation);

	return searchHistory;
};

export default searchHistoryRecombobulator;
