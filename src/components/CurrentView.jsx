import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Container, Paper } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Custom
import iconsMap from "../utils/iconsMap";
import Backdrop from "./Backdrop";
import degToCompasDir from "../utils/degToCompasDir";
import titleCase from "../utils/titleCase";
import formatTime from "../utils/formatTime";
import FactsCards from "./FactsCard";

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
	card: {
		padding: "10px",
	},
	table: {
		padding: "0px 10px 0px 10px",
	},
}));

function CurrentView(props) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const showFacts = useMediaQuery(theme.breakpoints.up("sm"));

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

		return (
			<Card style={{ padding: "10px" }}>
				<CardHeader
					title={`${props.match.params.location} - Current Weather`}
					subheader={date}
				/>
				<CardContent>
					<Grid container spacing={2} className={classes.container}>
						<Grid item style={{ flexGrow: 1 }}>
							<Typography variant="h1" component="p">
								{main.temp.toFixed(0)}°
							</Typography>
						</Grid>
						<Grid item>
							<Icon
								className={`${icon}`}
								color="disabled"
								style={{ fontSize: 80, display: "inline-table" }}
							/>
						</Grid>
					</Grid>
				</CardContent>
				<CardContent>
					<Typography variant="h6" component="p" color="textSecondary">
						{weather[0].main + ", " + titleCase(weather[0].description)}
					</Typography>
				</CardContent>
			</Card>
		);
	};

	const renderInfoCard = () => {
		return (
			<TableContainer component={Card} className={classes.table}>
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
			<TableContainer component={Card} className={classes.table}>
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
			<TableContainer component={Card} className={classes.table}>
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
