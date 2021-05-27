import React from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Custom
import {
	shortDayOfWeek,
	getTime,
	getShortTime,
	getDate,
} from "../../utils/timeFormatingWithLuxon";

const useStyles = makeStyles((theme) => ({
	chip: {
		minWidth: "55px",
	},
}));

function DateTimeBadge({ dt, timezone, viewType, unitsType }) {
	const theme = useTheme();
	const classes = useStyles(theme);

	const displayDayOfWeekOrTime = () => {
		switch (viewType) {
			case "hourly":
				return unitsType === "imperial"
					? getShortTime(dt, timezone, unitsType)
					: getTime(dt, timezone, unitsType);
			case "daily":
				return shortDayOfWeek(dt, timezone).toUpperCase();
			default:
				return NaN;
		}
	};

	return (
		<Grid container item direction="column" spacing={1} align="center">
			<Grid item>
				<Chip label={displayDayOfWeekOrTime()} className={classes.chip} />
			</Grid>
			<Grid item>
				<Typography color="textSecondary">
					{getDate(dt, timezone, unitsType)}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default DateTimeBadge;
