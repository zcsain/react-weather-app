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

// Custom
// import Loader from "../parts/Loader";
import Backdrop from "../parts/Backdrop";
import degToCompasDir from "../../utils/degToCompasDir";
import titleCase from "../../utils/titleCase";
import formatTime from "../../utils/formatTime";
import FactsCards from "../parts/FactsCard";
import { fetchCurrent, setSearchTerm } from "../../actions";
import iconsMapper from "../../utils/iconsMapper";

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
}));

function CurrentView(props) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const showFacts = useMediaQuery(theme.breakpoints.up("sm"));

	const {
		current,
		selectedUnits,
		searchTerm,
		fetchCurrent,
		setSearchTerm,
	} = props;
	const { type, units, multipliers } = selectedUnits;

	// Bookmarked pages do do initiate searchTerm setting, so this line
	// looks at the values received from reactRouter, this can be also
	// done with direct component props <Component {...props}> but for
	// that Router would need to be moved from App component
	const locationToSearch = searchTerm || props.match.params.location;

	useEffect(() => {
		fetchCurrent(locationToSearch, selectedUnits.keyword);
		setSearchTerm(locationToSearch);
		// React throws a warning if "fetchCurrent" is not a dependency,
		// even though it is a function and never changes
	}, [locationToSearch, selectedUnits, fetchCurrent]);

	const renderQuickViewCard = () => {
		const { weather, sys, main, dt, timezone } = current;
		const { id } = weather[0];
		const { sunrise, sunset } = sys;

		const icon = iconsMapper(id, sunrise, sunset, dt, timezone);

		// Check if this shows correct date for different locations
		const date = new Date(dt * 1000).toLocaleDateString("default", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});

		return (
			<Card className={classes.card} raised>
				<CardHeader
					title={`${titleCase(locationToSearch)} - Current weather`}
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
								{units.temp}
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

	const renderInfoCard = () => {
		const { main } = current;

		return (
			<TableContainer component={Card} className={classes.table} raised>
				<Table>
					<TableBody>
						{Object.keys(main).map((key) => {
							if (
								key === "temp" ||
								key === "sea_level" ||
								key === "grnd_level"
							) {
								return null;
							}

							const description = titleCase(key.replace("_", " "));
							let unit = units.deg;

							if (key === "humidity") {
								unit = units.humidity;
							} else if (key === "pressure") {
								unit = units.pressure;
							}

							return (
								<TableRow key={key}>
									<TableCell>
										<Typography variant="body1">{description}</Typography>
									</TableCell>
									<TableCell align="right">
										<Typography variant="body1" className={classes.rightText}>
											{main[key].toFixed(0)}
											{unit}
										</Typography>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		);
	};

	const renderWindTable = () => {
		const { wind } = current;
		const { speed, deg } = wind;

		return (
			<TableContainer component={Card} className={classes.table} raised>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								<Typography variant="body1">Wind Speed</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography variant="body1" className={classes.rightText}>
									{type === "scientific"
										? speed
										: (speed * multipliers.speed).toFixed(0)}
									{units.speed}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Typography variant="body1">Wind Direction</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography variant="body1" className={classes.rightText}>
									{type === "scientific" ? deg : degToCompasDir(deg)}
									{units.wind}
								</Typography>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		);
	};

	const renderSunsetTable = () => {
		const { sys, timezone } = current;
		const { sunrise, sunset } = sys;

		return (
			<TableContainer component={Card} className={classes.table} raised>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								<Typography variant="body1">Sunrise</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography variant="body1" className={classes.rightText}>
									{formatTime(sunrise, timezone, selectedUnits.type)}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Typography variant="body1">Sunset</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography variant="body1" className={classes.rightText}>
									{formatTime(sunset, timezone, selectedUnits.type)}
								</Typography>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		);
	};

	return (
		<React.Fragment>
			{Object.keys(props.current).length === 0 ? (
				<Backdrop />
			) : (
				<Grid container direction="row" spacing={2}>
					<Grid container item direction="column" spacing={2} sm={8}>
						<Grid item>{renderQuickViewCard()}</Grid>
						<Grid item>{renderInfoCard()}</Grid>
						<Grid item>{renderWindTable()}</Grid>
						<Grid item>{renderSunsetTable()}</Grid>
					</Grid>
					{showFacts && (
						<Grid container item direction="column" spacing={2} xs>
							<FactsCards n={3} />
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
	withRouter(CurrentView)
);
