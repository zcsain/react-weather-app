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
	temp: {
		minWidth: "85px",
	},
	scientific: {
		minWidth: "105px",
	},
	description: {
		[theme.breakpoints.up("sm")]: {
			width: "90px",
		},
		[theme.breakpoints.up("md")]: {
			width: "115px",
		},
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	// Need to find a better way
	paddingMoon: {
		paddingLeft: "4px",
	},
	paddingHumidity: {
		paddingLeft: "7px",
	},
	paddingPressure: {
		paddingLeft: "5px",
	},
	paddingTemp: {
		paddingLeft: "6px",
	},
	paddingFlag: {
		paddingLeft: "8px",
	},
	paddingMoonrise: {
		paddingLeft: "6px",
	},
	precipitation: {
		paddingLeft: "6px",
		fontSize: "2em",
	},
	paddingCloud: {
		paddingLeft: "2px",
	},
	paddingSun: {
		paddingLeft: "1px",
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
	const [expanded, setExpanded] = useState(false);

	const darkThemeOpacity =
		theme.palette.type === "dark" ? classes.darkTheme : null;

	const handleExpandeClick = () => {
		setExpanded(!expanded);
	};

	const renderActionArea = () => {
		const { dt, weather, sunrise, sunset, temp } = hour;
		const { id, description } = weather[0];
		const icon = iconsMapper(id, sunrise, sunset, dt, timezoneOffset);

		// Scientific temp view minWidth correction
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
								viewType="hourly"
							/>
						</Grid>
						<Grid item className={classes.iconContainer}>
							<i className={[classes.icon, darkThemeOpacity, icon].join(" ")} />
						</Grid>
						<Grid item className={minWidth}>
							<Typography
								variant="h4"
								component="p"
								display="inline"
								className={darkThemeOpacity}
							>
								{temp.toFixed(0)}
								{selectedUnits.units.temp}
							</Typography>
						</Grid>
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

	const renderCollapseArea = () => {
		const {
			weather,
			feels_like: feelsLike,
			pressure,
			humidity,
			uvi,
			clouds,
			wind_speed: windSpeed,
			wind_deg: windDeg,
			pop,
		} = hour;
		const { description } = weather[0];

		const windSpeedMod =
			selectedUnits.type === "scientific"
				? windSpeed
				: (windSpeed * selectedUnits.multipliers.speed).toFixed(0);
		const windDir =
			selectedUnits.type === "scientific" ? windDeg : degToCompasDir(windDeg);

		return (
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Grid container spacing={1} className={classes.collapseGrid}>
					<Grid item xs={12}>
						<Typography
							variant="h6"
							component="p"
							// className={classes.darkTheme}
							style={{ opacity: "80%" }}
						>
							{capitalize(searchTerm)}
							{!showShortDescription &&
								[",", capitalize(description)].join(" ")}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<InfoBoxSmall
							iconTwo="wi wi-raindrops"
							iconStylingTwo={classes.precipitation}
							titleTwo="Rain (%)"
							dataTwo={pop * 100 + selectedUnits.units.humidity}
							iconOne="wi wi-day-sunny"
							titleOne="Feels like"
							dataOne={feelsLike.toFixed(0) + selectedUnits.units.temp}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<InfoBoxSmall
							iconOne="wi wi-cloud"
							iconStylingOne={classes.paddingCloud}
							titleOne="Cloudiness"
							dataOne={clouds + selectedUnits.units.humidity}
							iconTwo="wi wi-hot"
							iconStylingTwo={classes.paddingSun}
							titleTwo="UV Index"
							dataTwo={uvi}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<InfoBoxSmall
							iconOne="wi wi-raindrop"
							iconStylingOne={classes.paddingHumidity}
							titleOne="Humidity"
							dataOne={humidity + selectedUnits.units.humidity}
							iconTwo="wi wi-barometer"
							iconStylingTwo={classes.paddingPressure}
							titleTwo="Pressure"
							dataTwo={pressure + selectedUnits.units.pressure}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<InfoBoxSmall
							iconOne="wi wi-strong-wind"
							titleOne="Wind Spe."
							dataOne={windSpeedMod + selectedUnits.units.speed}
							iconTwo="wi wi-small-craft-advisory"
							iconStylingTwo={classes.paddingFlag}
							titleTwo="Wind Dir."
							dataTwo={windDir + selectedUnits.units.wind}
						/>
					</Grid>
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
