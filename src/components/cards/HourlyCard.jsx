import React, { useState } from "react";
import { connect } from "react-redux";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Custom
import DateTimeBadge from "../parts/DateTimeBadge";
import capitalize from "../../utils/capitalize";
import iconsMapper from "../../utils/iconsMapper";
import formatTime from "../../utils/formatTime";
import degToCompasDir from "../../utils/degToCompasDir";
import InfoBoxLarge from "../parts/InfoBoxLarge";
import InfoBoxSmall from "../parts/InfoBoxSmall";
import createLocalDate from "../../utils/createLocalDate";

const useStyles = makeStyles((theme) => ({
	collapseGrid: {
		padding: theme.spacing(2),
	},
	icon: {
		fontSize: "2.5rem",
	},
	iconContainer: {
		minWidth: "60px",
		textAlign: "center",
	},
	darkTheme: {
		opacity: "93%",
	},
}));

function HourlyCard({
	hour,
	timezoneOffset,
	sunriseData,
	selectedUnits,
	searchTerm,
}) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const showShortDescription = useMediaQuery(theme.breakpoints.up("sm"));
	const [expanded, setExpanded] = useState(true);

	const darkThemeOpacity =
		theme.palette.type === "dark" ? classes.darkTheme : null;

	const handleExpandeClick = () => {
		setExpanded(!expanded);
	};

	const renderActionArea = () => {
		const { dt, weather, sunrise, sunset } = hour;
		const { id } = weather[0];
		const icon = iconsMapper(id, sunrise, sunset, dt, timezoneOffset);

		return (
			<CardActionArea onClick={handleExpandeClick}>
				<CardContent>
					<Grid container justify="space-between" alignItems="center">
						<Grid item>
							<DateTimeBadge
								dt={dt}
								timezoneOffset={timezoneOffset}
								viewType="hourly"
							/>
						</Grid>
						<Grid item className={classes.iconContainer}>
							<i className={[classes.icon, darkThemeOpacity, icon].join(" ")} />
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		);
	};

	const renderCollapseArea = () => {
		const { dt, sunrise, sunset } = hour;
		const hourDay = createLocalDate(dt, 0).getUTCDate();
		const sunriseDay = createLocalDate(sunrise, 0).getUTCDate();
		const sunsetDay = createLocalDate(sunset, 0).getUTCDate();

		return (
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Grid container spacing={1} className={classes.collapseGrid}>
					{hourDay}
					{sunriseDay}
					{sunsetDay}
				</Grid>
			</Collapse>
		);
	};

	return (
		<Card raised>
			{renderActionArea()}
			{renderCollapseArea()}
		</Card>
	);
}

const mapStateToProps = (state) => {
	return {
		selectedUnits: state.units,
		searchTerm: state.location,
	};
};

export default connect(mapStateToProps)(HourlyCard);
