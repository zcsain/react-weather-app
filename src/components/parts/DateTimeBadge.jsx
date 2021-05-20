import React from "react";
import { connect } from "react-redux";

// Material UI
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

// Custom
import formatHours from "../../utils/formatHours";

function DateTimeBadge({ dt, timezoneOffset, viewType, selectedUnits }) {
	const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	const date = new Date((dt + timezoneOffset) * 1000);
	const hours = date.getUTCHours();
	const { num, text } = formatHours(hours, selectedUnits.type, ":00");
	const dayOfWeek = weekDays[date.getUTCDay()];
	const dayOfMonth = date.getUTCDate();
	const month = date.getUTCMonth();

	const displayDayOfWeekOrTime = () => {
		switch (viewType) {
			case "hourly":
				return num + text;
			case "daily":
				return dayOfWeek;
			default:
				return NaN;
		}
	};

	const selectDateFormat = () => {
		if (selectedUnits.type === "imperial") {
			return `${month}/${dayOfMonth}`;
		}

		return `${dayOfMonth}/${month}`;
	};

	return (
		<Grid container item direction="column" spacing={1} align="center">
			<Grid item>
				<Chip label={displayDayOfWeekOrTime()} />
			</Grid>
			<Grid item>
				<Typography color="textSecondary">{selectDateFormat()}</Typography>
			</Grid>
		</Grid>
	);
}

const mapStateToProps = (state) => {
	return {
		selectedUnits: state.units,
	};
};

export default connect(mapStateToProps)(DateTimeBadge);
