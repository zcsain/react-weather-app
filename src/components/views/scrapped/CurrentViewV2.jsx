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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Collapse from "@material-ui/core/Collapse";

// Custom
// import Loader from "../parts/Loader";
import Backdrop from "../../parts/Backdrop";
import degToCompasDir from "../../../utils/degToCompasDir";
import titleCase from "../../../utils/titleCase";
import formatTime from "../../../utils/formatTime";
import FactsCards from "../../parts/FactsCard";
import { fetchCurrent, setSearchTerm } from "../../../actions";
import iconsMapper from "../../../utils/iconsMapper";
import InfoBoxSmall from "../parts/InfoBoxSmall";

const useStyles = makeStyles((theme) => ({
	container: {
		alignItems: "center",
	},
	icon: {
		fontSize: 56,
		// display: "inline-table",
	},
	rightText: {
		fontWeight: "bold",
	},
	card: {
		padding: "8px",
	},
	table: {
		padding: "0px 16px",
		// padding: "12px 8px",
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
}));

function CurrentViewV2({
	current,
	selectedUnits,
	searchTerm,
	fetchCurrent,
	setSearchTerm,
	match,
}) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const showFacts = useMediaQuery(theme.breakpoints.up("sm"));

	const renderContent = () => {
		const { main, wind, clouds } = current;
		const { speed: windSpeed, deg: windDeg } = wind;
		const { all: cloud } = clouds;
		const {
			feels_like: feelsLike,
			temp_min: tempMin,
			temp_max: tempMax,
			pressure,
			humidity,
		} = main;

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
						iconOne="wi wi-day-sunny"
						titleOne="Feels like"
						dataOne={feelsLike.toFixed(0) + selectedUnits.units.temp}
						iconTwo="wi wi-cloud"
						iconStylingTwo={classes.paddingCloud}
						titleTwo="Cloudiness"
						dataTwo={cloud + selectedUnits.units.humidity}
					/>
				</Grid>
			</Grid>
		);
	};

	return (
		<React.Fragment>
			{Object.keys(current).length === 0 ? (
				<Backdrop />
			) : (
				<Grid container spacing={2}>
					<Grid container item direction="column" spacing={2} sm={8}>
						<Card raised>{renderContent()}</Card>
					</Grid>
					{showFacts && (
						<Grid container item direction="column" spacing={2} xs>
							<FactsCards n={4} />
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
		selectedUnits: state.units,
		searchTerm: state.location,
	};
};

export default connect(mapStateToProps, { fetchCurrent, setSearchTerm })(
	withRouter(CurrentViewV2)
);
