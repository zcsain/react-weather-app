import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Custom
import Backdrop from "../parts/Backdrop";
import degToCompasDir from "../../utils/degToCompasDir";
import titleCase from "../../utils/titleCase";
import FactsCards from "../cards/FactsCard";
import { fetchCurrent, fetchOneCall, setSearchTerm } from "../../actions";
import iconsMapperLuxon from "../../utils/iconsMapperLuxon";
import InfoBoxSmall from "../parts/InfoBoxSmall";
import { getTime, getLongDate } from "../../utils/timeFormatingWithLuxon";

const useStyles = makeStyles((theme) => ({
	container: {
		alignItems: "center",
	},
	icon: {
		fontSize: 56,
	},
	rightText: {
		fontWeight: "bold",
	},
	card: {
		padding: theme.spacing(1),
	},
	table: {
		padding: "0px 16px",
	},
	tempUnit: {
		fontWeight: "400",
	},
	mainTemp: {
		fontWeight: "400",
	},
	iconGrow: {
		flexGrow: 1,
	},
	collapseGrid: {
		padding: theme.spacing(1),
	},
	paddingTemp: {
		paddingLeft: "6px",
	},
	paddingHumidity: {
		paddingLeft: "7px",
	},
	paddingPressure: {
		paddingLeft: "5px",
	},
	paddingFlag: {
		paddingLeft: "8px",
	},
	paddingCloud: {
		paddingLeft: "2px",
	},
	paddingSun: {
		paddingLeft: "1px",
	},
}));

function CurrentView({
	current,
	oneCall,
	selectedUnits,
	searchTerm,
	fetchCurrent,
	fetchOneCall,
	setSearchTerm,
	match,
}) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const showFacts = useMediaQuery(theme.breakpoints.up("sm"));

	// Bookmarked pages do do initiate searchTerm setting, so this line
	// looks at the values received from reactRouter, this can be also
	// done with direct component props <Component {...props}> but for
	// that Router would need to be moved from App component
	const locationToSearch = searchTerm || match.params.location;

	useEffect(() => {
		fetchCurrent(locationToSearch, selectedUnits.keyword);
		fetchOneCall(locationToSearch, selectedUnits.keyword);
		setSearchTerm(locationToSearch);
		// React throws a warning if "fetchCurrent" is not a dependency,
		// even though it is a function and never changes
	}, [
		locationToSearch,
		selectedUnits,
		fetchCurrent,
		fetchOneCall,
		setSearchTerm,
	]);

	const renderQuickViewCard = () => {
		const { weather, sys, main, dt } = current;
		const { timezone } = oneCall;
		const { id } = weather[0];
		const { sunrise, sunset } = sys;

		const icon = iconsMapperLuxon(id, sunrise, sunset, dt, timezone);
		const date = getLongDate(dt, timezone, selectedUnits.type);

		return (
			<Card className={classes.card} raised>
				<CardHeader
					title={locationToSearch}
					// title={titleCase(locationToSearch)}
					// title={`${titleCase(locationToSearch)} - Current weather`}
					subheader={date}
				/>
				<CardContent>
					<Grid container spacing={2} className={classes.container}>
						<Grid item className={classes.iconGrow}>
							<i className={[classes.icon, icon].join(" ")} />
						</Grid>
						<Grid item>
							<Typography
								variant="h2"
								component="p"
								display="inline"
								className={classes.mainTemp}
							>
								{main.temp.toFixed(0)}
							</Typography>
							<Typography
								variant="h3"
								color="textSecondary"
								display="inline"
								className={classes.tempUnit}
							>
								{selectedUnits.units.temp}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions style={{ marginLeft: theme.spacing(1) }}>
					<Typography variant="h6" component="p" color="textSecondary">
						{weather[0].main + ", " + titleCase(weather[0].description)}
					</Typography>
				</CardActions>
			</Card>
		);
	};

	const renderContent = () => {
		// From OneCall fetch
		const { timezone, current: currentOneCall } = oneCall;
		const {
			temp,
			sunrise,
			sunset,
			pressure,
			humidity,
			feels_like: feelsLike,
			wind_speed: windSpeed,
			wind_deg: windDeg,
			uvi,
			clouds,
		} = currentOneCall;

		// From Current fetch
		const { main } = current;
		const { temp_min: tempMin, temp_max: tempMax } = main;

		const windSpeedMod =
			selectedUnits.type === "scientific"
				? windSpeed
				: (windSpeed * selectedUnits.multipliers.speed).toFixed(0);
		const windDir =
			selectedUnits.type === "scientific" ? windDeg : degToCompasDir(windDeg);

		return (
			<Grid container spacing={1} className={classes.collapseGrid}>
				<Grid item xs={12} sm={6}>
					<InfoBoxSmall
						iconOne="wi wi-thermometer"
						iconStylingOne={classes.paddingTemp}
						titleOne="Temp."
						dataOne={temp.toFixed(0) + selectedUnits.units.temp}
						iconTwo="wi wi-day-sunny"
						titleTwo="Feels like"
						dataTwo={feelsLike.toFixed(0) + selectedUnits.units.temp}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<InfoBoxSmall
						iconOne="wi wi-thermometer-exterior"
						iconStylingOne={classes.paddingTemp}
						titleOne="Low"
						dataOne={tempMin.toFixed(0) + selectedUnits.units.temp}
						iconTwo="wi wi-thermometer"
						iconStylingTwo={classes.paddingTemp}
						titleTwo="High"
						dataTwo={tempMax.toFixed(0) + selectedUnits.units.temp}
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
						iconOne="wi wi-sunrise"
						titleOne="Sunrise"
						dataOne={getTime(sunrise, timezone, selectedUnits.type)}
						iconTwo="wi wi-sunset"
						titleTwo="Sunset"
						dataTwo={getTime(sunset, timezone, selectedUnits.type)}
					/>
				</Grid>
			</Grid>
		);
	};

	return (
		<React.Fragment>
			{Object.keys(oneCall).length === 0 ||
			Object.keys(current).length === 0 ? (
				<Backdrop />
			) : (
				<Grid container direction="row" spacing={2}>
					<Grid container item direction="column" spacing={2} sm={8}>
						<Grid item>{renderQuickViewCard()}</Grid>
						<Grid item>
							<Card raised className={classes.card}>
								{renderContent()}
							</Card>
						</Grid>
					</Grid>
					{showFacts && (
						<Grid container item direction="column" spacing={2} xs>
							<FactsCards n={2} />
						</Grid>
					)}
				</Grid>
			)}
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		current: state.current,
		oneCall: state.oneCall,
		selectedUnits: state.units,
		searchTerm: state.location,
	};
};

export default connect(mapStateToProps, {
	fetchCurrent,
	fetchOneCall,
	setSearchTerm,
})(withRouter(CurrentView));
