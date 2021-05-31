import { DateTime } from "luxon";

// Custom
import { METRIC, IMPERIAL, SCIENTIFIC } from "./types";

/**
 *
 * @param {number} timestamp Timestamp, unix, UTC
 * @param {string} timezone Target timezone name (e.g. "Europe/Paris")
 * @returns Luxon time object, with target timezone
 */

export const setTime = (timestamp, timezone) => {
	return DateTime.fromSeconds(timestamp, { zone: timezone });
};

/**
 *
 * @param {number} timestamp Timestamp, unix, UTC
 * @param {string} timezone Target timezone name (e.g. "Europe/Paris")
 * @returns {string} Day of the week, as an abbreviate localized string (e.g. "WED")
 */

export const shortDayOfWeek = (timestamp, timezone) => {
	const time = setTime(timestamp, timezone);
	const day = time.toFormat("ccc");

	return day;
};

/**
 *
 * @param {number} timestamp Timestamp, unix, UTC
 * @param {string} timezone Target timezone name (e.g. "Europe/Paris")
 * @param {string} unitsType Selected units name (e.g. "metric")
 * @returns {string} Hour and minute representation of time based on the selected units (e.g. "20:32" for metric/scientific, "8:32 PM" for imperial)
 */

export const getTime = (timestamp, timezone, unitsType) => {
	const time = setTime(timestamp, timezone);

	switch (unitsType) {
		case IMPERIAL:
			return time.toFormat("h:mm a");
		// return time.toLocaleString(DateTime.TIME_SIMPLE);
		default:
			return time.toFormat("H:mm");
		// There is a bug in some browsers that formats 00:xx as 24:xx when
		// using .TIME_24_SIMPLE, .toFormat used as workaround
		// read more here: https://github.com/moment/luxon/issues/726
		// return time.toLocaleString(DateTime.TIME_24_SIMPLE);
	}
};

/**
 *
 * @param {number} timestamp Timestamp, unix, UTC
 * @param {string} timezone Target timezone name (e.g. "Europe/Paris")
 * @returns {string} Hours in short format (e.g. "2 AM", "5 PM")
 */

export const getShortTime = (timestamp, timezone) => {
	const time = setTime(timestamp, timezone);

	return time.toFormat("h a");
};

/**
 *
 * @param {number} timestamp Timestamp, unix, UTC
 * @param {string} timezone Target timezone name (e.g. "Europe/Paris")
 * @param {string} unitsType Selected units name (e.g. "metric")
 * @returns {string} Date representation based on the selected units (metric/scientific: "day/month", imperial: "month/day")
 */

export const getDate = (timestamp, timezone, unitsType) => {
	const time = setTime(timestamp, timezone);

	switch (unitsType) {
		case IMPERIAL:
			return time.toFormat("M/d");
		default:
			return time.toFormat("d/M");
	}
};

/**
 *
 * @param {number} timestamp Timestamp, unix, UTC
 * @param {string} timezone Target timezone name (e.g. "Europe/Paris")
 * @returns {string} Abbreviated date with weekday (e.g "Fri, Oct 14, 1983")
 */

export const getLongDate = (timestamp, timezone, unitsType) => {
	const time = setTime(timestamp, timezone);

	switch (unitsType) {
		case IMPERIAL:
			return time.toFormat("cccc, LLLL d, y");
		default:
			return time.toFormat("cccc, d LLLL, y");
	}
};
