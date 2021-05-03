import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

// Custom
import iconsMap from "../utils/iconsMap";
import Backdrop from "./Backdrop";
import degToCompasDir from "../utils/degToCompasDir";
import titleCase from "../utils/titleCase";
import formatTime from "../utils/formatTime";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		alignItems: "center",
	},
	icon: {
		fontSize: 80,
		display: "inline-table",
	},
	rightText: {
		fontWeight: "bold",
	},
}));

function CurrentView(props) {
	const classes = useStyles();

	const { current, selectedUnits } = props;
	const { weather, main, wind, dt, sys, timezone } = current;
	const { type, units, multipliers } = selectedUnits;

	const renderQuickViewCard = () => {
		const date = new Date(dt * 1000).toLocaleDateString("default", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
		const icon = iconsMap[weather[0].icon];

		console.log(props);

		return (
			<Card>
				<CardHeader
					title={`${props.match.params.location} - Current Weather`}
					subheader={date}
				/>
				<CardContent>
					<Grid container spacing={3} className={classes.container}>
						<Grid item>
							<Icon
								className={`${icon}`}
								color="disabled"
								style={{ fontSize: 80, display: "inline-table" }}
							/>
						</Grid>
						<Grid item>
							<Typography variant="h1" component="p">
								{main.temp.toFixed(0)}°
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
				<CardContent>
					<Typography variant="h6" component="p" color="textSecondary">
						{titleCase(weather[0].description)}
					</Typography>
				</CardContent>
			</Card>
		);
	};

	const renderInfoCard = () => {
		return (
			<TableContainer component={Card}>
				<Table>
					<TableBody>
						{Object.keys(main).map((key) => {
							if (key === "temp") {
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
		const { speed, deg } = wind;

		return (
			<TableContainer component={Card}>
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
		const { sunrise, sunset } = sys;

		return (
			<TableContainer component={Card}>
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
			{props.current ? (
				<Grid container direction="row" spacing={2}>
					<Grid item xs={12} sm={6}>
						{renderQuickViewCard()}
					</Grid>
					<Grid container item direction="column" spacing={2} xs={12} sm={6}>
						<Grid item>{renderInfoCard()}</Grid>
						<Grid item>{renderWindTable()}</Grid>
						<Grid item>{renderSunsetTable()}</Grid>
					</Grid>
				</Grid>
			) : (
				<Backdrop />
			)}
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		current: state.current,
		selectedUnits: state.units,
	};
};

export default connect(mapStateToProps)(withRouter(CurrentView));
