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
import DateTimeBadge from "./DateTimeBadge";
import capitalize from "../../utils/capitalize";
import iconsMapper from "../../utils/iconsMapper";
import formatTime from "../../utils/formatTime";
import degToCompasDir from "../../utils/degToCompasDir";
import InfoBoxLarge from "./InfoBoxLarge";

const useStyles = makeStyles((theme) => ({
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	icon: {
		fontSize: "2.5rem",
	},
	iconContainer: {
		minWidth: "60px",
		// display: "grid",
		// justifyContent: "center",
		textAlign: "center",
	},
	darkTheme: {
		opacity: "93%",
	},
	description: {
		[theme.breakpoints.up("sm")]: {
			width: "90px",
		},
		[theme.breakpoints.up("md")]: {
			width: "115px",
		},
	},
	temp: {
		// minWidth: "112px",
		minWidth: "85px",
		// textAlign: "right",
	},
	scientific: {
		minWidth: "112px",
	},
	listSpacing: {
		marginLeft: -theme.spacing(1.5),
	},
}));

function DailyCard({ day, timezoneOffset, selectedUnits }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const showShortDescription = useMediaQuery(theme.breakpoints.up("sm"));
	const [expanded, setExpanded] = useState(false);

	const {
		sunrise,
		sunset,
		moonrise,
		moonset,
		humidity,
		pressure,
		temp,
		feels_like: feelsLike,
		wind_speed: windSpeed,
		wind_deg: windDeg,
	} = day;

	const windSpeedMod =
		selectedUnits.type === "scientific"
			? windSpeed
			: (windSpeed * selectedUnits.multipliers.speed).toFixed(0);
	const windDir =
		selectedUnits.type === "scientific" ? windDeg : degToCompasDir(windDeg);

	// Dark theme - opacity adjust (could not find how to do this with useStyles)
	const darkThemeOpacity =
		theme.palette.type === "dark" ? classes.darkTheme : null;

	const handleExpandeClick = () => {
		setExpanded(!expanded);
	};

	const renderActionArea = () => {
		const { dt, weather } = day;
		const { id, description } = weather[0];
		const { day: dayTemp, night: nightTemp } = temp;
		const icon = iconsMapper(id, sunrise, sunset, dt, timezoneOffset);

		// Scientific temp minWidth correction
		const minWidth =
			selectedUnits.type === "scientific" ? classes.scientific : classes.temp;

		return (
			<CardActionArea onClick={handleExpandeClick}>
				<CardContent>
					<Grid container justify="space-between" alignItems="center">
						<Grid item>
							<DateTimeBadge
								dt={dt}
								timezoneOffset={timezoneOffset}
								viewType="daily"
							/>
						</Grid>
						<Grid item className={classes.iconContainer}>
							<i className={[classes.icon, darkThemeOpacity, icon].join(" ")} />
						</Grid>
						<Tooltip title="Day / Night">
							<Grid item className={minWidth}>
								<Typography
									variant="h4"
									component="p"
									display="inline"
									className={darkThemeOpacity}
								>
									{dayTemp.toFixed(0)}
									{selectedUnits.units.deg}
								</Typography>
								<Typography
									variant="body1"
									color="textSecondary"
									display="inline"
									component="p"
								>
									/{nightTemp.toFixed(0)}
									{selectedUnits.units.deg}
								</Typography>
							</Grid>
						</Tooltip>
						{showShortDescription && (
							<Grid item className={classes.description}>
								<Typography variant="body2" className={darkThemeOpacity}>
									{capitalize(description)}
								</Typography>
							</Grid>
						)}
						<Grid item>
							<ExpandMoreIcon
								className={clsx(classes.expand, {
									[classes.expandOpen]: expanded,
								})}
							/>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		);
	};

	const renderCollapseAreaLarge = () => {
		return (
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Grid container spacing={1} style={{ padding: "16px" }}>
					<Grid item xs={6} sm={4}>
						<InfoBoxLarge
							iconOne="wi wi-thermometer-exterior"
							titleOne="High"
							dataOne={temp.min.toFixed(0) + selectedUnits.units.temp}
							iconTwo="wi wi-thermometer"
							titleTwo="Low"
							dataTwo={temp.max.toFixed(0) + selectedUnits.units.temp}
						/>
					</Grid>
					<Grid item xs={6} sm={4}>
						<InfoBoxLarge
							iconOne="wi wi-day-sunny"
							titleOne="Feels like"
							dataOne={feelsLike.day.toFixed(0) + selectedUnits.units.temp}
							iconTwo="wi wi-night-clear"
							titleTwo="Feels like"
							dataTwo={feelsLike.night.toFixed(0) + selectedUnits.units.temp}
						/>
					</Grid>
					<Grid item xs={6} sm={4}>
						<InfoBoxLarge
							iconOne="wi wi-raindrop"
							titleOne="Humidity"
							dataOne={humidity + selectedUnits.units.humidity}
							iconTwo="wi wi-barometer"
							titleTwo="Pressure"
							dataTwo={pressure + selectedUnits.units.pressure}
						/>
					</Grid>
					<Grid item xs={6} sm={4}>
						<InfoBoxLarge
							iconOne="wi wi-strong-wind"
							titleOne="Wind Speed"
							dataOne={windSpeedMod + selectedUnits.units.speed}
							iconTwo="wi wi-small-craft-advisory"
							titleTwo="Wind Dir."
							dataTwo={windDir + selectedUnits.units.wind}
						/>
					</Grid>
					<Grid item xs={6} sm={4}>
						<InfoBoxLarge
							iconOne="wi wi-sunrise"
							titleOne="Sunrise"
							dataOne={formatTime(sunrise, timezoneOffset, selectedUnits.type)}
							iconTwo="wi wi-sunset"
							titleTwo="Sunset"
							dataTwo={formatTime(sunset, timezoneOffset, selectedUnits.type)}
						/>
					</Grid>
					<Grid item xs={6} sm={4}>
						<InfoBoxLarge
							iconOne="wi wi-moonrise"
							titleOne="Moonrise"
							dataOne={formatTime(moonrise, timezoneOffset, selectedUnits.type)}
							iconTwo="wi wi-moonset"
							titleTwo="Moonset"
							dataTwo={formatTime(moonset, timezoneOffset, selectedUnits.type)}
						/>
					</Grid>
				</Grid>
			</Collapse>
		);
	};

	return (
		<Card raised>
			{renderActionArea()}
			{renderCollapseAreaLarge()}
		</Card>
	);
}

const mapStateToProps = (state) => {
	return {
		selectedUnits: state.units,
	};
};

export default connect(mapStateToProps)(DailyCard);
