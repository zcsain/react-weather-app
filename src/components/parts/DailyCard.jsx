import React, { useState } from "react";
import { connect } from "react-redux";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Collapse from "@material-ui/core/Collapse";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Custom
import DateTimeBadge from "./DateTimeBadge";
import capitalize from "../../utils/capitalize";
import iconsMapper from "../../utils/iconsMapper";

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
		opacity: "87%",
		[theme.palette.type === "dark"]: {
			color: "	#FF0000",
		},
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
}));

const loremIpsum =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. ";

function DailyCard({ day, timezoneOffset, selectedUnits }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const showShortDescription = useMediaQuery(theme.breakpoints.up("sm"));
	const [expanded, setExpanded] = useState(false);

	const handleExpandeClick = () => {
		setExpanded(!expanded);
	};

	const renderActionArea = () => {
		const { dt, sunrise, sunset, temp, weather } = day;
		const { id, description } = weather[0];
		const { day: dayTemp, night: nightTemp } = temp;
		const icon = iconsMapper(id, sunrise, sunset, dt, timezoneOffset);

		// Dark theme - opacity adjust (could not find how to do this with useStyles)
		const darkThemeOpacity =
			theme.palette.type === "dark" ? classes.darkTheme : null;
		// Scientific temp midWidth adjust
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

	const renderCollapseArea = () => {
		return (
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Grid container spacing={2} style={{ padding: "16px" }}>
					<Grid item xs={12} sm={6}>
						<Typography variant="body1">Day</Typography>
						<Card variant="outlined">
							<CardContent>{loremIpsum}</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card variant="outlined">
							<CardContent>{loremIpsum}</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card variant="outlined">
							<CardContent>{loremIpsum}</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card variant="outlined">
							<CardContent>{loremIpsum}</CardContent>
						</Card>
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
	};
};

export default connect(mapStateToProps)(DailyCard);
